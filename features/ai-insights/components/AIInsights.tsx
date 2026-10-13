"use client";

import { ArrowRight } from "lucide-react";
import { purpleTheme as T } from "@/shared/theme";
import { Btn, Card, PageHeader, Pill } from "@/shared/ui";
import { AI_INSIGHTS } from "../data";

/* ══════════════════════════════════════════════════════════════════════
   §06 · AI INTELLIGENCE
   ══════════════════════════════════════════════════════════════════════ */
export const AIInsights = () => (
  <div>
    <PageHeader title="AI Intelligence" sub="Predictive maintenance, optimization, and savings identification"/>

    <Card padding={0} className="mb-5 text-white border-0 overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${T.ink} 0%, ${T.pDeep} 100%)` }}>
      <div className="absolute -right-10 -top-10 w-55 h-55 rounded-full" style={{ background: `radial-gradient(circle, ${T.pLight}40 0%, transparent 70%)` }}/>
      <div className="py-6.5 px-7 relative grid grid-cols-[2fr_1fr_1fr] gap-6 items-center">
        <div>
          <div className="text-[11px] text-p-light tracking-[2px] uppercase font-extrabold mb-1.5">Elements AI · last 24h</div>
          <div className="text-[26px] font-extrabold tracking-[-0.8px]">4 new insights · ₹11.2L savings identified</div>
          <div className="text-[13px] opacity-80 mt-2">Models trained on 184 GB of time-series data across 724 devices</div>
        </div>
        <div>
          <div className="text-[10.5px] tracking-[1.5px] uppercase opacity-70 font-extrabold">Confidence</div>
          <div className="text-[24px] font-extrabold mt-1 font-mono">88%</div>
        </div>
        <div>
          <div className="text-[10.5px] tracking-[1.5px] uppercase opacity-70 font-extrabold">Est. savings</div>
          <div className="text-[24px] font-extrabold mt-1 font-mono">₹11.2L</div>
        </div>
      </div>
    </Card>

    <div className="grid grid-cols-2 gap-3.5">
      {AI_INSIGHTS.map((ins, i) => (
        <Card key={i} padding={20}>
          <div className="flex justify-between items-center mb-2.5">
            <Pill tone="purple" dot>Insight</Pill>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-ink-3 font-bold tracking-[1px]">Confidence</span>
              <span className="text-[14px] font-extrabold text-p-deep font-mono">{ins.confidence}%</span>
            </div>
          </div>
          <div className="text-[14.5px] font-bold text-ink tracking-[-0.3px] leading-[1.3]">{ins.title}</div>
          <div className="flex justify-between items-center mt-3.5 pt-3 border-t border-t-border">
            <div>
              <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">Potential savings</div>
              <div className="text-[15px] font-extrabold text-g-deep font-mono mt-0.5">{ins.savings}</div>
            </div>
            <Btn variant="primary" size="sm" iconRight={ArrowRight}>Take action</Btn>
          </div>
        </Card>
      ))}
    </div>
  </div>
);
