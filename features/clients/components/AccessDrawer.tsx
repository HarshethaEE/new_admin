"use client";

import { MoreHorizontal, Plus, Share2 } from "lucide-react";
import { purpleTheme as T } from "@/shared/theme";
import { Avatar, Btn, Card, Pill, X } from "@/shared/ui";
import { CLIENT_ACCESS_USERS } from "../data";
import type { Client } from "../types";

export const AccessDrawer = ({ client, onClose }: { client: Client; onClose: () => void }) => {
  const users = CLIENT_ACCESS_USERS;
  return (
    <div className="fixed inset-0 bg-[rgba(15,23,42,0.5)] flex justify-end z-100" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="w-155 bg-canvas h-screen overflow-y-auto shadow-[-20px_0_40px_rgba(0,0,0,0.2)] font-sans">
        <div className="text-white py-5.5 px-6.5 relative" style={{ background: `linear-gradient(135deg, ${T.pDeep} 0%, ${T.p} 100%)` }}>
          <button onClick={onClose} className="absolute top-4 right-4 bg-[rgba(255,255,255,0.15)] border-0 w-8 h-8 rounded-lg text-white cursor-pointer flex items-center justify-center">
            <X size={16}/>
          </button>
          <div className="text-[11px] text-p-soft font-extrabold tracking-[2px] uppercase mb-1">Dashboard access control</div>
          <div className="text-[22px] font-extrabold tracking-[-0.5px] mb-0.5">{client.name}</div>
          <div className="text-[12.5px] opacity-90">{client.id} · {client.loc} · {users.length} users with access</div>

          <div className="flex gap-2 mt-3.5">
            <Btn variant="amber" size="sm" icon={Plus}>Invite user</Btn>
            <Btn variant="dark" size="sm" icon={Share2}>Copy link</Btn>
          </div>
        </div>

        <div className="p-6">
          <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.4px] uppercase mb-2.5">Access levels</div>
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-2.5 mb-5">
            {[
              { l: "Admin",  n: users.filter(u => u.level === "Admin").length, color: T.p, desc: "Full control, invite users" },
              { l: "Editor", n: users.filter(u => u.level === "Editor").length, color: T.a, desc: "Modify settings & reports" },
              { l: "Viewer", n: users.filter(u => u.level === "Viewer").length, color: T.b, desc: "Read-only dashboard access" },
            ].map((a, i) => (
              <Card key={i} padding={14}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: a.color }}/>
                    <span className="text-[11px] text-ink-2 font-bold">{a.l}</span>
                  </div>
                  <span className="text-[16px] font-extrabold text-ink font-mono">{a.n}</span>
                </div>
                <div className="text-[10px] text-ink-3 mt-1">{a.desc}</div>
              </Card>
            ))}
          </div>

          <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.4px] uppercase mb-2.5">Users with dashboard access</div>
          <Card padding={0}>
            {users.map((u, i, arr) => (
              <div key={i} className={`flex items-center gap-3 py-3.5 px-4 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                <Avatar name={u.name} size={38}/>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-ink">{u.name}</div>
                  <div className="text-[11px] text-ink-3 mt-0.5">{u.email}</div>
                  <div className="flex gap-1.5 mt-1 items-center">
                    <span className="text-[10.5px] text-ink-3 font-semibold">{u.role}</span>
                    <span className="text-[10.5px] text-mute">·</span>
                    <span className="text-[10.5px] text-ink-3">Active {u.lastActive}</span>
                  </div>
                </div>
                <Pill tone={u.level === "Admin" ? "purple" : u.level === "Editor" ? "amber" : "blue"} dot>{u.level}</Pill>
                {u.status === "limited" && <Pill tone="neutral" size="sm">Limited</Pill>}
                <button className="w-7.5 h-7.5 border border-border bg-paper rounded-[7px] cursor-pointer flex items-center justify-center">
                  <MoreHorizontal size={14} color={T.ink3}/>
                </button>
              </div>
            ))}
          </Card>

          <div className="text-[11px] text-ink-3 font-extrabold tracking-[1.4px] uppercase mb-2.5 mt-6">Dashboard modules this client sees</div>
          <Card padding={0}>
            {[
              { module: "Live energy monitoring",       enabled: true,  users: "All" },
              { module: "Device health",                 enabled: true,  users: "All" },
              { module: "Monthly reports",               enabled: true,  users: "Admin, Editor" },
              { module: "AI insights & recommendations", enabled: true,  users: "Admin only" },
              { module: "Billing & invoices",             enabled: false, users: "—" },
              { module: "Raw data export (CSV/API)",      enabled: true,  users: "Admin only" },
            ].map((m, i, arr) => (
              <div key={i} className={`grid grid-cols-[1.8fr_1fr_60px] gap-3 items-center py-3 px-4 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                <div className="text-[13px] font-semibold text-ink">{m.module}</div>
                <div className="text-[11.5px] text-ink-3">{m.users}</div>
                <div className="flex justify-end">
                  <div className={`w-9 h-5 rounded-[99px] relative [transition:all_0.15s_ease] cursor-pointer ${(m.enabled ? "bg-p" : "bg-faint")}`}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white [transition:all_0.15s_ease] ${(m.enabled ? "left-4.5" : "left-0.5")}`}/>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};
