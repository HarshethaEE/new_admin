"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Clock, Coffee, LogOut, MessageSquare, Play, PlayCircle, Timer, Zap } from "lucide-react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useDashboardNav } from "@/shared/layout";
import { greenTheme as T } from "@/shared/theme";
import { Card, DonutKPI, PageHeader, Pill } from "@/shared/ui";
import { ME } from "@/features/account";
import { CHECKINS, WEEK_HOURS } from "@/features/attendance";
import { LEAVES } from "@/features/leave";
import { ANNOUNCEMENTS } from "../data/employee";
import { PROJECTS, TASKS } from "@/features/projects";

/* ══════════════════════════════════════════════════════════════════════
   §01 · DASHBOARD — check-in prominent, hours card, no calendar/leave/perf
   ══════════════════════════════════════════════════════════════════════ */

export const EmployeeOverview = () => {
  const setActive = useDashboardNav();
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [isOnBreak, setIsOnBreak] = useState(false);

  return (
    <div>
      <PageHeader
        title="Good Morning"
        sub="Tuesday, 6 October 2026 · 10:42 AM"
      />

      {/* CHECK-IN HERO — the main action */}
      <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-4 mb-4.5">
        {/* Check in/out card — gradient hero */}
        <Card padding={0} className="text-white border-0 overflow-hidden relative" style={{ background: isCheckedIn
            ? `linear-gradient(135deg, ${T.gDark} 0%, ${T.gDeep} 100%)`
            : `linear-gradient(135deg, ${T.ink} 0%, ${T.ink2} 100%)` }}>
          <div className="absolute -right-7.5 -top-7.5 w-40 h-40 rounded-full" style={{ background: `radial-gradient(circle, ${T.a}30 0%, transparent 70%)` }}/>
          <div className="p-5.5 relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[11px] tracking-[2px] uppercase font-extrabold opacity-90 mb-1">Attendance · Status</div>
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${(isCheckedIn && !isOnBreak ? "bg-a" : (isOnBreak ? "bg-[#F97316]" : "bg-err"))}`} style={{ boxShadow: `0 0 0 4px ${isCheckedIn ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)"}`, animation: isCheckedIn ? "pulse 2s infinite" : "none" }}/>
                  <span className="text-[26px] font-extrabold tracking-[-0.7px]">
                    {isCheckedIn ? (isOnBreak ? "On break" : "Checked in") : "Checked out"}
                  </span>
                </div>
                {isCheckedIn && (
                  <div className="text-[12px] opacity-85 mt-1">
                    Since {CHECKINS.in} · worked <strong className="text-a">{CHECKINS.worked}</strong>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-[10px] opacity-70 tracking-[1.2px] uppercase font-extrabold">Today</div>
                <div className="text-[24px] font-extrabold font-mono mt-0.5">{CHECKINS.hoursToday.toFixed(1)}h</div>
              </div>
            </div>

            {/* Stats mini */}
            <div className="grid grid-cols-[1fr_1fr_1fr] gap-2.5 mb-4 py-3 px-0 border-t border-t-[rgba(255,255,255,0.15)] border-b border-b-[rgba(255,255,255,0.15)]">
              <div>
                <div className="text-[9.5px] opacity-70 tracking-[1.2px] uppercase font-extrabold">Check-in</div>
                <div className="text-[15px] font-extrabold font-mono mt-0.5">{CHECKINS.in}</div>
              </div>
              <div>
                <div className="text-[9.5px] opacity-70 tracking-[1.2px] uppercase font-extrabold">Break</div>
                <div className="text-[15px] font-extrabold font-mono mt-0.5">{CHECKINS.break}m</div>
              </div>
              <div>
                <div className="text-[9.5px] opacity-70 tracking-[1.2px] uppercase font-extrabold">Streak</div>
                <div className="text-[15px] font-extrabold font-mono mt-0.5">{ME.streak}d<span className="text-[10px] opacity-70 ml-0.5">🔥</span></div>
              </div>
            </div>

            {/* Action buttons */}
            {isCheckedIn ? (
              <div className={`grid gap-2 ${(isOnBreak ? "grid-cols-[1fr]" : "grid-cols-[1fr_1fr]")}`}>
                {!isOnBreak && (
                  <button onClick={() => setIsOnBreak(true)} className="py-2.75 px-4 bg-[rgba(255,255,255,0.15)] text-white border border-[rgba(255,255,255,0.25)] rounded-[10px] font-sans text-[13.5px] font-bold cursor-pointer flex items-center justify-center gap-1.75"><Coffee size={15}/>Start break</button>
                )}
                {isOnBreak && (
                  <button onClick={() => setIsOnBreak(false)} className="py-2.75 px-4 bg-a text-white border border-a rounded-[10px] font-sans text-[13.5px] font-bold cursor-pointer flex items-center justify-center gap-1.75"><Play size={15}/>Resume work</button>
                )}
                {!isOnBreak && (
                  <button onClick={() => { setIsCheckedIn(false); setIsOnBreak(false); }} className="py-2.75 px-4 bg-err text-white border border-err rounded-[10px] font-sans text-[13.5px] font-bold cursor-pointer flex items-center justify-center gap-1.75"><LogOut size={15}/>Check out</button>
                )}
              </div>
            ) : (
              <button onClick={() => setIsCheckedIn(true)} className="w-full py-3 px-4 bg-g text-white border border-g rounded-[10px] font-sans text-[14px] font-bold cursor-pointer flex items-center justify-center gap-2"><PlayCircle size={16}/>Check in now</button>
            )}
          </div>
        </Card>

        {/* Attendance & Hours card */}
        <Card padding={18}>
          <div className="flex justify-between items-start mb-3.5">
            <div>
              <div className="text-[13px] text-ink-2 font-semibold">Attendance (Oct)</div>
              <div className="text-[11px] text-ink-3 mt-0.5">Present · 3 days off, 1 late</div>
            </div>
            <div className="w-8.5 h-8.5 rounded-[9px] bg-g-soft text-g-deep flex items-center justify-center">
              <Clock size={16}/>
            </div>
          </div>
          <div className="text-[28px] font-extrabold text-ink tracking-[-1px] leading-none font-mono">92%</div>
          <div className="mt-2.5 py-2 px-2.5 bg-g-soft text-g-deep rounded-lg text-[11.5px] font-semibold flex items-center gap-1.25">
            <ArrowUpRight size={12}/>+1.5% vs Sep · solid month
          </div>

          <div className="mt-3.5 pt-3.5 border-t border-t-border">
            <div className="flex justify-between items-center">
              <div className="text-[12px] text-ink-3 font-semibold">Total hours · October</div>
              <div className="text-[18px] font-extrabold text-ink font-mono">{CHECKINS.hoursMonth}h</div>
            </div>
            <div className="text-[11px] text-ink-3 mt-1">Target 160h · <strong className="text-g-deep">93% achieved</strong></div>
            <div className="mt-2 h-1.5 bg-canvas rounded-[99px] overflow-hidden">
              <div className="h-full rounded-[99px]" style={{ width: `${(CHECKINS.hoursMonth / 160) * 100}%`, background: `linear-gradient(90deg, ${T.g}, ${T.gDeep})` }}/>
            </div>
          </div>
        </Card>

        {/* Weekly hours chart */}
        <Card padding={18}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-[13px] text-ink-2 font-semibold">This week</div>
              <div className="text-[28px] font-extrabold text-ink tracking-[-1px] leading-none font-mono mt-1.5">{CHECKINS.hoursWeek}h</div>
              <div className="text-[11px] text-g-deep mt-1 font-semibold">+0.9h ahead of target</div>
            </div>
            <div className="w-8.5 h-8.5 rounded-[9px] bg-a-soft text-a-dark flex items-center justify-center">
              <Timer size={16}/>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={WEEK_HOURS}>
              <XAxis dataKey="d" axisLine={false} tickLine={false} style={{ fontSize: 10, fill: T.ink3 }}/>
              <Tooltip contentStyle={{ background: T.ink, border: "none", borderRadius: 8, fontSize: 11, color: "#fff" }}/>
              <Bar dataKey="h" radius={[4, 4, 0, 0]}>
                {WEEK_HOURS.map((d, i) => (
                  <Cell key={i} fill={d.h>= d.target ? T.g : d.h> 0 ? T.a : T.faint}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Leave balance donuts */}
      <div className="grid grid-cols-4 gap-4 mb-4.5">
        {LEAVES.map(l => (
          <DonutKPI key={l.code} label={l.name} used={l.used} total={l.total} color={l.color} unit={l.unit}/>
        ))}
      </div>

      {/* Today's tasks + Announcements */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-4.5">
        <Card padding={22}>
          <div className="flex justify-between items-center mb-3.5">
            <div>
              <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Today's tasks</div>
              <div className="text-[11.5px] text-ink-3 mt-0.5">{TASKS.filter(t => t.assignee === "me" && t.due === "Today").length} due today · {TASKS.filter(t => t.assignee === "me" && t.status === "completed").length} completed this week</div>
            </div>
            <button onClick={() => setActive("projects")} className="bg-transparent border-0 text-g-deep text-[12px] font-bold cursor-pointer flex items-center gap-0.75">View all <ArrowRight size={13}/></button>
          </div>
          {TASKS.filter(t => t.assignee === "me" && t.status !== "completed").slice(0, 5).map((t, i, arr) => (
            <div key={t.id} className={`flex items-start gap-2.75 py-2.5 px-0 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
              <button className="w-4.5 h-4.5 rounded-[5px] border-2 border-faint bg-transparent cursor-pointer mt-0.5 shrink-0"/>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-ink">{t.title}</div>
                <div className="flex items-center gap-2 mt-1.25">
                  <span className="text-[11px] text-ink-3 font-mono">{t.id}</span>
                  <span className="text-[11px] text-mute">·</span>
                  <span className="text-[11px] text-ink-3">{PROJECTS.find(p => p.id === t.project)?.client}</span>
                  {t.pri === "high" && <Pill tone="err" size="sm">High</Pill>}
                  {t.due === "Today" && <Pill tone="amber" size="sm">Today</Pill>}
                </div>
              </div>
            </div>
          ))}
        </Card>

        <Card padding={22}>
          <div className="flex justify-between mb-3.5">
            <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Announcements</div>
            <Pill tone="primary">{ANNOUNCEMENTS.length} new</Pill>
          </div>
          {ANNOUNCEMENTS.map((a, i) => (
            <div key={i} className={`flex items-center gap-3 py-3 px-0 ${(i> 0 ? "border-t border-t-border" : "border-t-0")}`}>
              <div className={`w-9 h-9 rounded-[9px] flex items-center justify-center ${(a.pri ? "bg-a-soft" : "bg-g-mist")} ${(a.pri ? "text-a-dark" : "text-g-deep")}`}>
                {a.pri ? <Zap size={16}/> : <MessageSquare size={16}/>}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-ink">{a.title}</div>
                <div className="flex gap-2 mt-0.75 items-center">
                  <Pill tone={a.pri ? "amber" : "neutral"} size="sm">{a.tag}</Pill>
                  <span className="text-[11px] text-ink-3">{a.when}</span>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(245,158,11,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(245,158,11,0.15); }
        }
      `}</style>
    </div>
  );
};
