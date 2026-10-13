"use client";

import { ArrowRight, MapPin, Plus, ThumbsDown, ThumbsUp } from "lucide-react";
import { useDashboardNav } from "@/shared/layout";
import { greenTheme as T } from "@/shared/theme";
import { Avatar, Btn, Card, PageHeader, Pill, StatKPI } from "@/shared/ui";
import { EMPLOYEE_STATUS } from "@/features/employees";
import { LEAVE_REQUESTS } from "@/features/leave";
import { SCHEDULES } from "../data/management";
import { APPLICANTS } from "@/features/recruitment";

/* ══════════════════════════════════════════════════════════════════════
   §01 · DASHBOARD — simplified (no calendar/team perf/satisfaction)
   ══════════════════════════════════════════════════════════════════════ */

export const ManagementOverview = () => {
  const setActive = useDashboardNav();
  return (
  <div>
    <PageHeader
      title="Good Morning"
      sub="Tuesday, 6 October 2026 · Managing 128 people across 11 departments"
    />

    {/* KPI row */}
    <div className="grid grid-cols-4 gap-4 mb-4.5">
      <StatKPI
        label="Total Employees"
        value="128"
        trend="You're part of a growing team!"
        sub="+7 this month"
        menu
      />
      <StatKPI
        label="Attendance"
        value="92%"
        trend="Present · 3 off, 5 late"
        sub="Looking solid this month"
        menu
      />
      <StatKPI
        label="Leave Requests"
        value={LEAVE_REQUESTS.length}
        trend={`${LEAVE_REQUESTS.length} awaiting your approval`}
        trendColor="amber"
        sub="Oldest · 2 days"
        menu
      />
      <StatKPI
        label="Job Applicants"
        value="+12%"
        trend={`${APPLICANTS.filter(a => a.status === "new").length} new this week`}
        sub="37 total this month"
        menu
      />
    </div>

    {/* Schedules + Employment Status */}
    <div className="grid grid-cols-[1.4fr_1fr] gap-4.5 mb-4.5">
      <Card padding={22}>
        <div className="flex justify-between items-center mb-3.5">
          <div>
            <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Today's schedule</div>
            <div className="text-[11.5px] text-ink-3 mt-0.5">6 Oct · {SCHEDULES.length} meetings</div>
          </div>
          <Btn variant="ghost" size="sm" icon={Plus}>Schedule</Btn>
        </div>
        {SCHEDULES.map((s, i) => (
          <div key={i} className="py-3.5 px-4 bg-canvas rounded-[10px] mb-2.5 border border-border flex justify-between items-start" style={{ borderLeft: `3px solid ${s.color}` }}>
            <div className="flex-1">
              <Pill tone={s.color === T.g ? "primary" : s.color === T.a ? "amber" : "purple"} size="sm">{s.tag}</Pill>
              <div className="text-[13px] font-bold text-ink mt-1.5">{s.title}</div>
              <div className="text-[11px] text-ink-3 mt-1 flex items-center gap-1.5">
                <MapPin size={11}/>{s.room} · {s.time}
              </div>
            </div>
            <div className="flex items-center">
              {Array.from({ length: Math.min(3, s.attendees) }).map((_, j) => (
                <div key={j} className={`${(j === 0 ? "ml-0" : "-ml-1.5")}`}>
                  <Avatar name={`U${j}`} size={24} tone={j === 0 ? "primary" : j === 1 ? "amber" : "info"}/>
                </div>
              ))}
              {s.attendees> 3 && (
                <div className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-[9px] font-extrabold -ml-1.5 border-2 border-paper">+{s.attendees - 3}</div>
              )}
            </div>
          </div>
        ))}
      </Card>

      <Card padding={22}>
        <div className="text-[15px] font-bold text-ink tracking-[-0.3px] mb-1">Employment Status</div>
        <div className="text-[24px] font-extrabold text-ink tracking-[-0.6px] mt-1 mb-1 font-mono">128</div>
        <div className="text-[11px] text-ink-3 mb-3.5">Employees</div>

        <div className="h-2.5 bg-canvas rounded-[99px] overflow-hidden flex mb-1.5">
          {EMPLOYEE_STATUS.map((s, i) => (
            <div key={i} style={{ width: `${s.pct}%`, background: s.color }}/>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-ink-3 font-semibold mb-4">
          <span>0%</span><span>100%</span>
        </div>

        {EMPLOYEE_STATUS.map((s, i) => (
          <div key={i} className="flex justify-between items-center py-1.75 px-0">
            <div className="flex items-center gap-1.75">
              <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: s.color }}/>
              <span className="text-[12px] font-bold text-ink">{s.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-extrabold text-ink font-mono">{s.pct}%</span>
              <span className="text-[10px] text-ink-3">· {s.count}</span>
            </div>
          </div>
        ))}
      </Card>
    </div>

    {/* Pending leave approvals + quick actions */}
    <Card padding={0} className="mb-4.5">
      <div className="py-4 px-5 border-b border-b-border flex justify-between items-center">
        <div>
          <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Pending leave requests</div>
          <div className="text-[11.5px] text-ink-3 mt-0.5">{LEAVE_REQUESTS.length} awaiting your decision</div>
        </div>
        <button onClick={() => setActive("leave")} className="bg-transparent border-0 text-g-deep text-[12px] font-bold cursor-pointer flex items-center gap-1">View all <ArrowRight size={13}/></button>
      </div>
      {LEAVE_REQUESTS.slice(0, 4).map((r, i, arr) => (
        <div key={r.id} className={`grid grid-cols-[40px_1.4fr_100px_1.4fr_100px_150px] gap-3.5 items-center py-3.5 px-5 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
          <Avatar name={r.emp} size={32}/>
          <div>
            <div className="text-[13px] font-bold text-ink">{r.emp}</div>
            <div className="text-[11px] text-ink-3 mt-px">{r.dept}</div>
          </div>
          <Pill tone={r.type === "Sick" ? "err" : "primary"}>{r.type}</Pill>
          <div>
            <div className="text-[12.5px] font-bold text-ink">{r.from} – {r.to}</div>
            <div className="text-[10.5px] text-ink-3 mt-0.5 font-mono">{r.days} day{r.days> 1 ? "s" : ""}</div>
          </div>
          <span className="text-[11px] text-ink-3">{r.applied.replace("Today, ", "")}</span>
          <div className="flex gap-1.5 justify-end">
            <button className="py-1.5 px-2.5 border border-g bg-g-soft text-g-deep rounded-lg cursor-pointer flex items-center gap-1 text-[12px] font-bold font-sans">
              <ThumbsUp size={13}/>Approve
            </button>
            <button className="py-1.5 px-2.5 border border-err bg-err-soft text-err rounded-lg cursor-pointer flex items-center gap-1 text-[12px] font-bold font-sans">
              <ThumbsDown size={13}/>Decline
            </button>
          </div>
        </div>
      ))}
    </Card>
  </div>
  );
};
