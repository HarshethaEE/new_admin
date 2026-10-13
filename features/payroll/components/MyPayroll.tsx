"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Btn, Card, PageHeader } from "@/shared/ui";

/* ══════════════════════════════════════════════════════════════════════
   §08 · PAYROLL — just payslip
   ══════════════════════════════════════════════════════════════════════ */

type PayslipLine = [label: string, amount: number];

export const MyPayroll = () => {
  const [selectedMonth, setSelectedMonth] = useState("Sep 2026");

  const payslipData: { month: string; disbursed: string; account: string; earnings: PayslipLine[]; deductions: PayslipLine[]; gross: number; net: number } = {
    month: "September 2026",
    disbursed: "30 Sep 2026",
    account: "ICICI •••• 4832",
    earnings: [
      ["Basic",          61667],
      ["HRA",            30833],
      ["LTA",            8000],
      ["Special allow",  42416],
      ["Variable pay",   11250],
    ],
    deductions: [
      ["Provident Fund",   7400],
      ["Professional Tax", 200],
      ["Income Tax (TDS)",14580],
      ["Health insurance", 1250],
    ],
    gross: 154166,
    net: 130736,
  };

  const payslipHistory = [
    { month: "Sep 2026", net: 130736, disbursed: "30 Sep", status: "Paid" },
    { month: "Aug 2026", net: 128412, disbursed: "31 Aug", status: "Paid" },
    { month: "Jul 2026", net: 128412, disbursed: "31 Jul", status: "Paid" },
    { month: "Jun 2026", net: 128412, disbursed: "30 Jun", status: "Paid" },
    { month: "May 2026", net: 128412, disbursed: "31 May", status: "Paid" },
    { month: "Apr 2026", net: 128412, disbursed: "30 Apr", status: "Paid" },
    { month: "Mar 2026", net: 114822, disbursed: "31 Mar", status: "Paid" },
    { month: "Feb 2026", net: 114822, disbursed: "28 Feb", status: "Paid" },
  ];

  return (
    <div>
      <PageHeader
        title="Payroll"
        sub="Your payslips · download anytime"
        action={<Btn variant="ghost" icon={Download}>Download Form 16</Btn>}
      />

      <div className="grid grid-cols-[2fr_1fr] gap-4.5">
        {/* Payslip detail */}
        <Card padding={0}>
          <div className="py-5.5 px-6.5 text-white" style={{ background: `linear-gradient(135deg, ${T.gDark} 0%, ${T.gDeep} 100%)` }}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] text-a tracking-[2px] uppercase font-extrabold mb-1">Payslip</div>
                <div className="text-[24px] font-extrabold tracking-[-0.6px]">{payslipData.month}</div>
                <div className="text-[12px] opacity-85 mt-1.5">Disbursed {payslipData.disbursed} · {payslipData.account}</div>
              </div>
              <Btn variant="amber" icon={Download}>Download PDF</Btn>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-[1fr_1fr] gap-6">
              <div>
                <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.4px] uppercase mb-3">Earnings</div>
                {payslipData.earnings.map((e, i, arr) => (
                  <div key={i} className={`flex justify-between py-2.5 px-0 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                    <span className="text-[13px] text-ink-2">{e[0]}</span>
                    <span className="font-mono text-[13px] font-bold text-ink">₹ {e[1].toLocaleString("en-IN")}</span>
                  </div>
                ))}
                <div className="flex justify-between py-3 px-0 border-t-2 border-t-border mt-1">
                  <span className="text-[13px] font-extrabold text-ink">Gross</span>
                  <span className="font-mono text-[14px] font-extrabold text-ink">₹ {payslipData.gross.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.4px] uppercase mb-3">Deductions</div>
                {payslipData.deductions.map((d, i, arr) => (
                  <div key={i} className={`flex justify-between py-2.5 px-0 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                    <span className="text-[13px] text-ink-2">{d[0]}</span>
                    <span className="font-mono text-[13px] font-bold text-err">− ₹ {d[1].toLocaleString("en-IN")}</span>
                  </div>
                ))}
                <div className="flex justify-between py-3 px-0 border-t-2 border-t-border mt-1">
                  <span className="text-[13px] font-extrabold text-ink">Total deductions</span>
                  <span className="font-mono text-[14px] font-extrabold text-err">− ₹ {payslipData.deductions.reduce((s, d) => s + d[1], 0).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-4.5 px-6 bg-g-mist border border-g-soft rounded-xl mt-6">
              <div>
                <div className="text-[11px] text-g-deep font-extrabold tracking-[1.2px] uppercase">Net paid</div>
                <div className="text-[11.5px] text-ink-3 mt-0.75">Credited to {payslipData.account}</div>
              </div>
              <span className="font-mono text-[26px] font-extrabold text-g-deep tracking-[-0.8px]">₹ {payslipData.net.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </Card>

        {/* Payslip history */}
        <Card padding={0}>
          <div className="py-4 px-5 border-b border-b-border">
            <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">All payslips</div>
            <div className="text-[11px] text-ink-3 mt-0.5">Click to view · download anytime</div>
          </div>
          {payslipHistory.map((p, i, arr) => (
            <button key={i} onClick={() => setSelectedMonth(p.month)} className={`w-full flex items-center gap-3 py-3.5 px-5 border-0 cursor-pointer text-left font-sans ${(p.month === selectedMonth ? "bg-g-mist" : "bg-paper hover:bg-g-bg")} ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")} ${(p.month === selectedMonth ? "border-l-3 border-l-g" : "border-l-3 border-l-transparent")}`}>
              <div className="w-9 h-9 rounded-[9px] bg-g-soft text-g-deep flex items-center justify-center">
                <FileText size={16}/>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-ink">{p.month}</div>
                <div className="text-[11px] text-ink-3 mt-0.5 font-mono">₹ {p.net.toLocaleString("en-IN")} · {p.disbursed}</div>
              </div>
              <Download size={14} color={T.ink3}/>
            </button>
          ))}
        </Card>
      </div>
    </div>
  );
};
