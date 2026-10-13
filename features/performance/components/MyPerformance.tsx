"use client";

import { Crown, Flame, Medal, Target, Trophy } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { greenTheme as T } from "@/shared/theme";
import { Avatar, Btn, Card, PageHeader, Pill } from "@/shared/ui";
import { ME } from "@/features/account";
import { LEADERBOARD, POINTS_BREAKDOWN, POINTS_HISTORY } from "../data/employee";

/* ══════════════════════════════════════════════════════════════════════
   §07 · PERFORMANCE — point system + leaderboard
   ══════════════════════════════════════════════════════════════════════ */

export const MyPerformance = () => {
  const totalEarned = POINTS_BREAKDOWN.reduce((s, p) => s + p.earned, 0);
  const totalMax = POINTS_BREAKDOWN.reduce((s, p) => s + p.max, 0);
  const pct = Math.round((totalEarned / totalMax) * 100);

  return (
    <div>
      <PageHeader
        title="Performance"
        sub="Your points, rank, and leaderboard standing"
      />

      {/* Hero: My points + rank */}
      <Card padding={0} className="mb-5 text-white border-0 overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${T.gDark} 0%, ${T.gDeep} 100%)` }}>
        <div className="absolute -right-10 -top-10 w-55 h-55 rounded-full" style={{ background: `radial-gradient(circle, ${T.a}30 0%, transparent 70%)` }}/>
        <div className="p-7 relative grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-6 items-center">
          <div>
            <div className="text-[11px] text-a tracking-[2px] uppercase font-extrabold mb-1.5">Your performance · October</div>
            <div className="text-[36px] font-extrabold tracking-[-1.2px] font-mono leading-none">{totalEarned.toLocaleString()}</div>
            <div className="text-[13px] opacity-90 mt-1.5">of {totalMax.toLocaleString()} possible points · <strong className="text-a">{pct}%</strong></div>
          </div>
          <div>
            <div className="text-[10.5px] tracking-[1.5px] uppercase opacity-75 font-extrabold">Rank</div>
            <div className="text-[28px] font-extrabold mt-1 font-mono flex items-center gap-1.5">
              #{ME.rank}<Medal size={22} color={T.a}/>
            </div>
            <div className="text-[11px] opacity-80 mt-0.5">of 324 employees</div>
          </div>
          <div>
            <div className="text-[10.5px] tracking-[1.5px] uppercase opacity-75 font-extrabold">This week</div>
            <div className="text-[28px] font-extrabold mt-1 font-mono text-a">+184</div>
            <div className="text-[11px] opacity-80 mt-0.5">points earned</div>
          </div>
          <div>
            <div className="text-[10.5px] tracking-[1.5px] uppercase opacity-75 font-extrabold">Streak</div>
            <div className="text-[28px] font-extrabold mt-1 font-mono">{ME.streak}d 🔥</div>
            <div className="text-[11px] opacity-80 mt-0.5">best: 24 days</div>
          </div>
        </div>
      </Card>

      {/* Points breakdown + history */}
      <div className="grid grid-cols-[1.3fr_1fr] gap-4.5 mb-5">
        <Card padding={22}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Points breakdown</div>
              <div className="text-[11.5px] text-ink-3 mt-0.5">How your points are calculated</div>
            </div>
          </div>
          {POINTS_BREAKDOWN.map((p, i, arr) => {
            const Icon = p.icon;
            const barPct = (p.earned / p.max) * 100;
            return (
              <div key={i} className={`py-3.5 px-0 ${(i> 0 ? "border-t border-t-border" : "border-t-0")}`}>
                <div className="flex justify-between items-start mb-2.5">
                  <div className="flex items-center gap-2.75 flex-1">
                    <div className="w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0" style={{ background: p.color + "22", color: p.color }}>
                      <Icon size={16}/>
                    </div>
                    <div>
                      <div className="text-[13.5px] font-bold text-ink">{p.category}</div>
                      <div className="text-[11px] text-ink-3 mt-0.5">{p.weight}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[16px] font-extrabold text-ink font-mono tracking-[-0.4px]">{p.earned}</div>
                    <div className="text-[10.5px] text-ink-3 font-semibold">of {p.max}</div>
                  </div>
                </div>
                <div className="h-1.5 bg-canvas rounded-[99px] overflow-hidden">
                  <div className="h-full rounded-[99px]" style={{ width: `${barPct}%`, background: p.color }}/>
                </div>
              </div>
            );
          })}
        </Card>

        <Card padding={22}>
          <div className="flex justify-between mb-3.5">
            <div>
              <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Points over time</div>
              <div className="text-[11.5px] text-ink-3 mt-0.5">Last 7 months</div>
            </div>
            <Pill tone="ok" dot>+30% YoY</Pill>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={POINTS_HISTORY}>
              <defs>
                <linearGradient id="ptsG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.g} stopOpacity={0.35}/>
                  <stop offset="100%" stopColor={T.g} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke={T.border} vertical={false}/>
              <XAxis dataKey="m" axisLine={false} tickLine={false} style={{ fontSize: 11, fill: T.ink3 }}/>
              <YAxis axisLine={false} tickLine={false} style={{ fontSize: 11, fill: T.ink3 }}/>
              <Tooltip contentStyle={{ background: T.ink, border: "none", borderRadius: 8, fontSize: 12, color: "#fff" }}/>
              <Area type="monotone" dataKey="v" stroke={T.g} strokeWidth={2.5} fill="url(#ptsG)"/>
            </AreaChart>
          </ResponsiveContainer>

          {/* Badges */}
          <div className="mt-5 pt-4 border-t border-t-border">
            <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.2px] uppercase mb-2.5">Recent badges</div>
            <div className="flex gap-2 flex-wrap">
              {[
                { icon: Flame, label: "On fire · 18-day streak", color: T.a },
                { icon: Target, label: "Sharpshooter · 95% tasks on time", color: T.g },
                { icon: Trophy, label: "Top 5", color: T.gDeep },
              ].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-full text-[11px] font-bold" style={{ background: b.color + "22", color: b.color }}>
                    <Icon size={12}/>{b.label}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

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
          {/* 2nd place */}
          <div className="text-center">
            <div className="relative inline-block mb-2.5">
              <Avatar name={LEADERBOARD[1].name} size={62}/>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-silver text-white flex items-center justify-center text-[11px] font-extrabold border-3 border-paper">2</div>
            </div>
            <div className="text-[13px] font-bold text-ink">{LEADERBOARD[1].name}</div>
            <div className="text-[10.5px] text-ink-3 mt-0.5">{LEADERBOARD[1].dept}</div>
            <div className="mt-2.5 py-2.5 px-3.5 bg-paper border border-border rounded-[10px] text-[18px] font-extrabold text-ink font-mono tracking-[-0.5px]">{LEADERBOARD[1].points.toLocaleString()}</div>
          </div>

          {/* 1st place */}
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

          {/* 3rd place — ME */}
          <div className="text-center">
            <div className="relative inline-block mb-2.5">
              <Avatar name={LEADERBOARD[2].name} size={62}/>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-bronze text-white flex items-center justify-center text-[11px] font-extrabold border-3 border-paper">3</div>
            </div>
            <div className="text-[13px] font-bold text-ink">
              {LEADERBOARD[2].name}{LEADERBOARD[2].isMe && <span className="ml-1 text-[9px] text-g-deep font-extrabold">(YOU)</span>}
            </div>
            <div className="text-[10.5px] text-ink-3 mt-0.5">{LEADERBOARD[2].dept}</div>
            <div className={`mt-2.5 py-2.5 px-3.5 rounded-[10px] text-[18px] font-extrabold font-mono tracking-[-0.5px] ${(LEADERBOARD[2].isMe ? "bg-g-soft" : "bg-paper")} ${(LEADERBOARD[2].isMe ? "text-g-deep" : "text-ink")}`} style={{ border: `1px solid ${LEADERBOARD[2].isMe ? T.g : T.border}` }}>{LEADERBOARD[2].points.toLocaleString()}</div>
          </div>
        </div>

        {/* Rest of leaderboard */}
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
            <div key={e.rank} className={`py-3.5 px-6 grid grid-cols-[60px_2fr_1fr_100px_90px_90px] gap-3 items-center ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")} ${(e.isMe ? "bg-g-mist" : "bg-paper")}`}>
              <div className="text-[15px] font-extrabold text-ink-2 font-mono">#{e.rank}</div>
              <div className="flex items-center gap-2.5">
                <Avatar name={e.name} size={32}/>
                <div>
                  <div className="text-[13px] font-bold text-ink">{e.name}{e.isMe && <span className="ml-1.5 text-[9px] text-g-deep font-extrabold">(YOU)</span>}</div>
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
};
