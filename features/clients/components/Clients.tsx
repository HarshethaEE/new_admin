"use client";

import { useMemo, useState } from "react";
import { Download, Key, MapPin, Plus, Search } from "lucide-react";
import { purpleTheme as T } from "@/shared/theme";
import { Avatar, Btn, Card, PageHeader, Pill } from "@/shared/ui";
import { AccessDrawer } from "./AccessDrawer";
import { CLIENTS } from "../data";
import { typeIcon } from "../lib/typeIcon";
import type { Client } from "../types";

/* ══════════════════════════════════════════════════════════════════════
   §02 · CLIENTS (with access management)
   ══════════════════════════════════════════════════════════════════════ */

export const Clients = () => {
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

  return (
    <div>
      <PageHeader
        title="Clients"
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
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, city, industry…" className="flex-1 border-0 outline-none bg-transparent font-sans text-[13.5px] text-ink"/>
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

      <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-4 mb-6">
        {filtered.map(c => {
          const Icon = typeIcon(c.type);
          return (
            <Card key={c.id} padding={0} className="overflow-hidden cursor-pointer"
              onClick={() => setSelected(c)}>
              <div className="px-5 pt-4.5 pb-3.5 border-b border-b-border">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10.5 h-10.5 rounded-[10px] flex items-center justify-center ${(c.status === "live" ? "bg-p-soft" : "bg-canvas")} ${(c.status === "live" ? "text-p-deep" : "text-ink-3")}`}>
                      <Icon size={20}/>
                    </div>
                    <div>
                      <div className="text-[14.5px] font-bold text-ink tracking-[-0.3px]">{c.name}</div>
                      <div className="text-[11px] text-ink-3 mt-0.5 flex items-center gap-1.5">
                        <MapPin size={10}/>{c.loc} · {c.type}
                      </div>
                    </div>
                  </div>
                  <Pill tone={c.status === "live" ? "ok" : c.status === "deploying" ? "blue" : c.status === "handover" ? "amber" : "neutral"} dot>
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </Pill>
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr] gap-2.5">
                  <div>
                    <div className="text-[9.5px] text-ink-3 tracking-[1.2px] uppercase font-extrabold">Devices</div>
                    <div className="text-[15px] font-extrabold text-ink mt-0.5 font-mono">{c.devices || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9.5px] text-ink-3 tracking-[1.2px] uppercase font-extrabold">Energy</div>
                    <div className="text-[15px] font-extrabold text-ink mt-0.5 font-mono">{c.energy ? c.energy : "—"}{c.energy> 0 && <span className="text-[10px] text-ink-3 ml-0.5">MWh</span>}</div>
                  </div>
                  <div>
                    <div className="text-[9.5px] text-ink-3 tracking-[1.2px] uppercase font-extrabold">Savings</div>
                    <div className={`text-[15px] font-extrabold mt-0.5 font-mono ${(c.savings ? "text-p-deep" : "text-mute")}`}>{c.savings ? `${c.savings}%` : "—"}</div>
                  </div>
                </div>
              </div>

              {/* Access control row */}
              <div className="py-3 px-5 bg-p-mist flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Key size={13} color={T.pDeep}/>
                  <div>
                    <div className="text-[11px] font-bold text-p-deep tracking-[0.3px]">DASHBOARD ACCESS</div>
                    <div className="text-[10.5px] text-ink-3 mt-px">{c.usersWithAccess} users · Last access 2h ago</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: Math.min(4, c.usersWithAccess) }).map((_, j) => (
                    <div key={j} className={`${(j === 0 ? "ml-0" : "-ml-1.5")}`}>
                      <Avatar name={`U${j}`} size={22} tone={j === 0 ? "primary" : j === 1 ? "amber" : "info"}/>
                    </div>
                  ))}
                  {c.usersWithAccess> 4 && (
                    <div className="w-5.5 h-5.5 rounded-full bg-ink text-white flex items-center justify-center text-[9px] font-extrabold -ml-1.5 border-2 border-paper">+{c.usersWithAccess - 4}</div>
                  )}
                  <button onClick={e => { e.stopPropagation(); setSelected(c); }} className="ml-2.5 py-1.25 px-2.5 bg-p text-white border-0 rounded-[7px] text-[11px] font-bold cursor-pointer font-sans">Manage</button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {selected && <AccessDrawer client={selected} onClose={() => setSelected(null)}/>}
    </div>
  );
};
