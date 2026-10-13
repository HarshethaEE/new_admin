"use client";

import { BarChart3, Leaf, Plus, Trophy } from "lucide-react";
import { purpleTheme as T } from "@/shared/theme";
import { Btn, Card, PageHeader } from "@/shared/ui";

/* ══════════════════════════════════════════════════════════════════════
   §07 · OTHERS
   ══════════════════════════════════════════════════════════════════════ */
export const Reports = () => (
  <div>
    <PageHeader title="Reports" sub="Scheduled, on-demand, and compliance reporting" action={<Btn variant="primary" icon={Plus}>Generate report</Btn>}/>
    <div className="grid grid-cols-3 gap-3.5">
      {[
        { icon: BarChart3, label: "Energy performance", count: 12, tone: T.p },
        { icon: Leaf,       label: "Emissions & BRSR",   count: 8,  tone: T.gDeep },
        { icon: Trophy,     label: "Savings realization", count: 6,  tone: T.a },
      ].map((c, i) => {
        const Icon = c.icon;
        return (
          <Card key={i} padding={18}>
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ background: c.tone + "22", color: c.tone }}>
                <Icon size={19}/>
              </div>
              <span className="text-[22px] font-extrabold text-ink font-mono">{c.count}</span>
            </div>
            <div className="text-[14px] font-bold text-ink tracking-[-0.2px]">{c.label}</div>
            <div className="text-[11.5px] text-ink-3 mt-1">Templates available</div>
          </Card>
        );
      })}
    </div>
  </div>
);
