"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { ChevronDown, ChevronUp, Download, FileText, Image as ImageIcon, Loader2, Paperclip, Trash2 } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Btn, X } from "@/shared/ui";
import { ME } from "@/features/account";
import { buildVoucherPdf, type VoucherDetails } from "../lib/buildVoucherPdf";

const METHODS = ["Cash", "UPI", "Bank Transfer", "Cheque", "Card"];
const ACCEPT = ["image/png", "image/jpeg", "application/pdf"];
const MAX_FILES = 10;

const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const labelCls = "block text-[12px] font-bold text-ink-2 mb-1.5";
const inputCls = "w-full py-2.5 px-3 rounded-[10px] border border-border bg-paper text-[13px] text-ink font-sans placeholder:text-mute focus:outline-hidden focus:border-g";

export const GenerateVoucherModal = ({ nextNumber, onClose, onGenerated }: {
  nextNumber: number;
  onClose: () => void;
  onGenerated: (v: VoucherDetails) => void;
}) => {
  const [number, setNumber] = useState(String(nextNumber));
  const [date, setDate] = useState(toISO(new Date()));
  const [method, setMethod] = useState("Cash");
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const picked = Array.from(list);
    const valid = picked.filter(f => ACCEPT.includes(f.type));
    const room = MAX_FILES - files.length;
    setError(
      valid.length < picked.length ? "Only PNG, JPG and PDF files can be attached." :
      valid.length > room ? `You can attach up to ${MAX_FILES} files.` : ""
    );
    setFiles(prev => [...prev, ...valid.slice(0, room)]);
  };

  const move = (i: number, dir: -1 | 1) => setFiles(prev => {
    const next = [...prev];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    return next;
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const value = Number(amount);
    if (!number.trim()) return setError("Enter a voucher number.");
    if (!payee.trim()) return setError("Enter the payee name.");
    if (!value || value <= 0) return setError("Enter an amount greater than 0.");
    if (!files.length) return setError("Attach at least one payment proof.");

    const details: VoucherDetails = {
      number: number.trim(), date, method, payee: payee.trim(), amount: value,
      description: description.trim(), preparedBy: ME.name,
    };
    setBusy(true);
    setError("");
    try {
      const bytes = await buildVoucherPdf(details, files);
      const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = `Voucher-${details.number}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      onGenerated(details);
    } catch {
      setError("Couldn't build the PDF. One of the attachments may be damaged or password-protected.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(15,23,42,0.5)] flex items-center justify-center z-100 p-5" onClick={onClose}>
      <form onSubmit={submit} onClick={e => e.stopPropagation()} className="w-160 max-h-[90vh] overflow-y-auto bg-paper rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        {/* Header */}
        <div className="py-5 px-7 text-white rounded-[16px_16px_0_0] relative" style={{ background: `linear-gradient(135deg, ${T.gDark} 0%, ${T.gDeep} 100%)` }}>
          <button type="button" onClick={onClose} className="absolute top-4 right-4 bg-[rgba(255,255,255,0.15)] border-0 w-8 h-8 rounded-lg text-white cursor-pointer flex items-center justify-center">
            <X size={16}/>
          </button>
          <div className="text-[11px] text-a tracking-[2px] uppercase font-extrabold mb-1">Generate voucher</div>
          <div className="text-[20px] font-extrabold tracking-[-0.6px]">Payment voucher</div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3.5">
            <div>
              <label className={labelCls}>Voucher Number</label>
              <input value={number} onChange={e => setNumber(e.target.value)} className={inputCls}/>
            </div>
            <div>
              <label className={labelCls}>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputCls}/>
            </div>
            <div>
              <label className={labelCls}>Payment Method</label>
              <select value={method} onChange={e => setMethod(e.target.value)} className={inputCls}>
                {METHODS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-[2fr_1fr] gap-3.5">
            <div>
              <label className={labelCls}>Payee Name</label>
              <input value={payee} onChange={e => setPayee(e.target.value)} placeholder="Enter payee name" className={inputCls}/>
            </div>
            <div>
              <label className={labelCls}>Amount (₹)</label>
              <input type="number" min="0" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className={inputCls}/>
            </div>
          </div>

          <div>
            <label className={labelCls}>Description / Purpose</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Reason for this payment" className={`${inputCls} resize-y`}/>
          </div>

          <div>
            <label className={labelCls}>Payment Proof <span className="text-err">*</span></label>
            <input ref={fileInput} type="file" multiple accept=".png,.jpg,.jpeg,.pdf" className="hidden" onChange={e => { addFiles(e.target.files); e.target.value = ""; }}/>
            <button
              type="button"
              disabled={files.length >= MAX_FILES}
              onClick={() => fileInput.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
              className="w-full py-3 rounded-[10px] border border-dashed border-border bg-paper hover:bg-g-bg hover:border-g cursor-pointer text-[13px] font-bold text-ink font-sans flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Paperclip size={15}/>Attach PNG / JPG / PDF files ({files.length}/{MAX_FILES})
            </button>

            {files.length > 0 && (
              <div className="mt-2 border border-border rounded-[10px] overflow-hidden">
                {files.map((f, i) => (
                  <div key={`${f.name}-${i}`} className={`flex items-center gap-2.5 py-2 px-3 ${(i < files.length - 1 ? "border-b border-b-border" : "")}`}>
                    <span className="font-mono text-[11px] text-ink-3 font-bold w-5">{i + 1}.</span>
                    <div className="w-7 h-7 rounded-[7px] bg-g-soft text-g-deep flex items-center justify-center shrink-0">
                      {f.type === "application/pdf" ? <FileText size={13}/> : <ImageIcon size={13}/>}
                    </div>
                    <span className="flex-1 min-w-0 truncate text-[12.5px] text-ink font-semibold">{f.name}</span>
                    <span className="text-[11px] text-ink-3 font-mono">{(f.size / 1024).toFixed(0)} KB</span>
                    <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer flex items-center justify-center hover:bg-canvas disabled:opacity-30 disabled:cursor-default" title="Move up"><ChevronUp size={14}/></button>
                    <button type="button" disabled={i === files.length - 1} onClick={() => move(i, 1)} className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer flex items-center justify-center hover:bg-canvas disabled:opacity-30 disabled:cursor-default" title="Move down"><ChevronDown size={14}/></button>
                    <button type="button" onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer flex items-center justify-center hover:bg-err-soft text-err" title="Remove"><Trash2 size={13}/></button>
                  </div>
                ))}
              </div>
            )}

            <div className="text-[11px] text-ink-3 mt-1.5 leading-normal">
              The voucher is always page 1. Attachments follow in the order shown — images become one page each, and a PDF keeps all of its own pages. Files are not stored, only used to build this PDF.
            </div>
          </div>

          {error && <div className="text-[12px] font-semibold text-err">{error}</div>}

          <div className="flex justify-end gap-2 pt-1">
            <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
            <Btn variant="primary" type="submit" icon={busy ? Loader2 : Download} disabled={busy}>
              {busy ? "Generating…" : "Generate & Download Voucher"}
            </Btn>
          </div>
        </div>
      </form>
    </div>
  );
};
