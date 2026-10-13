"use client";

import { Plus } from "lucide-react";
import { Btn, Card, DonutKPI, PageHeader, Pill } from "@/shared/ui";
import { LEAVES } from "../data/employee";

/* ══════════════════════════════════════════════════════════════════════
   §06 · LEAVE (unchanged)
   ══════════════════════════════════════════════════════════════════════ */

export const MyLeave = () => (
  <div>
    <PageHeader title="Leave" sub="Balance, requests, and history" action={<Btn variant="primary" icon={Plus}>Request leave</Btn>}/>

    <div className="grid grid-cols-4 gap-4 mb-5">
      {LEAVES.map(l => (
        <DonutKPI key={l.code} label={l.name} used={l.used} total={l.total} color={l.color} unit={l.unit}/>
      ))}
    </div>

    <Card padding={0}>
      <div className="py-3.5 px-5 border-b border-b-border">
        <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Recent requests</div>
      </div>
      {[
        { id: "LV-184", type: "Casual",  from: "20 Oct", to: "22 Oct", days: 3, status: "Pending",  applied: "Today" },
        { id: "LV-178", type: "Earned",  from: "06 Nov", to: "10 Nov", days: 5, status: "Approved", applied: "28 Sep" },
        { id: "LV-172", type: "Sick",    from: "22 Sep", to: "22 Sep", days: 1, status: "Approved", applied: "22 Sep" },
      ].map((r, i, arr) => (
        <div key={r.id} className={`grid grid-cols-[90px_110px_1.5fr_80px_110px_100px] gap-3.5 items-center py-3.75 px-5 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
          <span className="font-mono text-[11.5px] text-ink-3 font-bold">{r.id}</span>
          <Pill tone="primary">{r.type}</Pill>
          <div>
            <div className="text-[13.5px] font-bold text-ink">{r.from} – {r.to}</div>
            <div className="text-[11px] text-ink-3 mt-0.5">Applied {r.applied}</div>
          </div>
          <span className="font-mono font-extrabold text-ink">{r.days}d</span>
          <Pill tone={r.status === "Approved" ? "ok" : "amber"} dot>{r.status}</Pill>
          <Btn variant="ghost" size="sm">View</Btn>
        </div>
      ))}
    </Card>
  </div>
);
