"use client";

import { Crown, Download, Flame } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Avatar, Btn, Card, PageHeader, Pill, StatKPI } from "@/shared/ui";
import { LEADERBOARD } from "../data/management";

/* ══════════════════════════════════════════════════════════════════════
   §06 · PERFORMANCE — with leaderboard
   ══════════════════════════════════════════════════════════════════════ */

export const TeamPerformance = () => (
  <div>
    <PageHeader
      title="Performance"
      sub="Team-wide points, rankings, and distribution"
      action={<Btn variant="ghost" icon={Download}>Export leaderboard</Btn>}
    />

    {/* Points KPIs */}
    <div className="grid grid-cols-4 gap-4 mb-5">
      <StatKPI label="Avg points · org" value="2,418" trend="+6.2% MoM" sub="October average"/>
      <StatKPI label="Top performer"    value="3,184" trend="Priya Krishnan" sub="Project Execution"/>
      <StatKPI label="High performers"   value={LEADERBOARD.filter(e => e.points> 2500).length} trend="above 2,500 points" sub="of 128 employees"/>
      <StatKPI label="Need attention"    value="14" trend="below 1,800 points" trendColor="amber" sub="follow-up required"/>
    </div>

    {/* Rating distribution */}
    <Card padding={22} className="mb-5">
      <div className="text-[15px] font-bold text-ink mb-3.5 tracking-[-0.3px]">Points distribution across org</div>
      {[
        { r: "Exceptional (3000+)", n: 8,  pct: 6,  c: T.gDeep },
        { r: "Strong (2500-2999)",  n: 24, pct: 19, c: T.g },
        { r: "On target (2000-2499)",n: 68,pct: 53, c: T.gLight },
        { r: "Below (1500-1999)",   n: 14, pct: 11, c: T.a },
        { r: "Action (<1500)",      n: 14, pct: 11, c: T.err },
      ].map((r, i) => (
        <div key={i} className="mb-3">
          <div className="flex justify-between mb-1.25">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: r.c }}/>
              <span className="text-[13px] font-semibold text-ink">{r.r}</span>
            </div>
            <div className="flex gap-2.5">
              <span className="text-[11px] text-ink-3 tracking-[1.2px] uppercase font-bold">{r.pct}%</span>
              <span className="font-mono text-[13px] font-extrabold text-ink min-w-8 text-right">{r.n}</span>
            </div>
          </div>
          <div className="h-2 bg-canvas rounded-[99px]">
            <div className="h-full rounded-[99px]" style={{ width: `${r.pct * 1.8}%`, background: r.c }}/>
          </div>
        </div>
      ))}
    </Card>

    {/* LEADERBOARD */}
    <Card padding={0}>
      <div className="py-4.5 px-6 border-b border-b-border flex justify-between items-center">
        <div>
          <div className="text-[11px] text-a tracking-[2px] uppercase font-extrabold mb-1">October 2026</div>
          <div className="text-[20px] font-extrabold text-ink tracking-[-0.5px]">Leaderboard</div>
        </div>
        <div className="flex gap-2">
          <Btn variant="ghost" size="sm">All departments</Btn>
          <Btn variant="ghost" size="sm">This month</Btn>
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="px-6 pt-7 pb-5 grid grid-cols-[1fr_1.2fr_1fr] gap-4 items-end" style={{ background: `linear-gradient(180deg, ${T.gBg} 0%, ${T.paper} 100%)` }}>
        {/* 2nd */}
        <div className="text-center">
          <div className="relative inline-block mb-2.5">
            <Avatar name={LEADERBOARD[1].name} size={62}/>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-silver text-white flex items-center justify-center text-[11px] font-extrabold border-3 border-paper">2</div>
          </div>
          <div className="text-[13px] font-bold text-ink">{LEADERBOARD[1].name}</div>
          <div className="text-[10.5px] text-ink-3 mt-0.5">{LEADERBOARD[1].dept}</div>
          <div className="mt-2.5 py-2.5 px-3.5 bg-paper border border-border rounded-[10px] text-[18px] font-extrabold text-ink font-mono tracking-[-0.5px]">{LEADERBOARD[1].points.toLocaleString()}</div>
        </div>

        {/* 1st */}
        <div className="text-center">
          <Crown size={22} color={T.a} className="mt-0 mr-auto mb-1.5 ml-auto"/>
          <div className="relative inline-block mb-2.5">
            <Avatar name={LEADERBOARD[0].name} size={78} tone="amber"/>
            <div className="absolute -bottom-1.5 -right-1.5 w-7.5 h-7.5 rounded-full bg-gold text-white flex items-center justify-center text-[13px] font-extrabold border-3 border-paper">1</div>
          </div>
          <div className="text-[15px] font-extrabold text-ink">{LEADERBOARD[0].name}</div>
          <div className="text-[11px] text-ink-3 mt-0.5">{LEADERBOARD[0].dept}</div>
          <div className="mt-2.5 py-3 px-4 rounded-[10px] text-white text-[22px] font-extrabold font-mono tracking-[-0.6px]" style={{ background: `linear-gradient(135deg, ${T.a}, ${T.aDark})` }}>{LEADERBOARD[0].points.toLocaleString()}</div>
        </div>

        {/* 3rd */}
        <div className="text-center">
          <div className="relative inline-block mb-2.5">
            <Avatar name={LEADERBOARD[2].name} size={62}/>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-bronze text-white flex items-center justify-center text-[11px] font-extrabold border-3 border-paper">3</div>
          </div>
          <div className="text-[13px] font-bold text-ink">{LEADERBOARD[2].name}</div>
          <div className="text-[10.5px] text-ink-3 mt-0.5">{LEADERBOARD[2].dept}</div>
          <div className="mt-2.5 py-2.5 px-3.5 bg-paper border border-border rounded-[10px] text-[18px] font-extrabold text-ink font-mono tracking-[-0.5px]">{LEADERBOARD[2].points.toLocaleString()}</div>
        </div>
      </div>

      <div>
        <div className="py-3 px-6 bg-canvas border-t border-t-border border-b border-b-border text-[10.5px] text-ink-3 font-extrabold tracking-[1.4px] uppercase grid grid-cols-[60px_2fr_1fr_100px_90px_90px] gap-3">
          <div>Rank</div>
          <div>Employee</div>
          <div>Department</div>
          <div className="text-right">Points</div>
          <div className="text-right">Change</div>
          <div className="text-right">Badges</div>
        </div>
        {LEADERBOARD.slice(3).map((e, i, arr) => (
          <div key={e.rank} className={`py-3.5 px-6 grid grid-cols-[60px_2fr_1fr_100px_90px_90px] gap-3 items-center ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
            <div className="text-[15px] font-extrabold text-ink-2 font-mono">#{e.rank}</div>
            <div className="flex items-center gap-2.5">
              <Avatar name={e.name} size={32}/>
              <div>
                <div className="text-[13px] font-bold text-ink">{e.name}</div>
                <div className="text-[10.5px] text-ink-3 mt-0.5 flex items-center gap-1">
                  <Flame size={10} color={T.a}/>{e.streak}d streak
                </div>
              </div>
            </div>
            <div className="text-[12px] text-ink-3">{e.dept}</div>
            <div className="text-[15px] font-extrabold text-ink font-mono text-right">{e.points.toLocaleString()}</div>
            <div className="text-right">
              <Pill tone="ok" size="sm">+{e.delta}</Pill>
            </div>
            <div className="text-right text-[13px] font-bold text-a font-mono">🏆 {e.badges}</div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);
