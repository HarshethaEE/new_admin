"use client";

import { CheckCircle2, ChevronLeft, ChevronRight, Flame, Sunrise, Timer } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { greenTheme as T } from "@/shared/theme";
import { Card, PageHeader, StatKPI } from "@/shared/ui";
import { ME } from "@/features/account";
import { WEEK_HOURS } from "../data/employee";

/* ══════════════════════════════════════════════════════════════════════
   §05 · ATTENDANCE (regularize removed)
   ══════════════════════════════════════════════════════════════════════ */

export const MyAttendance = () => (
  <div>
    <PageHeader
      title="Attendance"
      sub="Your daily log, streaks, and monthly summary"
    />

    <div className="border border-a-soft rounded-xl py-3.5 px-5 flex items-center gap-3 mb-5" style={{ background: `linear-gradient(90deg, ${T.aSoft} 0%, ${T.gMist} 100%)` }}>
      <div className="w-9 h-9 rounded-[9px] bg-a text-white flex items-center justify-center">
        <Flame size={17}/>
      </div>
      <div className="flex-1">
        <div className="text-[14px] font-bold text-ink tracking-[-0.2px]">You're on an {ME.streak}-day streak</div>
        <div className="text-[12px] text-ink-2 mt-0.5">2 more days to unlock the "Rock Solid" badge.</div>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-4 mb-5">
      <StatKPI label="Present (Oct)" value="4" trend="of 4 working days" icon={CheckCircle2}/>
      <StatKPI label="WFH" value="1" trend="within policy · max 8/mo" icon={Timer}/>
      <StatKPI label="Avg check-in" value="09:12" trend="Target 09:30" icon={Sunrise}/>
      <StatKPI label="Avg hours" value="8h 34m" trend="above target" icon={Timer}/>
    </div>

    <div className="grid grid-cols-[2fr_1fr] gap-4.5">
      <Card padding={22}>
        <div className="flex justify-between items-center mb-4">
          <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">October 2026</div>
          <div className="flex gap-1.5">
            <button className="w-7 h-7 border border-border bg-paper rounded-[7px] cursor-pointer flex items-center justify-center"><ChevronLeft size={14}/></button>
            <button className="w-7 h-7 border border-border bg-paper rounded-[7px] cursor-pointer flex items-center justify-center"><ChevronRight size={14}/></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.25 mb-1.5">
          {["S","M","T","W","T","F","S"].map((d, i) => (
            <div key={i} className="text-center text-[10.5px] text-mute font-extrabold tracking-[1px]">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.25">
          {Array.from({ length: 35 }, (_, i) => {
            if (i < 4 || i> 34) return <div key={i}/>;
            const dayNum = i - 3;
            const wknd = (i % 7 === 0 || i % 7 === 6);
            let status: "P" | "W" | "H" | "?" = "?";
            if (dayNum <= 6) status = wknd ? "W" : "P";
            if (dayNum === 20) status = "H"; // Diwali
            const st = {
              P: { bg: T.gMist,  fg: T.gDeep, ring: T.gSoft },
              W: { bg: T.bg,     fg: T.mute,  ring: T.border },
              H: { bg: T.aSoft,  fg: T.aDark, ring: T.aSoft },
              "?": { bg: T.paper, fg: T.mute, ring: T.border },
            }[status];
            const isToday = dayNum === 6;
            return (
              <div key={i} className="aspect-square rounded-lg flex flex-col items-center justify-center p-1.5" style={{ background: isToday ? T.g : st.bg, border: `1px solid ${isToday ? T.g : st.ring}` }}>
                <div className="text-[13px] font-extrabold" style={{ color: isToday ? "#fff" : st.fg }}>{dayNum}</div>
                <div className="text-[9px] font-extrabold tracking-[1px] mt-0.5 opacity-70" style={{ color: isToday ? "#fff" : st.fg }}>{status}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card padding={22}>
        <div className="text-[15px] font-bold text-ink tracking-[-0.3px] mb-3.5">Hours this week</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={WEEK_HOURS}>
            <CartesianGrid strokeDasharray="2 4" stroke={T.border} vertical={false}/>
            <XAxis dataKey="d" axisLine={false} tickLine={false} style={{ fontSize: 11, fill: T.ink3 }}/>
            <YAxis axisLine={false} tickLine={false} style={{ fontSize: 11, fill: T.ink3 }}/>
            <Tooltip contentStyle={{ background: T.ink, border: "none", borderRadius: 8, fontSize: 12, color: "#fff" }}/>
            <Bar dataKey="h" radius={[8, 8, 0, 0]}>
              {WEEK_HOURS.map((d, i) => (
                <Cell key={i} fill={d.h>= d.target ? T.g : d.h> 0 ? T.a : T.faint}/>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
);
