"use client";

import { useState } from "react";
import { MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Avatar, Btn, Card, PageHeader, Pill, StatKPI, X } from "@/shared/ui";
import { LEAVE_HISTORY, LEAVE_REQUESTS } from "../data/management";
import type { LeaveRequest } from "../types";

/* ══════════════════════════════════════════════════════════════════════
   §07 · LEAVE MANAGEMENT — approve/decline
   ══════════════════════════════════════════════════════════════════════ */

export const LeaveManagement = () => {
  const [filter, setFilter] = useState("pending");
  const [selected, setSelected] = useState<LeaveRequest | null>(null);

  return (
    <div>
      <PageHeader
        title="Leave Management"
        sub={`${LEAVE_REQUESTS.length} pending approval · ${LEAVE_HISTORY.length} processed this week`}
      />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        <StatKPI label="Pending" value={LEAVE_REQUESTS.length} trend="awaiting your decision" trendColor="amber"/>
        <StatKPI label="Approved (7d)" value="18" trend="+12% vs last week"/>
        <StatKPI label="Declined (7d)" value="2" trend="with reasons shared"/>
        <StatKPI label="Avg response" value="4.2h" trend="down from 8h last month"/>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {[
          { id: "pending",  label: "Pending",   n: LEAVE_REQUESTS.length },
          { id: "approved", label: "Approved",  n: LEAVE_HISTORY.filter(h => h.status === "Approved").length },
          { id: "declined", label: "Declined",  n: LEAVE_HISTORY.filter(h => h.status === "Declined").length },
          { id: "all",      label: "All history",n: LEAVE_HISTORY.length },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`py-2.25 px-3.75 rounded-[10px] cursor-pointer text-[13px] font-bold font-sans flex items-center gap-1.75 ${(filter === f.id ? "bg-g" : "bg-paper")} ${(filter === f.id ? "text-white" : "text-ink-2")}`} style={{ border: `1px solid ${filter === f.id ? T.g : T.border}` }}>
            {f.label}
            <span className={`text-[10.5px] font-extrabold py-px px-1.75 rounded-full ${(filter === f.id ? "bg-g-deep" : "bg-canvas")} ${(filter === f.id ? "text-white" : "text-ink-3")}`}>{f.n}</span>
          </button>
        ))}
      </div>

      {filter === "pending" && (
        <div className={`grid gap-4.5 ${(selected ? "grid-cols-[1.5fr_1fr]" : "grid-cols-[1fr]")}`}>
          {/* Request list */}
          <Card padding={0}>
            {LEAVE_REQUESTS.map((r, i, arr) => (
              <div key={r.id} onClick={() => setSelected(r)} className={`py-4.5 px-5 cursor-pointer ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")} ${(selected?.id === r.id ? "bg-g-mist" : "bg-paper")} ${(selected?.id === r.id ? "border-l-3 border-l-g" : "border-l-3 border-l-transparent")}`}>
                <div className="grid grid-cols-[40px_1.4fr_100px_1.4fr_100px_150px] gap-3.5 items-center">
                  <Avatar name={r.emp} size={34}/>
                  <div>
                    <div className="text-[13.5px] font-bold text-ink">{r.emp}</div>
                    <div className="text-[11px] text-ink-3 mt-0.5">{r.dept} · <span className="font-mono">{r.id}</span></div>
                  </div>
                  <Pill tone={r.type === "Sick" ? "err" : r.type === "WFH" ? "info" : "primary"}>{r.type}</Pill>
                  <div>
                    <div className="text-[13px] font-bold text-ink">{r.from} – {r.to}</div>
                    <div className="text-[11px] text-ink-3 mt-0.5 font-mono">{r.days} day{r.days> 1 ? "s" : ""} · {r.balance}</div>
                  </div>
                  <span className="text-[11px] text-ink-3">{r.applied.includes("Today") ? r.applied.replace("Today, ", "") : r.applied}</span>
                  <div className="flex gap-1.5 justify-end">
                    <button onClick={e => e.stopPropagation()} className="py-1.75 px-2.75 border border-g bg-g-soft text-g-deep rounded-lg cursor-pointer flex items-center gap-1.25 text-[12px] font-bold font-sans">
                      <ThumbsUp size={12}/>Approve
                    </button>
                    <button onClick={e => e.stopPropagation()} className="py-1.75 px-2.75 border border-err bg-err-soft text-err rounded-lg cursor-pointer flex items-center gap-1.25 text-[12px] font-bold font-sans">
                      <ThumbsDown size={12}/>Decline
                    </button>
                  </div>
                </div>
                {r.reason && (
                  <div className="mt-2.5 pl-13.5 flex items-center gap-1.5">
                    <MessageSquare size={11} color={T.ink3}/>
                    <span className="text-[11.5px] text-ink-3 italic">"{r.reason}"</span>
                  </div>
                )}
              </div>
            ))}
          </Card>

          {/* Detail panel */}
          {selected && (
            <Card padding={0} className="h-fit sticky top-5">
              <div className="py-5 px-6 text-white rounded-[16px_16px_0_0]" style={{ background: `linear-gradient(135deg, ${T.gDark} 0%, ${T.gDeep} 100%)` }}>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-[11px] text-a tracking-[2px] uppercase font-extrabold">Review request</div>
                  <button onClick={() => setSelected(null)} className="bg-[rgba(255,255,255,0.15)] border-0 w-7 h-7 rounded-[7px] text-white cursor-pointer flex items-center justify-center">
                    <X size={14}/>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar name={selected.emp} size={48} tone="amber"/>
                  <div>
                    <div className="text-[18px] font-extrabold tracking-[-0.4px]">{selected.emp}</div>
                    <div className="text-[12px] opacity-85 mt-0.5">{selected.dept} · <span className="font-mono">{selected.id}</span></div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-[1fr_1fr] gap-3 mb-5">
                  {[
                    ["Leave type",  selected.type],
                    ["Duration",     `${selected.days} day${selected.days> 1 ? "s" : ""}`],
                    ["From",         selected.from],
                    ["To",           selected.to],
                    ["Balance",      selected.balance],
                    ["Applied",      selected.applied],
                  ].map((row, i) => (
                    <div key={i}>
                      <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">{row[0]}</div>
                      <div className="text-[13px] text-ink font-bold mt-1">{row[1]}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.2px] uppercase mb-2">Reason</div>
                  <div className="p-3.5 bg-canvas rounded-[10px] text-[13px] text-ink-2 leading-[1.5] italic border-l-3 border-l-g">"{selected.reason}"</div>
                </div>

                <div className="mb-5">
                  <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.2px] uppercase mb-2">Add comment (optional)</div>
                  <textarea placeholder="Share any notes with the employee…" rows={3} className="w-full py-2.5 px-3 border border-border rounded-lg font-sans text-[13px] outline-none resize-y"/>
                </div>

                <div className="flex gap-2.5">
                  <Btn variant="danger" icon={ThumbsDown} className="flex-1">Decline</Btn>
                  <Btn variant="primary" icon={ThumbsUp} className="flex-1">Approve</Btn>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {filter !== "pending" && (
        <Card padding={0}>
          {LEAVE_HISTORY
            .filter(h => filter === "all" || (filter === "approved" && h.status === "Approved") || (filter === "declined" && h.status === "Declined"))
            .map((h, i, arr) => (
              <div key={h.id} className={`grid grid-cols-[90px_1.4fr_100px_1.4fr_100px_1fr] gap-3.5 items-center py-3.5 px-5 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                <span className="font-mono text-[11.5px] text-ink-3 font-bold">{h.id}</span>
                <div className="flex items-center gap-2.5">
                  <Avatar name={h.emp} size={28}/>
                  <span className="text-[13px] font-bold text-ink">{h.emp}</span>
                </div>
                <Pill tone="primary">{h.type}</Pill>
                <div>
                  <div className="text-[12.5px] font-bold text-ink">{h.from} – {h.to}</div>
                  <div className="text-[10.5px] text-ink-3 font-mono mt-0.5">{h.days}d</div>
                </div>
                <Pill tone={h.status === "Approved" ? "ok" : "err"} dot>{h.status}</Pill>
                <span className="text-[11px] text-ink-3 italic">{h.by}</span>
              </div>
            ))}
        </Card>
      )}
    </div>
  );
};
