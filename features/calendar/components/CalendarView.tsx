"use client";

import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Download, MapPin, Plus, Send, Settings, Video } from "lucide-react";
import { useTheme } from "@/shared/context/DashboardContext";
import { Avatar, Btn, Card, PageHeader, X } from "@/shared/ui";
import type { CalendarEvent, CalendarOptions, Holiday } from "../types";

/* ══════════════════════════════════════════════════════════════════════
   CALENDAR — Teams integration + holidays + schedule.
   Shared by Employee + HR Management.
   ══════════════════════════════════════════════════════════════════════ */

export interface CalendarViewProps {
  events: CalendarEvent[];
  holidays: Holiday[];
  options: CalendarOptions;
}

const MONTH_DAYS = [null, null, null, null, 1, 2, 3,
  4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17,
  18, 19, 20, 21, 22, 23, 24,
  25, 26, 27, 28, 29, 30, 31];

export const CalendarView = ({ events, holidays, options: o }: CalendarViewProps) => {
  const T = useTheme();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const labelStyle = { fontSize: 11, color: T.ink3, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase", display: "block", marginBottom: 6 } as const;

  return (
    <div>
      <PageHeader
        title="Calendar"
        sub={o.subtitle}
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" icon={Download}>Export .ics</Btn>
            <Btn variant="primary" icon={Plus} onClick={() => setShowScheduleModal(true)}>Schedule meeting</Btn>
          </div>
        }
      />

      <div className="grid grid-cols-[2fr_1fr] gap-4.5">
        {/* Calendar */}
        <Card padding={22}>
          <div className="flex justify-between items-center mb-4.5">
            <div className="text-[18px] font-bold text-ink tracking-[-0.4px]">October 2026</div>
            <div className="flex gap-2 items-center">
              <button className="w-8 h-8 border border-border bg-paper rounded-lg cursor-pointer flex items-center justify-center"><ChevronLeft size={15}/></button>
              <button className="w-8 h-8 border border-border bg-paper rounded-lg cursor-pointer flex items-center justify-center"><ChevronRight size={15}/></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d, i) => (
              <div key={i} className="text-center text-[11px] text-mute font-bold py-1.5 px-0 tracking-[0.5px]">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {MONTH_DAYS.map((d, i) => {
              if (d === null) return <div key={i} className="aspect-square"/>;
              const isToday = d === 6;
              const dayEvents = events.filter(e => e.date === String(d));
              const isHoliday = dayEvents.some(e => e.type === "holiday");
              const hasTeams = dayEvents.some(e => e.type === "teams");
              const hasOnsite = dayEvents.some(e => e.type === "onsite");
              return (
                <div key={i} className={`aspect-square rounded-lg p-2 relative cursor-pointer ${(isToday ? "bg-g" : (isHoliday ? "bg-a-soft" : "bg-paper"))}`} style={{ border: `1px solid ${isToday ? T.g : isHoliday ? T.aSoft : T.border}` }}>
                  <div className={`text-[13px] font-bold ${(isToday ? "text-white" : (isHoliday ? "text-a-dark" : "text-ink"))}`}>{d}</div>
                  <div className="absolute bottom-1.25 left-1.5 flex gap-0.75">
                    {hasTeams && <span className={`w-1.5 h-1.5 rounded-full ${(isToday ? "bg-white" : "bg-b")}`}/>}
                    {hasOnsite && <span className={`w-1.5 h-1.5 rounded-full ${(isToday ? "bg-white" : "bg-g")}`}/>}
                    {isHoliday && <span className="w-1.5 h-1.5 rounded-full bg-a-dark"/>}
                  </div>
                  {isHoliday && (
                    <div className="absolute bottom-1 right-1.25 text-[7.5px] text-a-dark font-extrabold tracking-[0.3px]">HOLIDAY</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4.5 flex gap-3.5 flex-wrap text-[11px] text-ink-3">
            <div className="flex items-center gap-1.25"><span className="w-2 h-2 bg-g rounded-xs"/>Today</div>
            <div className="flex items-center gap-1.25"><span className="w-2 h-2 bg-b rounded-full"/>{o.teamsLegendLabel}</div>
            <div className="flex items-center gap-1.25"><span className="w-2 h-2 bg-g rounded-full"/>On-site</div>
            <div className="flex items-center gap-1.25"><span className="w-2 h-2 bg-a-dark rounded-xs"/>Holiday</div>
          </div>

          {/* Upcoming events for today */}
          <div className="mt-6 pt-5 border-t border-t-border">
            <div className="text-[14px] font-bold text-ink tracking-[-0.3px] mb-3.5">Today&apos;s events · 7 Oct</div>
            {events.filter(e => e.date === "7").map((e, i, arr) => (
              <div key={i} className={`py-3.5 px-4 bg-canvas rounded-[10px] border border-border flex items-center gap-3.5 ${(i < arr.length - 1 ? "mb-2.5" : "mb-0")}`} style={{ borderLeft: `3px solid ${e.type === "teams" ? T.b : e.type === "onsite" ? T.g : T.a}` }}>
                <div className="text-center shrink-0">
                  <div className="text-[15px] font-extrabold text-ink font-mono">{e.when.split(" ")[0]}</div>
                  <div className="text-[10px] text-ink-3 font-bold tracking-[0.5px]">{e.when.split(" ")[1]}</div>
                </div>
                <div className="flex-1">
                  <div className="text-[13.5px] font-bold text-ink">{e.title}</div>
                  <div className="text-[11.5px] text-ink-3 mt-0.75 flex items-center gap-1.5">
                    <MapPin size={10}/>{e.location}
                    <span className="text-mute">·</span>
                    <span>{e.duration}</span>
                  </div>
                </div>
                {e.type === "teams" && (
                  <Btn variant="primary" size="sm" icon={Video}>Join Teams</Btn>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Right side: Holidays list */}
        <div className="flex flex-col gap-3.5">
          <Card padding={20}>
            <div className="flex justify-between items-center mb-3.5">
              <div>
                <div className="text-[14px] font-bold text-ink tracking-[-0.3px]">Holidays FY 26-27</div>
                <div className="text-[11px] text-ink-3 mt-0.5">{holidays.length} {o.holidaysRemainingLabel}</div>
              </div>
              {o.showHolidayDownload && <Download size={14} color={T.mute} className="cursor-pointer"/>}
            </div>
            {holidays.slice(0, o.holidayLimit).map((h, i) => (
              <div key={i} className={`flex items-center gap-2.75 py-2.5 px-0 ${(i> 0 ? "border-t border-t-border" : "border-t-0")}`}>
                <div className={`w-11 text-center rounded-lg py-1 px-0 ${(h.tone === "amber" ? "bg-a-soft" : "bg-g-mist")}`} style={{ border: `1px solid ${h.tone === "amber" ? T.aSoft : T.gSoft}` }}>
                  <div className={`text-[13px] font-extrabold font-mono ${(h.tone === "amber" ? "text-a-dark" : "text-g-deep")}`}>{h.date.split(" ")[0]}</div>
                  <div className={`text-[8.5px] font-extrabold tracking-[0.6px] ${(h.tone === "amber" ? "text-a-dark" : "text-g-deep")}`}>{h.date.split(" ")[1]}</div>
                </div>
                <div className="flex-1">
                  <div className="text-[12.5px] font-bold text-ink">{h.name}</div>
                  <div className="text-[10.5px] text-ink-3 mt-0.5">{h.day}</div>
                </div>
              </div>
            ))}
          </Card>

          <Card padding={20}>
            <div className="text-[14px] font-bold text-ink tracking-[-0.3px] mb-3">Teams integration</div>
            <div className="py-3 px-3.5 bg-b-soft rounded-[10px] flex gap-2.5 items-center mb-3">
              <div className="w-9 h-9 rounded-[9px] bg-b text-white flex items-center justify-center">
                <Video size={17}/>
              </div>
              <div className="flex-1">
                <div className="text-[12.5px] font-bold text-ink">Microsoft Teams</div>
                <div className="text-[11px] text-g-deep font-semibold mt-0.5 flex items-center gap-1">
                  <CheckCircle2 size={10}/>{o.teamsStatus}
                </div>
              </div>
            </div>
            <div className="text-[11.5px] text-ink-3 leading-[1.5]">{o.teamsDescription}</div>
            {o.showSyncSettings && <Btn variant="ghost" size="sm" className="mt-3 w-full" icon={Settings}>Sync settings</Btn>}
          </Card>
        </div>
      </div>

      {/* Schedule meeting modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-[rgba(15,23,42,0.5)] flex items-center justify-center z-100" onClick={() => setShowScheduleModal(false)}>
          <div onClick={e => e.stopPropagation()} className="w-135 bg-paper rounded-2xl p-7 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-start mb-5">
              <div>
                <div className="text-[11px] text-b font-extrabold tracking-[2px] uppercase mb-1">Teams meeting</div>
                <div className="text-[22px] font-extrabold text-ink tracking-[-0.6px]">Schedule a meeting</div>
              </div>
              <button onClick={() => setShowScheduleModal(false)} className="w-8 h-8 bg-canvas border border-border rounded-lg cursor-pointer flex items-center justify-center">
                <X size={16}/>
              </button>
            </div>

            <div className="mb-3.5">
              <label style={labelStyle}>Title</label>
              <input placeholder="Meeting title" className="w-full py-2.5 px-3 border border-border rounded-lg font-sans text-[13px] outline-none"/>
            </div>

            <div className="grid grid-cols-[1fr_1fr] gap-3 mb-3.5">
              <div>
                <label style={labelStyle}>Date</label>
                <input type="date" defaultValue="2026-10-07" className="w-full py-2.5 px-3 border border-border rounded-lg font-sans text-[13px] outline-none"/>
              </div>
              <div>
                <label style={labelStyle}>Time</label>
                <input type="time" defaultValue="11:00" className="w-full py-2.5 px-3 border border-border rounded-lg font-sans text-[13px] outline-none"/>
              </div>
            </div>

            <div className={`${(o.showAgenda ? "mb-3.5" : "mb-5")}`}>
              <label style={labelStyle}>Attendees</label>
              <div className="py-2 px-3 border border-border rounded-lg flex gap-1.5 flex-wrap min-h-10.5 items-center">
                {o.defaultAttendees?.map(m => (
                  <div key={m.id} className="flex items-center gap-1.25 py-1 px-2 bg-g-soft rounded-full">
                    <Avatar name={m.name} size={18}/>
                    <span className="text-[11.5px] font-semibold text-g-deep">{m.name}</span>
                  </div>
                ))}
                <input placeholder={o.attendeesPlaceholder} className="flex-1 min-w-25 border-0 outline-none bg-transparent font-sans text-[12px]"/>
              </div>
            </div>

            {o.showAgenda && (
              <div className="mb-5">
                <label style={labelStyle}>Agenda</label>
                <textarea rows={3} placeholder="Meeting agenda…" className="w-full py-2.5 px-3 border border-border rounded-lg font-sans text-[13px] outline-none resize-y"/>
              </div>
            )}

            <div className="p-3 bg-b-soft rounded-[10px] flex items-center gap-2.5 mb-4">
              <Video size={16} color={T.b}/>
              <div className="text-[12px] text-ink-2 font-semibold">Teams link will be generated and attached automatically</div>
            </div>

            <div className="flex gap-2.5 justify-end">
              <Btn variant="ghost" onClick={() => setShowScheduleModal(false)}>Cancel</Btn>
              <Btn variant="primary" icon={Send}>Send Teams invite</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
