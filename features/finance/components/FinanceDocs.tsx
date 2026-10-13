"use client";

import { useState } from "react";
import { Briefcase, Download, Edit3, Eye, FileCheck2, FileText, Filter, Plus, Send } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Btn, Card, PageHeader, Pill, StatKPI } from "@/shared/ui";
import { INVOICES, PROPOSALS } from "../data";

export const FinanceDocs = () => {
  const [tab, setTab] = useState("invoices");

  const invTotal = INVOICES.reduce((s, i) => s + i.amount, 0);
  const invPaid = INVOICES.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const invOverdue = INVOICES.filter(i => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);
  const invOutstanding = INVOICES.filter(i => i.status === "Sent").reduce((s, i) => s + i.amount, 0);

  const propActive = PROPOSALS.filter(p => ["Sent", "Negotiating", "Draft"].includes(p.status));
  const propActiveValue = propActive.reduce((s, p) => s + p.value, 0);
  const propWon = PROPOSALS.filter(p => p.status === "Won").reduce((s, p) => s + p.value, 0);
  const winRate = Math.round((PROPOSALS.filter(p => p.status === "Won").length / PROPOSALS.filter(p => p.status === "Won" || p.status === "Lost").length) * 100);

  return (
    <div>
      <PageHeader
        title="Invoices & Proposals"
        sub="Client billing, outstanding dues, and sales pipeline documents"
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" icon={Download}>Export</Btn>
            <Btn variant="primary" icon={Plus}>{tab === "invoices" ? "New invoice" : "New proposal"}</Btn>
          </div>
        }
      />

      {/* Tab switcher */}
      <div className="flex gap-2 mb-5">
        {[
          { id: "invoices",  label: "Invoices",   icon: FileCheck2, n: INVOICES.length },
          { id: "proposals", label: "Proposals",  icon: Briefcase,  n: PROPOSALS.length },
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

      {tab === "invoices" && (
        <>
          <div className="grid grid-cols-4 gap-3.5 mb-5">
            <StatKPI label="Total billed (FY)" value={`₹${(invTotal/10000000).toFixed(2)}Cr`} trend="7 invoices this quarter" sub=""/>
            <StatKPI label="Paid" value={`₹${(invPaid/10000000).toFixed(2)}Cr`} trend={`${INVOICES.filter(i => i.status === "Paid").length} invoices received`}/>
            <StatKPI label="Outstanding" value={`₹${(invOutstanding/10000000).toFixed(2)}Cr`} trend={`${INVOICES.filter(i => i.status === "Sent").length} within due date`}/>
            <StatKPI label="Overdue" value={`₹${(invOverdue/100000).toFixed(1)}L`} trend={`${INVOICES.filter(i => i.status === "Overdue").length} invoices · follow up`} trendColor="amber"/>
          </div>

          <Card padding={0}>
            <div className="py-3.5 px-5 border-b border-b-border flex justify-between items-center">
              <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">All invoices</div>
              <div className="flex gap-1.5">
                <Btn variant="ghost" size="sm" icon={Filter}>Filter</Btn>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full font-sans" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr className="bg-canvas">
                    {["Invoice", "Client", "Project", "Issued", "Due", "Amount", "Status", ""].map((h, i) => (
                      <th key={i} className={`py-2.75 px-4 text-[10.5px] font-extrabold tracking-[1.4px] uppercase text-ink-3 border-b border-b-border whitespace-nowrap ${(i === 7 ? "text-right" : "text-left")}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INVOICES.map((inv, i, arr) => (
                    <tr key={inv.id} className={`${(inv.status === "Overdue" ? "bg-[#FFF5F5]" : "bg-paper")} ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                      <td className="py-3.25 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7.5 h-7.5 rounded-lg bg-g-soft text-g-deep flex items-center justify-center">
                            <FileText size={14}/>
                          </div>
                          <span className="font-mono text-[11.5px] text-ink font-bold">{inv.id}</span>
                        </div>
                      </td>
                      <td className="py-3.25 px-4 text-[13px] font-bold text-ink">{inv.client}</td>
                      <td className="py-3.25 px-4 text-[12px] text-ink-2">{inv.project}</td>
                      <td className="py-3.25 px-4 text-[11.5px] text-ink-3 font-mono">{inv.issued}</td>
                      <td className="py-3.25 px-4">
                        <div className={`text-[11.5px] font-mono ${(inv.daysOut < 0 ? "text-err" : "text-ink-2")} ${(inv.daysOut < 0 ? "font-bold" : "font-medium")}`}>{inv.due}</div>
                        {inv.daysOut < 0 && <div className="text-[10px] text-err font-bold mt-0.5">{Math.abs(inv.daysOut)}d overdue</div>}
                        {inv.daysOut> 0 && inv.status === "Sent" && <div className="text-[10px] text-ink-3 mt-0.5">{inv.daysOut}d left</div>}
                      </td>
                      <td className="py-3.25 px-4 font-mono text-[13.5px] font-extrabold text-ink">₹ {inv.amount.toLocaleString("en-IN")}</td>
                      <td className="py-3.25 px-4">
                        <Pill tone={inv.status === "Paid" ? "ok" : inv.status === "Overdue" ? "err" : "primary"} dot>{inv.status}</Pill>
                      </td>
                      <td className="py-3.25 px-4 text-right">
                        <div className="flex gap-1 justify-end">
                          <button className="w-7 h-7 border border-border bg-paper rounded-[7px] cursor-pointer inline-flex items-center justify-center">
                            <Eye size={13} color={T.ink3}/>
                          </button>
                          <button className="w-7 h-7 border border-border bg-paper rounded-[7px] cursor-pointer inline-flex items-center justify-center">
                            <Download size={13} color={T.ink3}/>
                          </button>
                          {inv.status === "Overdue" && (
                            <button className="py-1.5 px-2.5 border border-a bg-a text-white rounded-[7px] cursor-pointer flex items-center gap-1 text-[11px] font-bold font-sans">
                              <Send size={11}/>Follow up
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {tab === "proposals" && (
        <>
          <div className="grid grid-cols-4 gap-3.5 mb-5">
            <StatKPI label="Active proposals" value={propActive.length} trend={`₹${(propActiveValue/10000000).toFixed(1)}Cr pipeline value`}/>
            <StatKPI label="Won (FY)" value={`₹${(propWon/10000000).toFixed(2)}Cr`} trend={`${PROPOSALS.filter(p => p.status === "Won").length} proposal won`}/>
            <StatKPI label="Win rate" value={`${winRate}%`} trend="Last 10 deals" sub=""/>
            <StatKPI label="Avg deal size" value="₹ 1.4Cr" trend="Trending up" sub=""/>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
            {PROPOSALS.map(p => (
              <Card key={p.id} padding={0} className="overflow-hidden">
                <div className="py-4.5 px-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <span className="font-mono text-[10.5px] text-ink-3 font-bold tracking-[1px]">{p.id}</span>
                      <div className="text-[14.5px] font-bold text-ink tracking-[-0.3px] mt-0.75">{p.client}</div>
                      <div className="text-[11.5px] text-ink-3 mt-1 leading-[1.4]">{p.scope}</div>
                    </div>
                    <Pill tone={
                      p.status === "Won" ? "ok" :
                      p.status === "Lost" ? "err" :
                      p.status === "Draft" ? "neutral" :
                      p.status === "Negotiating" ? "amber" : "primary"
                    } dot>{p.status}</Pill>
                  </div>

                  <div className="grid grid-cols-[1fr_1fr] gap-3 mt-3.5 py-3.5 px-0 border-t border-t-border border-b border-b-border">
                    <div>
                      <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">Deal value</div>
                      <div className={`text-[17px] font-extrabold font-mono mt-1 ${(p.status === "Won" ? "text-g-deep" : "text-ink")}`}>₹ {(p.value/10000000).toFixed(2)}Cr</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">{p.status === "Sent" || p.status === "Negotiating" ? "Expires" : "Sent"}</div>
                      <div className="text-[13px] font-bold text-ink mt-1">{p.status === "Draft" || p.status === "Won" || p.status === "Lost" ? p.sent : p.expires}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3.5">
                    <span className="text-[11.5px] text-ink-3 italic">{p.stage}</span>
                    <div className="flex gap-1.5">
                      <Btn variant="ghost" size="sm" icon={Eye}>Open</Btn>
                      {p.status === "Draft" && <Btn variant="primary" size="sm" icon={Send}>Send</Btn>}
                      {(p.status === "Sent" || p.status === "Negotiating") && <Btn variant="primary" size="sm" icon={Edit3}>Revise</Btn>}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
