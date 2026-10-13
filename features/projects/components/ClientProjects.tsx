"use client";

import { Plus } from "lucide-react";
import { purpleTheme as T } from "@/shared/theme";
import { Btn, Card, PageHeader, Pill, StatKPI } from "@/shared/ui";
import { PROJECTS } from "../data/admin";

/* ══════════════════════════════════════════════════════════════════════
   §03 · PROJECTS
   ══════════════════════════════════════════════════════════════════════ */
export const ClientProjects = () => (
  <div>
    <PageHeader
      title="Projects"
      sub={`${PROJECTS.length} active deployments across the portfolio`}
      action={<Btn variant="primary" icon={Plus}>New project</Btn>}
    />

    <div className="grid grid-cols-3 gap-4 mb-5">
      <StatKPI label="Active projects" value={PROJECTS.length} trend="2 at risk · 4 on track" trendColor="amber" sub="Portfolio health 85%"/>
      <StatKPI label="Avg completion" value="49%" trend="+8% this week" sub=""/>
      <StatKPI label="Milestones (30d)" value="12" trend="4 critical" trendColor="amber" sub=""/>
    </div>

    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-4">
      {PROJECTS.map(p => (
        <Card key={p.id} padding={0} className="overflow-hidden cursor-pointer">
          <div className="py-4.5 px-5">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <span className="text-[10.5px] text-ink-3 font-mono font-bold">{p.id}</span>
                <div className="text-[15px] font-bold text-ink tracking-[-0.3px] mt-0.75">{p.client}</div>
                <div className="text-[11.5px] text-ink-3 mt-0.75">{p.type}</div>
              </div>
              <Pill tone={p.status === "at-risk" ? "amber" : p.status === "deploying" ? "blue" : "ok"} dot>
                {p.status === "at-risk" ? "At risk" : p.status === "deploying" ? "Deploying" : "On track"}
              </Pill>
            </div>

            <div className="flex justify-between items-baseline mt-3.5 mb-1.5">
              <span className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">Progress</span>
              <span className="text-[20px] font-extrabold text-p-deep font-mono tracking-[-0.6px]">{p.progress}%</span>
            </div>
            <div className="h-2 bg-p-mist rounded-[99px] overflow-hidden">
              <div className="h-full" style={{ width: `${p.progress}%`, background: p.status === "at-risk" ? `linear-gradient(90deg, ${T.a}, ${T.aDark})` : `linear-gradient(90deg, ${T.p}, ${T.pDeep})` }}/>
            </div>

            <div className="grid grid-cols-[1fr_1fr] gap-2.5 mt-3.5">
              <div>
                <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">Team</div>
                <div className="text-[13px] font-extrabold text-ink font-mono mt-0.75">{p.team} people</div>
              </div>
              <div>
                <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">Due</div>
                <div className="text-[11.5px] font-bold text-ink mt-0.75">{p.endDate.split(" ").slice(0,2).join(" ")}</div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);
