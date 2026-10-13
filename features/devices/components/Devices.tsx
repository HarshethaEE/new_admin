"use client";

import { Card, PageHeader, Pill } from "@/shared/ui";
import { CLIENTS } from "@/features/clients";
import { DEVICES_SPLIT } from "../data";

/* ══════════════════════════════════════════════════════════════════════
   §05 · DEVICES
   ══════════════════════════════════════════════════════════════════════ */
export const Devices = () => (
  <div>
    <PageHeader title="Device fleet" sub={`${CLIENTS.reduce((s, c) => s + c.devices, 0)} connected devices across all clients`}/>

    <div className="grid grid-cols-3 gap-4">
      {DEVICES_SPLIT.map(d => {
        const Icon = d.icon;
        return (
          <Card key={d.type} padding={20}>
            <div className="flex justify-between items-center mb-3.5">
              <div className="w-10.5 h-10.5 rounded-[10px] flex items-center justify-center" style={{ background: d.color + "22", color: d.color }}>
                <Icon size={20}/>
              </div>
              <Pill tone="ok" dot size="sm">98% uptime</Pill>
            </div>
            <div className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">{d.type}</div>
            <div className="text-[30px] font-extrabold text-ink tracking-[-0.8px] font-mono mt-1">{d.count}</div>
            <div className="text-[11.5px] text-ink-3 mt-1">Across {Math.ceil(d.count/10)} client sites</div>
          </Card>
        );
      })}
    </div>
  </div>
);
