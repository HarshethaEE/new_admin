"use client";

import { useState } from "react";
import { Briefcase, Car, CreditCard, Download, FileText, Hotel, Plane, Printer, Receipt, Send, ThumbsDown, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Avatar, Btn, Card, PageHeader, Pill, StatKPI, X } from "@/shared/ui";
import { PAID_VOUCHERS, PENDING_VOUCHERS, VOUCHER_LINE_ITEMS } from "../data/management";
import type { Voucher } from "../types";

export const VoucherApprovals = () => {
  const [tab, setTab] = useState("pending");
  const [selected, setSelected] = useState<Voucher | null>(PENDING_VOUCHERS[0]);

  const pendingTotal = PENDING_VOUCHERS.reduce((s, v) => s + v.total, 0);
  const paidTotal = PAID_VOUCHERS.reduce((s, v) => s + v.total, 0);
  const lineItems = selected ? (VOUCHER_LINE_ITEMS[selected.id] || VOUCHER_LINE_ITEMS["VCH-00132"]) : [];

  return (
    <div>
      <PageHeader
        title="Vouchers"
        sub={`${PENDING_VOUCHERS.length} vouchers awaiting payout · ₹ ${pendingTotal.toLocaleString("en-IN")} total`}
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" icon={Download}>Export</Btn>
            <Btn variant="primary" icon={Send}>Pay all approved</Btn>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        <StatKPI label="Pending payout" value={`₹${(pendingTotal/1000).toFixed(1)}K`} trend={`${PENDING_VOUCHERS.length} vouchers`} trendColor="amber"/>
        <StatKPI label="Paid this month" value={`₹${(paidTotal/1000).toFixed(1)}K`} trend={`${PAID_VOUCHERS.length} vouchers`}/>
        <StatKPI label="Avg processing" value="2.1 days" trend="SLA target: 3 days"/>
        <StatKPI label="High priority" value={PENDING_VOUCHERS.filter(v => v.urgency === "high").length} trend="Travel vouchers · urgent" trendColor="amber"/>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-5">
        {[
          { id: "pending", label: "Pending payout", n: PENDING_VOUCHERS.length },
          { id: "paid",    label: "Paid",            n: PAID_VOUCHERS.length },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`py-2.5 px-4 rounded-[10px] cursor-pointer text-[13px] font-bold font-sans flex items-center gap-1.75 ${(tab === t.id ? "bg-g" : "bg-paper")} ${(tab === t.id ? "text-white" : "text-ink-2")}`} style={{ border: `1px solid ${tab === t.id ? T.g : T.border}` }}>
            {t.label}
            <span className={`text-[10.5px] font-extrabold py-px px-1.75 rounded-full ${(tab === t.id ? "bg-[rgba(255,255,255,0.25)]" : "bg-canvas")} ${(tab === t.id ? "text-white" : "text-ink-3")}`}>{t.n}</span>
          </button>
        ))}
      </div>

      {tab === "pending" && (
        <div className={`grid gap-4.5 ${(selected ? "grid-cols-[1.3fr_1fr]" : "grid-cols-[1fr]")}`}>
          {/* Voucher list */}
          <Card padding={0}>
            {PENDING_VOUCHERS.map((v, i, arr) => (
              <div key={v.id} onClick={() => setSelected(v)} className={`py-4 px-5 cursor-pointer ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")} ${(selected?.id === v.id ? "bg-g-mist" : "bg-paper")} ${(selected?.id === v.id ? "border-l-3 border-l-g" : "border-l-3 border-l-transparent")}`}>
                <div className="grid grid-cols-[40px_1.4fr_1fr_90px_1fr_150px] gap-3.5 items-center">
                  <Avatar name={v.emp} size={34}/>
                  <div>
                    <div className="text-[13.5px] font-bold text-ink">{v.emp}</div>
                    <div className="text-[11px] text-ink-3 mt-0.5">{v.dept} · <span className="font-mono">{v.empId}</span></div>
                  </div>
                  <div>
                    <div className="font-mono text-[11.5px] text-ink-3 font-bold">{v.id}</div>
                    <div className="text-[11px] text-ink-3 mt-0.5">{v.trip}</div>
                  </div>
                  <Pill tone={v.urgency === "high" ? "err" : "primary"}>{v.items} items</Pill>
                  <div>
                    <div className="font-mono text-[15px] font-extrabold text-ink">₹ {v.total.toLocaleString("en-IN")}</div>
                    <div className="text-[10.5px] text-ink-3 mt-0.5">{v.submitted}</div>
                  </div>
                  <div className="flex gap-1.5 justify-end">
                    <button onClick={e => e.stopPropagation()} className="py-1.75 px-2.75 border border-g bg-g text-white rounded-lg cursor-pointer flex items-center gap-1.25 text-[12px] font-bold font-sans">
                      <CreditCard size={12}/>Pay now
                    </button>
                  </div>
                </div>
                <div className="mt-2.5 pl-13.5 flex items-center gap-1.5">
                  <Briefcase size={11} color={T.ink3}/>
                  <span className="text-[11.5px] text-ink-3 italic">{v.purpose}</span>
                </div>
              </div>
            ))}
          </Card>

          {/* Voucher detail */}
          {selected && (
            <Card padding={0} className="h-fit sticky top-5">
              <div className="py-5 px-6 text-white rounded-[16px_16px_0_0]" style={{ background: `linear-gradient(135deg, ${T.gDark} 0%, ${T.gDeep} 100%)` }}>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-[11px] text-a tracking-[2px] uppercase font-extrabold">Voucher detail</div>
                  <button onClick={() => setSelected(null)} className="bg-[rgba(255,255,255,0.15)] border-0 w-7 h-7 rounded-[7px] text-white cursor-pointer flex items-center justify-center">
                    <X size={14}/>
                  </button>
                </div>
                <div className="font-mono text-[15px] font-extrabold mb-2.5">{selected.id}</div>
                <div className="text-[15px] font-bold mb-1">{selected.purpose}</div>
                <div className="text-[12px] opacity-90">{selected.emp} · {selected.dept}</div>
              </div>

              <div className="p-6">
                <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.4px] uppercase mb-2.5">Line items</div>
                <div className="border border-border rounded-[10px] overflow-hidden mb-4">
                  {lineItems.map((e, i, arr) => {
                    const catIcon: LucideIcon = ({ "Flight": Plane, "Hotel": Hotel, "Meals": UtensilsCrossed, "Local Transport": Car, "Fuel": Receipt, "Misc": FileText } as Record<string, LucideIcon>)[e.category] || Receipt;
                    const CatIcon = catIcon;
                    return (
                      <div key={i} className={`flex items-center gap-2.75 py-2.75 px-3.5 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                        <div className="w-7 h-7 rounded-[7px] bg-g-soft text-g-deep flex items-center justify-center">
                          <CatIcon size={13}/>
                        </div>
                        <div className="flex-1">
                          <div className="text-[12.5px] font-bold text-ink">{e.description}</div>
                          <div className="text-[10.5px] text-ink-3 mt-0.5">{e.category} · {e.date} {e.receipt && "· 📎"}</div>
                        </div>
                        <span className="font-mono text-[12.5px] font-extrabold text-ink">₹ {e.amount.toLocaleString("en-IN")}</span>
                      </div>
                    );
                  })}
                  <div className="py-3 px-3.5 bg-g-bg border-t border-t-border flex justify-between items-center">
                    <span className="text-[12px] text-g-deep font-extrabold tracking-[1.2px] uppercase">Total payable</span>
                    <span className="font-mono text-[18px] font-extrabold text-g-deep">₹ {selected.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.4px] uppercase mb-2.5">Payout to</div>
                <div className="p-3 bg-canvas border border-border rounded-[10px] flex items-center gap-2.75 mb-5">
                  <div className="w-8.5 h-8.5 rounded-lg bg-b-soft text-b-dark flex items-center justify-center">
                    <CreditCard size={15}/>
                  </div>
                  <div className="flex-1">
                    <div className="text-[12.5px] font-bold text-ink">{selected.emp}'s salary account</div>
                    <div className="text-[11px] text-ink-3 mt-0.5 font-mono">{selected.account}</div>
                  </div>
                  <Pill tone="ok" size="sm" dot>Verified</Pill>
                </div>

                <div className="flex gap-2.5">
                  <Btn variant="ghost" icon={Printer}>Preview</Btn>
                  <Btn variant="danger" icon={ThumbsDown} className="flex-1">Decline</Btn>
                  <Btn variant="primary" icon={CreditCard} className="flex-1.2">Approve & Pay</Btn>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {tab === "paid" && (
        <Card padding={0}>
          {PAID_VOUCHERS.map((v, i, arr) => (
            <div key={v.id} className={`grid grid-cols-[40px_1.4fr_1.2fr_1fr_1fr_110px_100px] gap-3.5 items-center py-3.5 px-5 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
              <Avatar name={v.emp} size={32}/>
              <div>
                <div className="text-[13px] font-bold text-ink">{v.emp}</div>
                <div className="text-[11px] text-ink-3 mt-0.5 font-mono">{v.empId}</div>
              </div>
              <div className="text-[12px] text-ink-2">{v.purpose}</div>
              <span className="font-mono text-[11.5px] text-ink-3 font-bold">{v.id}</span>
              <span className="text-[11px] text-ink-3">Paid {v.paid}</span>
              <span className="font-mono text-[13px] font-extrabold text-ink">₹ {v.total.toLocaleString("en-IN")}</span>
              <div className="flex gap-1.5 justify-end">
                <Btn variant="ghost" size="sm" icon={Download}>PDF</Btn>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};
