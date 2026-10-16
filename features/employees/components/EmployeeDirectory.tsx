"use client";

import { useMemo, useRef, useState } from "react";
import { Download, MoreHorizontal, Search, UserPlus } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { useFindInPage } from "@/shared/lib/useFindInPage";
import { Avatar, Btn, Card, PageHeader, Pill } from "@/shared/ui";
import { EMPLOYEES, ORG } from "../data";

/* ══════════════════════════════════════════════════════════════════════
   §04 · EMPLOYEES (unchanged — directory with filters)
   ══════════════════════════════════════════════════════════════════════ */

export const EmployeeDirectory = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return EMPLOYEES.filter(e => {
      if (filter === "active"    && e.status !== "Active") return false;
      if (filter === "probation" && e.status !== "Probation") return false;
      if (filter === "leave"     && e.status !== "On Leave") return false;
      if (search && !`${e.name} ${e.id} ${e.role}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, search]);

  const resultsRef = useRef<HTMLTableSectionElement>(null);
  const find = useFindInPage(resultsRef, search, [filtered]);

  return (
    <div>
      <PageHeader
        title="Employees"
        sub={`${ORG.total} total · ${ORG.active} active · ${ORG.newThisMonth} joined this month`}
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" icon={Download}>Export CSV</Btn>
            <Btn variant="primary" icon={UserPlus}>Add Employee</Btn>
          </div>
        }
      />

      <div className="flex gap-2.5 mb-5 flex-wrap">
        <div className="flex items-center gap-2.25 bg-paper border border-border rounded-[10px] py-2.25 px-3.25 flex-1 min-w-70">
          <Search size={15} color={T.mute}/>
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={find.onKeyDown} placeholder="Search by name, ID, role…" className="flex-1 border-0 outline-none bg-transparent font-sans text-[13.5px] text-ink"/>
        </div>
        {[
          { id: "all",       label: "All",       n: EMPLOYEES.length },
          { id: "active",    label: "Active",    n: EMPLOYEES.filter(e => e.status === "Active").length },
          { id: "probation", label: "Probation", n: EMPLOYEES.filter(e => e.status === "Probation").length },
          { id: "leave",     label: "On Leave",  n: EMPLOYEES.filter(e => e.status === "On Leave").length },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`py-2.25 px-3.75 rounded-[10px] cursor-pointer text-[13px] font-bold font-sans flex items-center gap-1.75 ${(filter === f.id ? "bg-g" : "bg-paper")} ${(filter === f.id ? "text-white" : "text-ink-2")}`} style={{ border: `1px solid ${filter === f.id ? T.g : T.border}` }}>
            {f.label}
            <span className={`text-[10.5px] font-extrabold py-px px-1.75 rounded-full ${(filter === f.id ? "bg-g-deep" : "bg-canvas")} ${(filter === f.id ? "text-white" : "text-ink-3")}`}>{f.n}</span>
          </button>
        ))}
      </div>

      <Card padding={0}>
        <div className="overflow-x-auto">
          <table className="w-full font-sans" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr className="bg-canvas">
                {["ID", "Employee", "Department", "Type", "Performance", "Joined", "Status", ""].map((h, i) => (
                  <th key={i} className={`py-3.25 px-4 text-[10.5px] font-extrabold tracking-[1.4px] uppercase text-ink-3 border-b border-b-border whitespace-nowrap ${(i === 7 ? "text-right" : "text-left")}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody ref={resultsRef}>
              {filtered.map((e, i) => (
                <tr key={e.id} className={`bg-paper cursor-pointer hover:bg-g-mist ${(i < filtered.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[11.5px] text-ink-3 font-bold">{e.id}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={e.name} size={32}/>
                      <div>
                        <div className="text-[13.5px] font-bold text-ink">{e.name}</div>
                        <div className="text-[11px] text-ink-3 mt-px">{e.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[12.5px] text-ink-2">{e.dept}</td>
                  <td className="py-3.5 px-4">
                    <Pill tone={e.type === "Full-Time" ? "primary" : e.type === "Freelance" ? "amber" : "info"}>{e.type}</Pill>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-15 h-1.5 bg-canvas rounded-[99px] overflow-hidden">
                        <div className={`h-full ${(e.perf>= 85 ? "bg-g" : (e.perf>= 75 ? "bg-a" : "bg-err"))}`} style={{ width: `${e.perf}%` }}/>
                      </div>
                      <span className="text-[12px] font-bold text-ink font-mono">{e.perf}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11.5px] text-ink-2">{e.joined}</td>
                  <td className="py-3.5 px-4">
                    <Pill tone={e.status === "Active" ? "ok" : e.status === "Probation" ? "amber" : "info"} dot>{e.status}</Pill>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="w-6.5 h-6.5 border border-border bg-paper rounded-[7px] cursor-pointer inline-flex items-center justify-center">
                      <MoreHorizontal size={14} color={T.ink3}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
