"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { UserCircle2, Users } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Btn, X } from "@/shared/ui";
import { ME } from "@/features/account";
import { PROJECTS, TEAM_MEMBERS } from "../data/employee";

export type NewTask = {
  id: string; title: string; project: string; assignee: string;
  status: string; pri: string; due: string; dueFull: string;
  description?: string; remarks?: string; createdBy?: string;
};

const ASSIGNEES = [{ id: "me", name: `${ME.name} (You)` }, ...TEAM_MEMBERS.map(m => ({ id: m.id, name: m.name }))];

const PRIORITIES = [
  { value: "low",  label: "LOW" },
  { value: "med",  label: "MEDIUM" },
  { value: "high", label: "HIGH" },
];

const STATUSES = [
  { value: "todo",        label: "PENDING" },
  { value: "in-progress", label: "IN PROGRESS" },
  { value: "on-hold",     label: "ON HOLD" },
  { value: "completed",   label: "COMPLETED" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Turns a yyyy-mm-dd value into the short ("Today", "18 Oct") and full ("18 Oct 2026") labels the task table uses. */
const formatDue = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  const dueFull = `${d} ${MONTHS[m - 1]} ${y}`;
  const today = new Date();
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  if (iso === toISO(today)) return { due: "Today", dueFull };
  if (iso === toISO(tomorrow)) return { due: "Tomorrow", dueFull };
  return { due: `${String(d).padStart(2, "0")} ${MONTHS[m - 1]}`, dueFull };
};

const SIZES = {
  default: { width: "w-180", head: "py-5 px-7", heading: "text-[20px]", body: "p-7 gap-4", label: "text-[12px] mb-1.5", input: "py-2.25 px-3 text-[13px]", descRows: 3, remarkRows: 2 },
  compact: { width: "w-120", head: "py-3.5 px-5", heading: "text-[16px]", body: "p-5 gap-3", label: "text-[11.5px] mb-1",   input: "py-1.75 px-2.5 text-[12.5px]", descRows: 2, remarkRows: 1 },
};

export const AssignTaskModal = ({ nextId, onClose, onCreate, compact = false, defaultAssignee = "" }: {
  nextId: number;
  onClose: () => void;
  onCreate: (tasks: NewTask[]) => void;
  /** Smaller variant, e.g. when opened from a chat. */
  compact?: boolean;
  /** Assignee id to preselect (e.g. the person you're chatting with). */
  defaultAssignee?: string;
}) => {
  const sz = SIZES[compact ? "compact" : "default"];
  const labelCls = `block font-bold text-ink ${sz.label}`;
  const inputCls = `w-full rounded-lg border border-border bg-paper text-ink font-sans focus:outline-hidden focus:border-g ${sz.input}`;
  const [mode, setMode] = useState<"single" | "multiple">("single");
  const [assignee, setAssignee] = useState(defaultAssignee);
  const [assignees, setAssignees] = useState<string[]>([]);
  const [project, setProject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pri, setPri] = useState("med");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState(toISO(new Date()));
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const toggleAssignee = (id: string) =>
    setAssignees(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const selected = mode === "single" ? (assignee ? [assignee] : []) : assignees;
    if (!selected.length) return setError("Select at least one assignee.");
    if (!project) return setError("Select a client.");
    if (!title.trim()) return setError("Enter a task title.");
    if (!dueDate) return setError("Pick a due date.");

    const { due, dueFull } = formatDue(dueDate);
    onCreate(selected.map((a, i) => ({
      id: `T-${nextId + i}`,
      title: title.trim(), project, assignee: a, status, pri, due, dueFull,
      description: description.trim(), remarks: remarks.trim(), createdBy: ME.name,
    })));
  };

  return (
    <div className="fixed inset-0 bg-[rgba(15,23,42,0.5)] flex items-center justify-center z-100 p-5" onClick={onClose}>
      <form onSubmit={submit} onClick={e => e.stopPropagation()} className={`${sz.width} max-h-[90vh] overflow-y-auto bg-paper rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]`}>
        {/* Header */}
        <div className={`${sz.head} text-white rounded-[16px_16px_0_0] relative`} style={{ background: `linear-gradient(135deg, ${T.gDark} 0%, ${T.gDeep} 100%)` }}>
          <button type="button" onClick={onClose} className="absolute top-4 right-4 bg-[rgba(255,255,255,0.15)] border-0 w-8 h-8 rounded-lg text-white cursor-pointer flex items-center justify-center">
            <X size={16}/>
          </button>
          <div className="text-[11px] text-a tracking-[2px] uppercase font-extrabold mb-1">Assign task</div>
          <div className={`${sz.heading} font-extrabold tracking-[-0.6px]`}>Create a task for your team</div>
        </div>

        {/* Body */}
        <div className={`${sz.body} flex flex-col`}>
          <div>
            <label className={labelCls}>Created By</label>
            <input value={ME.name} disabled className={`${inputCls} bg-canvas text-ink-3 cursor-not-allowed`}/>
          </div>

          <div>
            <div className={`flex items-center gap-2 ${compact ? "mb-1" : "mb-1.5"}`}>
              <span className={`font-bold text-ink ${compact ? "text-[11.5px]" : "text-[12px]"}`}>Assigned To</span>
              <div className="flex gap-0.5 p-0.75 rounded-[10px] bg-canvas">
                {([
                  { id: "single",   label: "Single",   icon: UserCircle2 },
                  { id: "multiple", label: "Multiple", icon: Users },
                ] as const).map(m => {
                  const Icon = m.icon;
                  const on = mode === m.id;
                  return (
                    <button key={m.id} type="button" onClick={() => setMode(m.id)} className={`py-1.25 px-2.5 rounded-lg cursor-pointer text-[12px] font-bold font-sans flex items-center gap-1.5 border-0 ${(on ? "bg-paper text-ink shadow-[0_1px_3px_rgba(0,0,0,0.12)]" : "bg-transparent text-ink-3")}`}>
                      <Icon size={13}/>{m.label}
                    </button>
                  );
                })}
              </div>
            </div>
            {mode === "single" ? (
              <select value={assignee} onChange={e => setAssignee(e.target.value)} className={inputCls}>
                <option value="">Select user...</option>
                {ASSIGNEES.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            ) : (
              <div className="grid grid-cols-2 gap-1.5 p-2.5 rounded-lg border border-border">
                {ASSIGNEES.map(a => (
                  <label key={a.id} className="flex items-center gap-2 py-1 px-1.5 text-[13px] text-ink cursor-pointer">
                    <input type="checkbox" checked={assignees.includes(a.id)} onChange={() => toggleAssignee(a.id)} className="w-4 h-4 cursor-pointer" style={{ accentColor: T.g }}/>
                    {a.name}
                  </label>
                ))}
              </div>
            )}
            <div className="text-[11px] text-ink-3 mt-1">
              {mode === "single" ? "Assign this task to one teammate." : `Assign this task to several teammates · ${assignees.length} selected.`}
            </div>
          </div>

          <div>
            <label className={labelCls}>Client</label>
            <select value={project} onChange={e => setProject(e.target.value)} className={inputCls}>
              <option value="">Select client...</option>
              {PROJECTS.map(p => <option key={p.id} value={p.id}>{p.client} · {p.id}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className={inputCls}/>
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={sz.descRows} className={`${inputCls} resize-y`}/>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Priority</label>
              <select value={pri} onChange={e => setPri(e.target.value)} className={inputCls}>
                {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className={inputCls}>
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Due Date</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={inputCls}/>
          </div>

          <div>
            <label className={labelCls}>Remarks</label>
            <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={sz.remarkRows} className={`${inputCls} resize-y`}/>
          </div>

          {error && <div className="text-[12px] font-semibold text-err">{error}</div>}

          <div className="flex justify-end gap-2 pt-1">
            <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
            <Btn variant="primary" type="submit">Create Task</Btn>
          </div>
        </div>
      </form>
    </div>
  );
};
