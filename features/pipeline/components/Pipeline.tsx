"use client";

import { MapPin, Plus } from "lucide-react";
import { Btn, Card, PageHeader } from "@/shared/ui";
import { PIPELINE, PIPELINE_ITEMS } from "../data";

/* ══════════════════════════════════════════════════════════════════════
   §04 · PIPELINE
   ══════════════════════════════════════════════════════════════════════ */
export const Pipeline = () => (
  <div>
    <PageHeader
      title="Sales pipeline"
      sub={`${PIPELINE.reduce((s,p) => s + p.count, 0)} opportunities across the funnel`}
      action={<Btn variant="primary" icon={Plus}>Add opportunity</Btn>}
    />

    <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${PIPELINE.length}, 1fr)` }}>
      {PIPELINE.map(s => {
        const items = PIPELINE_ITEMS.filter(it => it.stage === s.stage);
        return (
          <div key={s.stage} className="bg-canvas rounded-xl p-3 min-h-125">
            <div className="px-1 pt-1 pb-2.5 mb-2.5" style={{ borderBottom: `2px solid ${s.color}` }}>
              <div className="flex items-center justify-between mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }}/>
                <span className="text-[10.5px] text-ink-3 font-extrabold tracking-[1.4px] uppercase font-mono">{s.count}</span>
              </div>
              <div className="text-[13px] font-extrabold text-ink tracking-[-0.2px] mt-1.5">{s.stage}</div>
            </div>
            {items.map((it, i) => (
              <Card key={i} padding={12} className="mb-2 cursor-grab">
                <div className="text-[12px] font-bold text-ink leading-[1.3]">{it.name}</div>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-ink-3">
                  <MapPin size={10}/>{it.city}
                </div>
              </Card>
            ))}
          </div>
        );
      })}
    </div>
  </div>
);
