"use client";

import { useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Briefcase, HeartPulse, Home, MoreHorizontal, Paperclip, Send, Trash2, Umbrella } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Btn, X } from "@/shared/ui";
import { ME } from "@/features/account";
import { TEAM_MEMBERS } from "@/features/projects";
import { LEAVES } from "../data/employee";

export type LeaveKind = "Sick" | "Casual" | "Work From Home" | "Other";

export interface NewLeaveRequest {
  type: string;
  from: string;      // yyyy-mm-dd
  to: string;        // yyyy-mm-dd
  session: "full" | "first-half" | "second-half";
  days: number;
  reason: string;
  approver: string;
  location?: string;
  attachment?: string;
}

const KINDS: { id: LeaveKind; label: string; icon: typeof Umbrella; balanceCode?: string }[] = [
  { id: "Sick",           label: "Sick",           icon: HeartPulse, balanceCode: "SL" },
  { id: "Casual",         label: "Casual",         icon: Umbrella,   balanceCode: "CL" },
  { id: "Work From Home", label: "Work from home", icon: Home },
  { id: "Other",          label: "Other",          icon: MoreHorizontal },
];

const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parseISO = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d); };

/** Mon–Fri between two dates, inclusive. */
const workingDays = (from: string, to: string) => {
  if (!from || !to || to < from) return 0;
  let n = 0;
  for (let d = parseISO(from); d <= parseISO(to); d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) n++;
  }
  return n;
};

const labelCls = "block text-[12px] font-bold text-ink-2 mb-1.5";
const inputCls = "w-full py-2.5 px-3 rounded-[10px] border border-border bg-paper text-[13px] text-ink font-sans placeholder:text-mute focus:outline-hidden focus:border-g";

export const RequestLeaveModal = ({ onClose, onSubmit }: {
  onClose: () => void;
  onSubmit: (req: NewLeaveRequest) => void;
}) => {
  const today = toISO(new Date());
  const [kind, setKind] = useState<LeaveKind>("Casual");
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [session, setSession] = useState<NewLeaveRequest["session"]>("full");
  const [reason, setReason] = useState("");
  const [approver, setApprover] = useState(TEAM_MEMBERS[1]?.id ?? "");
  const [location, setLocation] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const singleDay = from === to;
  const isWfh = kind === "Work From Home";
  const days = useMemo(() => {
    const n = workingDays(from, to);
    return singleDay && session !== "full" ? n * 0.5 : n;
  }, [from, to, singleDay, session]);

  const balance = (() => {
    const code = KINDS.find(k => k.id === kind)?.balanceCode;
    const l = code ? LEAVES.find(x => x.code === code) : undefined;
    return l ? l.total - l.used : null;
  })();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!from || !to) return setError("Pick the start and end dates.");
    if (to < from) return setError("The end date can't be before the start date.");
    if (!days) return setError("The selected dates fall on a weekend — pick at least one working day.");
    if (!reason.trim()) return setError("Add a reason for this request.");
    if (balance !== null && days > balance) return setError(`You only have ${balance} ${kind.toLowerCase()} day${balance === 1 ? "" : "s"} left.`);

    onSubmit({
      type: kind,
      from, to, session: singleDay ? session : "full", days,
      reason: reason.trim(),
      approver: TEAM_MEMBERS.find(m => m.id === approver)?.name ?? "",
      location: isWfh ? location.trim() || undefined : undefined,
      attachment: attachment?.name,
    });
  };

  return (
    <div className="fixed inset-0 bg-[rgba(15,23,42,0.5)] flex items-center justify-center z-100 p-5" onClick={onClose}>
      <form onSubmit={submit} onClick={e => e.stopPropagation()} className="w-160 max-h-[90vh] overflow-y-auto bg-paper rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        {/* Header */}
        <div className="py-5 px-7 text-white rounded-[16px_16px_0_0] relative" style={{ background: `linear-gradient(135deg, ${T.gDark} 0%, ${T.gDeep} 100%)` }}>
          <button type="button" onClick={onClose} className="absolute top-4 right-4 bg-[rgba(255,255,255,0.15)] border-0 w-8 h-8 rounded-lg text-white cursor-pointer flex items-center justify-center">
            <X size={16}/>
          </button>
          <div className="text-[11px] text-a tracking-[2px] uppercase font-extrabold mb-1">Request leave</div>
          <div className="text-[20px] font-extrabold tracking-[-0.6px]">{ME.name}</div>
          <div className="text-[12.5px] opacity-90 mt-0.5">{ME.id} · {ME.role} · {ME.dept}</div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Leave type */}
          <div>
            <label className={labelCls}>Leave Type</label>
            <div className="grid grid-cols-4 gap-2">
              {KINDS.map(k => {
                const Icon = k.icon;
                const on = kind === k.id;
                const l = k.balanceCode ? LEAVES.find(x => x.code === k.balanceCode) : undefined;
                return (
                  <button key={k.id} type="button" onClick={() => setKind(k.id)} className={`py-3 px-2 rounded-[10px] cursor-pointer font-sans flex flex-col items-center gap-1.5 border ${(on ? "bg-g-mist border-g text-g-deep" : "bg-paper border-border text-ink-2 hover:bg-g-bg")}`}>
                    <Icon size={18}/>
                    <span className="text-[12.5px] font-bold">{k.label}</span>
                    <span className="text-[10.5px] text-ink-3 font-semibold">{l ? `${l.total - l.used} left` : " "}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className={labelCls}>From</label>
              <input type="date" value={from} onChange={e => { setFrom(e.target.value); if (e.target.value > to) setTo(e.target.value); }} className={inputCls}/>
            </div>
            <div>
              <label className={labelCls}>To</label>
              <input type="date" value={to} min={from} onChange={e => setTo(e.target.value)} className={inputCls}/>
            </div>
          </div>

          {singleDay && (
            <div>
              <label className={labelCls}>Duration</label>
              <div className="flex gap-1 p-1 rounded-[10px] bg-canvas w-fit">
                {([
                  { id: "full",        label: "Full day" },
                  { id: "first-half",  label: "First half" },
                  { id: "second-half", label: "Second half" },
                ] as const).map(s => (
                  <button key={s.id} type="button" onClick={() => setSession(s.id)} className={`py-1.5 px-3 rounded-lg border-0 cursor-pointer text-[12px] font-bold font-sans ${(session === s.id ? "bg-paper text-ink shadow-[0_1px_3px_rgba(0,0,0,0.12)]" : "bg-transparent text-ink-3")}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="py-2.5 px-3.5 rounded-[10px] bg-g-bg border border-border flex items-center justify-between text-[12.5px]">
            <span className="text-ink-2 font-semibold">Working days requested <span className="text-ink-3 font-normal">(weekends excluded)</span></span>
            <span className={`font-mono font-extrabold ${(balance !== null && days > balance ? "text-err" : "text-g-deep")}`}>
              {days} day{days === 1 ? "" : "s"}{balance !== null && ` · ${balance} left`}
            </span>
          </div>

          {/* Reason */}
          <div>
            <label className={labelCls}>Reason <span className="text-err">*</span></label>
            <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} placeholder={kind === "Other" ? "Describe why you need this leave" : "Brief reason for this request"} className={`${inputCls} resize-y`}/>
          </div>

          {isWfh && (
            <div>
              <label className={labelCls}>Working From</label>
              <input value={location} onChange={e => setLocation(e.target.value)} placeholder="City / address you'll be working from" className={inputCls}/>
            </div>
          )}

          <div>
            <label className={labelCls}>Approver</label>
            <select value={approver} onChange={e => setApprover(e.target.value)} className={inputCls}>
              {TEAM_MEMBERS.map(m => <option key={m.id} value={m.id}>{m.name} · {m.role}</option>)}
            </select>
          </div>

          {/* Supporting document */}
          {!isWfh && (
            <div>
              <label className={labelCls}>Supporting Document {kind === "Sick" && <span className="text-ink-3 font-normal">(medical certificate, if more than 2 days)</span>}</label>
              <input ref={fileInput} type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" onChange={e => { setAttachment(e.target.files?.[0] ?? null); e.target.value = ""; }}/>
              {attachment ? (
                <div className="flex items-center gap-2.5 py-2 px-3 rounded-[10px] border border-border">
                  <Paperclip size={14} color={T.ink3}/>
                  <span className="flex-1 min-w-0 truncate text-[12.5px] font-semibold text-ink">{attachment.name}</span>
                  <button type="button" onClick={() => setAttachment(null)} className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer flex items-center justify-center hover:bg-err-soft text-err" title="Remove"><Trash2 size={13}/></button>
                </div>
              ) : (
                <button type="button" onClick={() => fileInput.current?.click()} className="w-full py-2.75 rounded-[10px] border border-dashed border-border bg-paper hover:bg-g-bg hover:border-g cursor-pointer text-[12.5px] font-bold text-ink-2 font-sans flex items-center justify-center gap-2">
                  <Paperclip size={14}/>Attach PNG / JPG / PDF (optional)
                </button>
              )}
            </div>
          )}

          {error && <div className="text-[12px] font-semibold text-err">{error}</div>}

          <div className="flex justify-between items-center pt-1">
            <span className="text-[11px] text-ink-3 flex items-center gap-1.5"><Briefcase size={12}/>Sent to your approver for review</span>
            <div className="flex gap-2">
              <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
              <Btn variant="primary" type="submit" icon={Send}>Submit request</Btn>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
