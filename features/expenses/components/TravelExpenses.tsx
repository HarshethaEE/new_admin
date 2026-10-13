"use client";

import { useState } from "react";
import { ArrowRight, Car, CheckCircle2, Clock, Download, Eye, FileCheck2, Fuel, Hotel, Plane, Plus, Printer, Receipt, Send, Train, Upload, UtensilsCrossed } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Btn, Card, PageHeader, Pill, StatKPI, X } from "@/shared/ui";
import { EXPENSES, TRAVEL_REQUESTS, VOUCHERS } from "../data/employee";

export const TravelExpenses = () => {
  const [tab, setTab] = useState("trips");
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(TRAVEL_REQUESTS[2]); // Completed trip, ready for voucher

  const tripExpenses = EXPENSES.filter(e => e.trip === selectedTrip?.id);
  const tripTotal = tripExpenses.reduce((s, e) => s + e.amount, 0);

  const totalApproved = EXPENSES.filter(e => e.status === "Reimbursed" || e.status === "Approved").reduce((s, e) => s + e.amount, 0);
  const totalPending = EXPENSES.filter(e => e.status === "Pending").reduce((s, e) => s + e.amount, 0);

  return (
    <div>
      <PageHeader
        title="Travel & Expenses"
        sub="Trip requests, expense tracking, and voucher generation"
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" icon={Plus}>New expense</Btn>
            <Btn variant="primary" icon={Plane}>Request travel</Btn>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        <StatKPI label="Active trips" value={TRAVEL_REQUESTS.filter(t => t.status === "Approved").length} trend="Delhi site visit · 15 Oct" icon={Plane}/>
        <StatKPI label="Pending approval" value={TRAVEL_REQUESTS.filter(t => t.status === "Pending").length} trend="Mysuru review" trendColor="amber" icon={Clock}/>
        <StatKPI label="Reimbursed (FY)" value={`₹${(totalApproved/1000).toFixed(1)}K`} trend="Across 8 trips" icon={CheckCircle2}/>
        <StatKPI label="Awaiting voucher" value={`₹${(totalPending/1000).toFixed(1)}K`} trend="Submit for payout" trendColor="amber" icon={Receipt}/>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-5">
        {[
          { id: "trips",     label: "Trips",     icon: Plane,   n: TRAVEL_REQUESTS.length },
          { id: "expenses",  label: "Expenses",  icon: Receipt, n: EXPENSES.length },
          { id: "vouchers",  label: "Vouchers",  icon: FileCheck2, n: VOUCHERS.length },
        ].map(t => {
          const Icon = t.icon;
          const on = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={`py-2.5 px-4 rounded-[10px] cursor-pointer text-[13px] font-bold font-sans flex items-center gap-2 ${(on ? "bg-g" : "bg-paper")} ${(on ? "text-white" : "text-ink-2")}`} style={{ border: `1px solid ${on ? T.g : T.border}` }}>
              <Icon size={14}/>{t.label}
              <span className={`text-[10.5px] font-extrabold py-px px-1.75 rounded-full ${(on ? "bg-[rgba(255,255,255,0.25)]" : "bg-canvas")} ${(on ? "text-white" : "text-ink-3")}`}>{t.n}</span>
            </button>
          );
        })}
      </div>

      {/* TRIPS TAB */}
      {tab === "trips" && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
          {TRAVEL_REQUESTS.map(t => {
            const modeIcon = { "Flight": Plane, "Car": Car, "Train": Train }[t.mode] || Plane;
            const ModeIcon = modeIcon;
            return (
              <Card key={t.id} padding={0} className="overflow-hidden">
                <div className="py-4.5 px-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <span className="font-mono text-[10.5px] text-ink-3 font-bold tracking-[1px]">{t.id}</span>
                      <div className="text-[14.5px] font-bold text-ink tracking-[-0.3px] mt-0.75">{t.purpose}</div>
                    </div>
                    <Pill tone={t.status === "Approved" ? "ok" : t.status === "Pending" ? "amber" : t.status === "Completed" ? "neutral" : "info"} dot>{t.status}</Pill>
                  </div>

                  <div className="py-3.5 px-4 bg-g-bg rounded-[10px] border border-border mt-3.5">
                    <div className="flex items-center gap-3.5 mb-2.5">
                      <div className="w-9 h-9 rounded-[9px] bg-g-soft text-g-deep flex items-center justify-center">
                        <ModeIcon size={16}/>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.75 text-[13px] font-bold text-ink">
                          <span>{t.from}</span>
                          <ArrowRight size={13} color={T.ink3}/>
                          <span>{t.to}</span>
                        </div>
                        <div className="text-[11px] text-ink-3 mt-0.5">{t.dates} · {t.mode}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_1fr] gap-3 mt-3.5">
                    <div>
                      <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">Budget</div>
                      <div className="text-[15px] font-extrabold text-ink font-mono mt-0.75">₹ {t.budget.toLocaleString("en-IN")}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">Approver</div>
                      <div className="text-[13px] font-bold text-ink mt-0.75">{t.approver}</div>
                    </div>
                  </div>
                </div>

                {t.status === "Completed" && (
                  <div className="py-3 px-5 bg-g-mist border-t border-t-g-soft flex justify-between items-center">
                    <div className="text-[11.5px] text-g-deep font-bold">Trip complete · ready for voucher</div>
                    <button onClick={() => { setSelectedTrip(t); setShowVoucherModal(true); }} className="py-1.5 px-3 bg-g text-white border border-g rounded-[7px] text-[11.5px] font-bold font-sans cursor-pointer flex items-center gap-1.25">
                      <Receipt size={12}/>Generate voucher
                    </button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* EXPENSES TAB */}
      {tab === "expenses" && (
        <Card padding={0}>
          <div className="py-3.5 px-5 border-b border-b-border">
            <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">All expenses</div>
          </div>
          {EXPENSES.map((e, i, arr) => {
            const catIcon = {
              "Flight": Plane, "Hotel": Hotel, "Meals": UtensilsCrossed,
              "Local Transport": Car, "Fuel": Fuel,
            }[e.category] || Receipt;
            const CatIcon = catIcon;
            return (
              <div key={e.id} className={`grid grid-cols-[90px_40px_1.5fr_100px_90px_110px_60px] gap-3.5 items-center py-3.5 px-5 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                <span className="font-mono text-[11.5px] text-ink-3 font-bold">{e.id}</span>
                <div className="w-8 h-8 rounded-lg bg-g-soft text-g-deep flex items-center justify-center">
                  <CatIcon size={15}/>
                </div>
                <div>
                  <div className="text-[13px] font-bold text-ink">{e.description}</div>
                  <div className="text-[11px] text-ink-3 mt-0.5">{e.category} · <span className="font-mono">{e.trip}</span></div>
                </div>
                <span className="text-[11.5px] text-ink-3">{e.date}</span>
                <span className="font-mono text-[13px] font-extrabold text-ink">₹ {e.amount.toLocaleString("en-IN")}</span>
                <Pill tone={e.status === "Reimbursed" ? "ok" : e.status === "Approved" ? "info" : "amber"} dot>{e.status}</Pill>
                {e.receipt ? (
                  <button className="w-7 h-7 border border-border bg-paper rounded-[7px] cursor-pointer inline-flex items-center justify-center">
                    <Eye size={13} color={T.ink3}/>
                  </button>
                ) : (
                  <button className="w-7 h-7 border border-a-soft bg-a-soft text-a-dark rounded-[7px] cursor-pointer inline-flex items-center justify-center">
                    <Upload size={13}/>
                  </button>
                )}
              </div>
            );
          })}
        </Card>
      )}

      {/* VOUCHERS TAB */}
      {tab === "vouchers" && (
        <>
          <Card padding={22} className="mb-5 text-white border-0" style={{ background: `linear-gradient(135deg, ${T.gDark} 0%, ${T.gDeep} 100%)` }}>
            <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-6 items-center">
              <div>
                <div className="text-[11px] text-a tracking-[2px] uppercase font-extrabold mb-1">Reimbursement vouchers</div>
                <div className="text-[22px] font-extrabold tracking-[-0.5px]">₹ {VOUCHERS.reduce((s, v) => s + v.total, 0).toLocaleString("en-IN")} received</div>
                <div className="text-[12px] opacity-85 mt-1">Across {VOUCHERS.length} vouchers this FY</div>
              </div>
              <div>
                <div className="text-[10.5px] tracking-[1.5px] uppercase opacity-75 font-extrabold">Avg processing</div>
                <div className="text-[22px] font-extrabold mt-1 font-mono">2.1 days</div>
              </div>
              <div>
                <div className="text-[10.5px] tracking-[1.5px] uppercase opacity-75 font-extrabold">Pending now</div>
                <div className="text-[22px] font-extrabold mt-1 font-mono text-a">₹ 0</div>
              </div>
            </div>
          </Card>

          <Card padding={0}>
            <div className="py-3.5 px-5 border-b border-b-border flex justify-between items-center">
              <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Issued vouchers</div>
              <Btn variant="ghost" size="sm" icon={Download}>Export</Btn>
            </div>
            {VOUCHERS.map((v, i, arr) => (
              <div key={v.id} className={`grid grid-cols-[110px_100px_110px_110px_1fr_110px_100px] gap-3.5 items-center py-4 px-5 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                <div className="flex items-center gap-2.25">
                  <div className="w-8 h-8 rounded-lg bg-g-soft text-g-deep flex items-center justify-center">
                    <Receipt size={14}/>
                  </div>
                  <span className="font-mono text-[11.5px] text-ink font-bold">{v.id}</span>
                </div>
                <span className="font-mono text-[11.5px] text-ink-3 font-bold">{v.trip}</span>
                <span className="text-[11.5px] text-ink-3">{v.issued}</span>
                <span className="font-mono text-[14px] font-extrabold text-ink">₹ {v.total.toLocaleString("en-IN")}</span>
                <div className="text-[11.5px] text-ink-3">Paid to <strong className="text-ink-2 font-mono">{v.paidTo}</strong> on {v.paidOn}</div>
                <Pill tone="ok" dot>{v.status}</Pill>
                <div className="flex gap-1.5 justify-end">
                  <Btn variant="ghost" size="sm" icon={Download}>PDF</Btn>
                </div>
              </div>
            ))}
          </Card>
        </>
      )}

      {/* Voucher generation modal */}
      {showVoucherModal && selectedTrip && (
        <div className="fixed inset-0 bg-[rgba(15,23,42,0.5)] flex items-center justify-center z-100 p-5" onClick={() => setShowVoucherModal(false)}>
          <div onClick={e => e.stopPropagation()} className="w-160 max-h-[90vh] overflow-y-auto bg-paper rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            {/* Header */}
            <div className="py-6 px-7 text-white rounded-[16px_16px_0_0] relative" style={{ background: `linear-gradient(135deg, ${T.gDark} 0%, ${T.gDeep} 100%)` }}>
              <button onClick={() => setShowVoucherModal(false)} className="absolute top-4 right-4 bg-[rgba(255,255,255,0.15)] border-0 w-8 h-8 rounded-lg text-white cursor-pointer flex items-center justify-center">
                <X size={16}/>
              </button>
              <div className="text-[11px] text-a tracking-[2px] uppercase font-extrabold mb-1">Generate expense voucher</div>
              <div className="text-[22px] font-extrabold tracking-[-0.6px]">{selectedTrip.purpose}</div>
              <div className="text-[12.5px] opacity-90 mt-1">{selectedTrip.id} · {selectedTrip.from} → {selectedTrip.to} · {selectedTrip.dates}</div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Expenses to include */}
              <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.4px] uppercase mb-2.5">Expenses to reimburse</div>
              <div className="border border-border rounded-[10px] overflow-hidden mb-5">
                {tripExpenses.map((e, i, arr) => {
                  const catIcon = { "Flight": Plane, "Hotel": Hotel, "Meals": UtensilsCrossed, "Local Transport": Car }[e.category] || Receipt;
                  const CatIcon = catIcon;
                  return (
                    <div key={e.id} className={`flex items-center gap-3 py-3 px-4 bg-paper ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                      <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" style={{ accentColor: T.g }}/>
                      <div className="w-7 h-7 rounded-[7px] bg-g-soft text-g-deep flex items-center justify-center">
                        <CatIcon size={13}/>
                      </div>
                      <div className="flex-1">
                        <div className="text-[12.5px] font-bold text-ink">{e.description}</div>
                        <div className="text-[10.5px] text-ink-3 mt-0.5">{e.category} · {e.date}</div>
                      </div>
                      <span className="font-mono text-[13px] font-extrabold text-ink">₹ {e.amount.toLocaleString("en-IN")}</span>
                    </div>
                  );
                })}
                <div className="py-3.5 px-4 bg-g-bg border-t border-t-border flex justify-between items-center">
                  <span className="text-[12px] text-g-deep font-extrabold tracking-[1.2px] uppercase">Voucher total</span>
                  <span className="font-mono text-[20px] font-extrabold text-g-deep">₹ {tripTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Payout account */}
              <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.4px] uppercase mb-2.5">Payout account</div>
              <div className="p-3.5 bg-canvas border border-border rounded-[10px] flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-[9px] bg-b-soft text-b-dark flex items-center justify-center text-[10px] font-extrabold">IC</div>
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-ink">ICICI Bank · Salary account</div>
                  <div className="text-[11.5px] text-ink-3 mt-0.5 font-mono">•••• 4832 · IFSC ICIC0001234</div>
                </div>
                <Pill tone="ok" size="sm" dot>Verified</Pill>
              </div>

              {/* Notes */}
              <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.4px] uppercase mb-2.5">Notes (optional)</div>
              <textarea rows={3} placeholder="Any additional notes for finance…" className="w-full py-2.5 px-3 border border-border rounded-lg font-sans text-[13px] outline-none resize-y mb-5"/>

              {/* Actions */}
              <div className="flex gap-2.5 justify-between items-center">
                <Btn variant="ghost" icon={Printer}>Preview</Btn>
                <div className="flex gap-2.5">
                  <Btn variant="ghost" onClick={() => setShowVoucherModal(false)}>Cancel</Btn>
                  <Btn variant="primary" icon={Send}>Submit for payout</Btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
