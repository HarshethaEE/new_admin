"use client";

import { ArrowRight, ArrowUpRight, Leaf, MapPin, TrendingUp, Users, Zap } from "lucide-react";
import { useDashboardNav } from "@/shared/layout";
import { purpleTheme as T } from "@/shared/theme";
import { Card, PageHeader, Pill, StatKPI } from "@/shared/ui";
import { CLIENTS } from "@/features/clients";
import { typeIcon } from "@/features/clients";
import { PIPELINE } from "@/features/pipeline";
import { CLIENT_PROJECTS as PROJECTS } from "@/features/projects";

/* ══════════════════════════════════════════════════════════════════════
   §01 · OVERVIEW DASHBOARD
   Removed: pipeline value, monthly MRR, portfolio energy chart, live alerts
   ══════════════════════════════════════════════════════════════════════ */

export const AdminOverview = () => {
  const setActive = useDashboardNav();
  const liveClients = CLIENTS.filter(c => c.status === "live").length;
  const totalDevices = CLIENTS.reduce((s, c) => s + c.devices, 0);
  const totalEnergy = CLIENTS.reduce((s, c) => s + c.energy, 0);
  const totalCO2 = CLIENTS.reduce((s, c) => s + c.co2, 0);
  const atRiskProjects = PROJECTS.filter(p => p.status === "at-risk").length;
  const totalOpportunities = PIPELINE.reduce((s, p) => s + p.count, 0);

  return (
    <div>
      <PageHeader
        title="Good Morning"
        sub="Wednesday, 7 October 2026 · Managing 8 live clients across India"
      />

      {/* Hero KPI row — pipeline value & MRR removed */}
      <div className="grid grid-cols-4 gap-4 mb-4.5">
        <Card padding={18} className="text-white border-0 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${T.p} 0%, ${T.pDeep} 100%)` }}>
          <div className="absolute -right-7.5 -top-7.5 w-30 h-30 rounded-full" style={{ background: `radial-gradient(circle, ${T.a}40 0%, transparent 70%)` }}/>
          <div className="relative">
            <div className="flex justify-between">
              <div className="text-[13px] font-semibold opacity-90">Live Clients</div>
              <Users size={16} className="opacity-70"/>
            </div>
            <div className="text-[32px] font-extrabold tracking-[-1px] leading-none font-mono mt-2.5">{liveClients}</div>
            <div className="mt-3 py-1.5 px-2.5 bg-[rgba(255,255,255,0.15)] rounded-lg text-[11.5px] font-semibold flex items-center gap-1.25">
              <ArrowUpRight size={12}/>+2 new this quarter
            </div>
          </div>
        </Card>

        <StatKPI label="Projects Active" value={PROJECTS.length} trend={`${atRiskProjects} at risk · ${PROJECTS.length - atRiskProjects} on track`} trendColor={atRiskProjects> 0 ? "amber" : undefined} sub="Portfolio health 85%" menu/>
        <StatKPI label="Pipeline opportunities" value={totalOpportunities} trend="+4 new this month" sub={`Across ${PIPELINE.length} stages`} menu/>
        <StatKPI label="Devices online" value={totalDevices} trend="98% uptime last 30d" sub="Across all client sites" menu/>
      </div>

      {/* Metrics strip — removed critical alerts, kept operational */}
      <div className="grid grid-cols-3 gap-4 mb-4.5">
        <Card padding={16}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">Energy Tracked</div>
              <div className="text-[22px] font-extrabold text-ink font-mono mt-1">{(totalEnergy/1000).toFixed(1)}<span className="text-[13px] text-ink-3 font-bold">GWh</span></div>
              <div className="text-[11px] text-ink-3 mt-1">monitored across portfolio</div>
            </div>
            <div className="w-10.5 h-10.5 rounded-[10px] bg-a-soft text-a-dark flex items-center justify-center">
              <Zap size={19}/>
            </div>
          </div>
        </Card>
        <Card padding={16}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">CO₂ Avoided</div>
              <div className="text-[22px] font-extrabold text-ink font-mono mt-1">{(totalCO2/1000).toFixed(2)}<span className="text-[13px] text-ink-3 font-bold">kt</span></div>
              <div className="text-[11px] text-ink-3 mt-1">this financial year</div>
            </div>
            <div className="w-10.5 h-10.5 rounded-[10px] bg-g-soft text-g-deep flex items-center justify-center">
              <Leaf size={19}/>
            </div>
          </div>
        </Card>
        <Card padding={16}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">Avg savings · live sites</div>
              <div className="text-[22px] font-extrabold text-g-deep font-mono mt-1">17.4<span className="text-[13px] text-ink-3 font-bold">%</span></div>
              <div className="text-[11px] text-ink-3 mt-1">versus baseline consumption</div>
            </div>
            <div className="w-10.5 h-10.5 rounded-[10px] bg-p-soft text-p-deep flex items-center justify-center">
              <TrendingUp size={19}/>
            </div>
          </div>
        </Card>
      </div>

      {/* Projects + Pipeline */}
      <div className="grid grid-cols-[1.3fr_1fr] gap-4.5 mb-4.5">
        <Card padding={22}>
          <div className="flex justify-between mb-3.5">
            <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Active projects</div>
            <button onClick={() => setActive("projects")} className="bg-transparent border-0 text-p-deep text-[12px] font-bold cursor-pointer flex items-center gap-0.75">
              All projects <ArrowRight size={12}/>
            </button>
          </div>
          {PROJECTS.slice(0, 5).map((p, i) => (
            <div key={p.id} className={`py-3 px-0 ${(i> 0 ? "border-t border-t-border" : "border-t-0")}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10.5px] text-ink-3 font-bold">{p.id}</span>
                    <span className="text-[13px] font-bold text-ink">{p.client}</span>
                  </div>
                  <div className="text-[11px] text-ink-3 mt-0.5">{p.type} · {p.team} people · due {p.endDate.split(" ").slice(0,2).join(" ")}</div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Pill tone={p.status === "at-risk" ? "amber" : p.status === "deploying" ? "blue" : "ok"} size="sm" dot>
                    {p.status === "at-risk" ? "At risk" : p.status === "deploying" ? "Deploying" : "On track"}
                  </Pill>
                  <div className="text-[15px] font-extrabold text-p-deep font-mono min-w-11 text-right">{p.progress}%</div>
                </div>
              </div>
              <div className="h-1.25 bg-p-mist rounded-[99px]">
                <div className="h-full rounded-[99px]" style={{ width: `${p.progress}%`, background: p.status === "at-risk" ? `linear-gradient(90deg, ${T.a}, ${T.aDark})` : `linear-gradient(90deg, ${T.p}, ${T.pDeep})` }}/>
              </div>
            </div>
          ))}
        </Card>

        <Card padding={22}>
          <div className="flex justify-between mb-3.5">
            <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Pipeline by stage</div>
            <button onClick={() => setActive("pipeline")} className="bg-transparent border-0 text-p-deep text-[12px] font-bold cursor-pointer flex items-center gap-0.75">
              Full view <ArrowRight size={12}/>
            </button>
          </div>

          {PIPELINE.map((s) => {
            const maxCount = Math.max(...PIPELINE.map(p => p.count));
            const barW = (s.count / maxCount) * 100;
            return (
              <div key={s.stage} className="mb-2.75">
                <div className="flex justify-between items-center mb-1.25">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }}/>
                    <span className="text-[12.5px] font-bold text-ink">{s.stage}</span>
                  </div>
                  <span className="text-[13px] font-extrabold text-ink font-mono">{s.count}</span>
                </div>
                <div className="h-1.5 bg-canvas rounded-[99px]">
                  <div className="h-full rounded-[99px]" style={{ width: `${barW}%`, background: s.color }}/>
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* Client status table */}
      <Card padding={0}>
        <div className="py-4 px-5.5 border-b border-b-border flex justify-between items-center">
          <div>
            <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Client portfolio</div>
            <div className="text-[11.5px] text-ink-3 mt-0.5">Live sites · performance snapshot</div>
          </div>
          <button onClick={() => setActive("clients")} className="bg-transparent border-0 text-p-deep text-[12px] font-bold cursor-pointer flex items-center gap-0.75">
            Manage clients <ArrowRight size={12}/>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-sans" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr className="bg-canvas">
                {["Client", "Industry", "Location", "Devices", "Energy", "Savings", "Users", "Status"].map((h, i) => (
                  <th key={i} className="text-left py-2.75 px-4 text-[10.5px] font-extrabold tracking-[1.4px] uppercase text-ink-3 border-b border-b-border whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CLIENTS.filter(c => c.status === "live").slice(0, 6).map((c, i, arr) => {
                const Icon = typeIcon(c.type);
                return (
                  <tr key={c.id} className={`bg-paper cursor-pointer hover:bg-p-mist ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                    <td className="py-3.25 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7.5 h-7.5 rounded-lg bg-p-soft text-p-deep flex items-center justify-center">
                          <Icon size={14}/>
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-ink">{c.name}</div>
                          <div className="text-[10.5px] text-ink-3 font-mono mt-px">{c.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.25 px-4 text-[12px] text-ink-2">{c.type}</td>
                    <td className="py-3.25 px-4">
                      <span className="text-[12px] text-ink-2 flex items-center gap-1"><MapPin size={11} color={T.mute}/>{c.loc}</span>
                    </td>
                    <td className="py-3.25 px-4 font-mono text-[12.5px] font-bold text-ink">{c.devices}</td>
                    <td className="py-3.25 px-4 font-mono text-[12.5px] font-bold text-ink">{c.energy}<span className="text-[10px] text-ink-3 ml-0.5">MWh</span></td>
                    <td className="py-3.25 px-4">
                      <span className={`text-[13px] font-extrabold font-mono ${(c.savings ? "text-g-deep" : "text-mute")}`}>{c.savings ? `${c.savings}%` : "—"}</span>
                    </td>
                    <td className="py-3.25 px-4 font-mono text-[12.5px] font-bold text-ink">{c.usersWithAccess}</td>
                    <td className="py-3.25 px-4">
                      <Pill tone="ok" dot>Live</Pill>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
