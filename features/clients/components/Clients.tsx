"use client";

import { useMemo, useRef, useState } from "react";
import { Download, Key, MapPin, Plus, Search } from "lucide-react";
import { purpleTheme as T } from "@/shared/theme";
import { useFindInPage } from "@/shared/lib/useFindInPage";
import { Avatar, Btn, Card, PageHeader, Pill } from "@/shared/ui";
import { AccessDrawer } from "./AccessDrawer";
import { CLIENTS } from "../data";
import { typeIcon } from "../lib/typeIcon";
import type { Client } from "../types";

/* ══════════════════════════════════════════════════════════════════════
   §02 · CLIENTS (with access management)
   ══════════════════════════════════════════════════════════════════════ */

export const ProjectTracker = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Client | null>(null);

  const filtered = useMemo(() => {
    return CLIENTS.filter(c => {
      if (filter !== "all" && c.status !== filter) return false;
      if (search && !`${c.name} ${c.loc} ${c.type}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, search]);

  const resultsRef = useRef<HTMLDivElement>(null);
  const find = useFindInPage(resultsRef, search, [filtered]);

  return (
    <div>
      <PageHeader
        title="Project Tracker"
        sub={`${CLIENTS.length} total · ${CLIENTS.filter(c => c.status === "live").length} live · access management per site`}
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" icon={Download}>Export</Btn>
            <Btn variant="primary" icon={Plus}>Add client</Btn>
          </div>
        }
      />

      <div className="flex gap-2.5 mb-5 flex-wrap">
        <div className="flex items-center gap-2.25 bg-paper border border-border rounded-[10px] py-2.25 px-3.25 flex-1 min-w-70">
          <Search size={15} color={T.mute}/>
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={find.onKeyDown} placeholder="Search by name, city, industry…" className="flex-1 border-0 outline-none bg-transparent font-sans text-[13.5px] text-ink"/>
        </div>
        {[
          { id: "all",       label: "All",        n: CLIENTS.length },
          { id: "live",      label: "Live",       n: CLIENTS.filter(c => c.status === "live").length },
          { id: "deploying", label: "Deploying",  n: CLIENTS.filter(c => c.status === "deploying").length },
          { id: "handover",  label: "Handover",   n: CLIENTS.filter(c => c.status === "handover").length },
          { id: "proposal",  label: "Proposal",   n: CLIENTS.filter(c => c.status === "proposal").length },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`py-2.25 px-3.75 rounded-[10px] cursor-pointer text-[13px] font-bold font-sans flex items-center gap-1.75 ${(filter === f.id ? "bg-p" : "bg-paper")} ${(filter === f.id ? "text-white" : "text-ink-2")}`} style={{ border: `1px solid ${filter === f.id ? T.p : T.border}` }}>
            {f.label}
            <span className={`text-[10.5px] font-extrabold py-px px-1.75 rounded-full ${(filter === f.id ? "bg-p-deep" : "bg-canvas")} ${(filter === f.id ? "text-white" : "text-ink-3")}`}>{f.n}</span>
          </button>
        ))}
      </div>

      <div ref={resultsRef} className="mb-6">
        <Card padding={0} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left text-[12px]">
              <thead>
                <tr className="border-b border-border bg-canvas text-[10px] uppercase tracking-[0.8px] text-ink-3">
                  <th className="px-4 py-3.5 font-bold">Client</th>
                  <th className="px-4 py-3.5 font-bold">Status</th>
                  <th className="px-4 py-3.5 font-bold">Devices</th>
                  <th className="px-4 py-3.5 font-bold">Energy</th>
                  <th className="px-4 py-3.5 font-bold">Savings</th>
                  <th className="px-4 py-3.5 font-bold">Dashboard Access</th>
                  <th className="px-4 py-3.5 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => {
                  const Icon = typeIcon(c.type);
                  return (
                    <tr
                      key={c.id}
                      tabIndex={0}
                      aria-label={`View access details for ${c.name}`}
                      onClick={() => setSelected(c)}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelected(c);
                        }
                      }}
                      className="cursor-pointer border-b border-border last:border-0 hover:bg-accent-mist/40 focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`flex size-9 shrink-0 items-center justify-center rounded-[10px] ${c.status === "live" ? "bg-p-soft text-p-deep" : "bg-canvas text-ink-3"}`}>
                            <Icon size={18}/>
                          </div>
                          <div>
                            <div className="font-bold text-ink">{c.name}</div>
                            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-3">
                              <MapPin size={10}/>{c.loc} · {c.type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <Pill tone={c.status === "live" ? "ok" : c.status === "deploying" ? "blue" : c.status === "handover" ? "amber" : "neutral"} dot>
                          {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                        </Pill>
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-ink">{c.devices || "—"}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-ink">
                        {c.energy ? <>{c.energy}<span className="ml-1 font-sans text-[10px] font-medium text-ink-3">MWh</span></> : "—"}
                      </td>
                      <td className={`px-4 py-3.5 font-mono font-bold ${c.savings ? "text-p-deep" : "text-mute"}`}>
                        {c.savings ? `${c.savings}%` : "—"}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <Key size={13} color={T.pDeep}/>
                          <div className="flex items-center">
                            {Array.from({ length: Math.min(4, c.usersWithAccess) }).map((_, j) => (
                              <div key={j} className={j === 0 ? "ml-0" : "-ml-1.5"}>
                                <Avatar name={`U${j}`} size={22} tone={j === 0 ? "primary" : j === 1 ? "amber" : "info"}/>
                              </div>
                            ))}
                            {c.usersWithAccess > 4 && (
                              <div className="-ml-1.5 flex size-5.5 items-center justify-center rounded-full border-2 border-paper bg-ink text-[9px] font-extrabold text-white">
                                +{c.usersWithAccess - 4}
                              </div>
                            )}
                          </div>
                          <span className="whitespace-nowrap text-[11px] text-ink-3">{c.usersWithAccess} users</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <Btn
                          variant="soft"
                          size="sm"
                          onClick={e => { e.stopPropagation(); setSelected(c); }}
                        >
                          Manage
                        </Btn>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-[13px] text-ink-3">
                      No clients match your search and filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-4 py-3 text-[11px] text-ink-3">
            Showing {filtered.length} of {CLIENTS.length} clients
          </div>
        </Card>
      </div>

      {selected && <AccessDrawer client={selected} onClose={() => setSelected(null)}/>}
    </div>
  );
};
