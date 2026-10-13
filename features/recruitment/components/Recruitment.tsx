"use client";

import { useMemo, useState } from "react";
import { Download, ExternalLink, Eye, Filter, Link as LinkIcon, Mail, Plus, RefreshCw, Users } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Avatar, Btn, Card, PageHeader, Pill, StatKPI } from "@/shared/ui";
import { APPLICANTS, APPLICANT_SOURCES, OPEN_ROLES } from "../data";

/* ══════════════════════════════════════════════════════════════════════
   §08 · RECRUITMENT — Google Sheet applicants
   ══════════════════════════════════════════════════════════════════════ */

export const Recruitment = () => {
  const [stageFilter, setStageFilter] = useState("all");

  const filteredApplicants = useMemo(() => {
    if (stageFilter === "all") return APPLICANTS;
    if (stageFilter === "new") return APPLICANTS.filter(a => a.status === "new");
    if (stageFilter === "active") return APPLICANTS.filter(a => a.status === "active");
    if (stageFilter === "closed") return APPLICANTS.filter(a => a.status === "closed");
    return APPLICANTS.filter(a => a.stage === stageFilter);
  }, [stageFilter]);

  return (
    <div>
      <PageHeader
        title="Recruitment"
        sub={`${APPLICANTS.length} active applicants · ${OPEN_ROLES.length} open positions · live from careers page`}
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" icon={ExternalLink}>Open Google Sheet</Btn>
            <Btn variant="primary" icon={Plus}>New requisition</Btn>
          </div>
        }
      />

      {/* Google Sheet sync status */}
      <Card padding={0} className="mb-5 border border-[#D2E3FC]" style={{ background: `linear-gradient(90deg, #E8F0FE 0%, ${T.paper} 60%)` }}>
        <div className="py-3.5 px-5 flex items-center gap-3.5">
          {/* Google Sheets icon */}
          <div className="w-10.5 h-10.5 rounded-[10px] bg-[#0F9D58] text-white flex items-center justify-center font-extrabold text-[11px] tracking-[1px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="rgba(255,255,255,0.15)"/>
              <path d="M14 2v6h6" stroke="currentColor" fill="none" strokeWidth="1.5"/>
              <rect x="7" y="11" width="10" height="7" fill="currentColor" opacity="0.9"/>
              <line x1="7" y1="13.5" x2="17" y2="13.5" stroke="#0F9D58" strokeWidth="0.8"/>
              <line x1="7" y1="15.5" x2="17" y2="15.5" stroke="#0F9D58" strokeWidth="0.8"/>
              <line x1="12" y1="11" x2="12" y2="18" stroke="#0F9D58" strokeWidth="0.8"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="text-[13.5px] font-bold text-ink">Elements Energy · Careers Applications</div>
              <Pill tone="ok" size="sm" dot>Synced</Pill>
            </div>
            <div className="text-[11.5px] text-ink-3 mt-0.5 flex items-center gap-2.5">
              <LinkIcon size={10}/>docs.google.com/.../careers-applications
              <span>·</span>
              <span>Last sync: 2 min ago</span>
              <span>·</span>
              <span>Auto-syncs every 5 min from elementsenergy.in/careers</span>
            </div>
          </div>
          <Btn variant="ghost" size="sm" icon={RefreshCw}>Sync now</Btn>
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        <StatKPI label="Total applicants" value={APPLICANTS.length} trend={`+${APPLICANTS.filter(a => a.applied === "Today").length} today`} sub="146 this quarter"/>
        <StatKPI label="New (uncreened)" value={APPLICANTS.filter(a => a.status === "new").length} trend="awaiting screening" trendColor="amber"/>
        <StatKPI label="In interview" value={APPLICANTS.filter(a => ["Interview 1", "Interview 2", "Final"].includes(a.stage)).length} trend="active pipeline"/>
        <StatKPI label="Offers out" value={APPLICANTS.filter(a => a.stage === "Offer").length} trend="pending response"/>
      </div>

      {/* Open roles + sources */}
      <div className="grid grid-cols-[1.5fr_1fr] gap-4.5 mb-5">
        <Card padding={0}>
          <div className="py-3.5 px-5 border-b border-b-border">
            <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Open positions</div>
            <div className="text-[11.5px] text-ink-3 mt-0.5">{OPEN_ROLES.length} roles · {OPEN_ROLES.reduce((s, r) => s + r.applicants, 0)} candidates across all</div>
          </div>
          {OPEN_ROLES.map((o, i, arr) => (
            <div key={i} className={`grid grid-cols-[2fr_1fr_1fr_1fr] gap-3.5 items-center py-3.5 px-5 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
              <div>
                <div className="text-[13.5px] font-bold text-ink">{o.title}</div>
                <div className="text-[11px] text-ink-3 mt-0.75 tracking-[1.2px] uppercase font-bold">{o.dept}</div>
              </div>
              <div className="font-mono text-[12.5px] font-bold text-ink-2">{o.budget}</div>
              <div className="flex items-center gap-1.75">
                <Users size={13} color={T.gDeep}/>
                <span className="text-[15px] font-extrabold text-g-deep font-mono">{o.applicants}</span>
                <span className="text-[11px] text-ink-3">applicants</span>
              </div>
              <div className="flex gap-1.5 justify-end">
                <Btn variant="ghost" size="sm" icon={Eye}>View</Btn>
              </div>
            </div>
          ))}
        </Card>

        <Card padding={22}>
          <div className="text-[15px] font-bold text-ink tracking-[-0.3px] mb-3.5">Applicant sources</div>
          {APPLICANT_SOURCES.map((s, i, arr) => (
            <div key={i} className={`py-3 px-0 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1.75">
                  <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: s.color }}/>
                  <span className="text-[12.5px] font-bold text-ink">{s.source}</span>
                </div>
                <div className="flex gap-2.5">
                  <span className="text-[11px] text-ink-3 font-bold">{s.pct}%</span>
                  <span className="text-[12px] font-extrabold text-ink font-mono min-w-6 text-right">{s.count}</span>
                </div>
              </div>
              <div className="h-1.25 bg-canvas rounded-[99px]">
                <div className="h-full rounded-[99px]" style={{ width: `${s.pct * 1.4}%`, background: s.color }}/>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Applicants table — Google Sheet style */}
      <Card padding={0}>
        <div className="py-4 px-5 border-b border-b-border flex justify-between items-center">
          <div>
            <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Applicants · from careers page</div>
            <div className="text-[11.5px] text-ink-3 mt-0.5">Rows pulled from Google Sheet · each submission creates a row</div>
          </div>
          <div className="flex gap-2">
            <Btn variant="ghost" size="sm" icon={Download}>Export</Btn>
            <Btn variant="ghost" size="sm" icon={Filter}>Filter</Btn>
          </div>
        </div>

        {/* Stage filter chips */}
        <div className="flex gap-2 py-3 px-5 border-b border-b-border bg-canvas flex-wrap">
          {[
            { id: "all",         label: "All",         n: APPLICANTS.length },
            { id: "new",         label: "New",         n: APPLICANTS.filter(a => a.status === "new").length },
            { id: "Screening",   label: "Screening",   n: APPLICANTS.filter(a => a.stage === "Screening").length },
            { id: "Interview 1", label: "Interview 1", n: APPLICANTS.filter(a => a.stage === "Interview 1").length },
            { id: "Interview 2", label: "Interview 2", n: APPLICANTS.filter(a => a.stage === "Interview 2").length },
            { id: "Final",       label: "Final",       n: APPLICANTS.filter(a => a.stage === "Final").length },
            { id: "Offer",       label: "Offer",       n: APPLICANTS.filter(a => a.stage === "Offer").length },
            { id: "closed",      label: "Closed",      n: APPLICANTS.filter(a => a.status === "closed").length },
          ].map(f => (
            <button key={f.id} onClick={() => setStageFilter(f.id)} className={`py-1.5 px-2.75 rounded-lg cursor-pointer text-[11.5px] font-bold font-sans flex items-center gap-1.25 ${(stageFilter === f.id ? "bg-ink" : "bg-paper")} ${(stageFilter === f.id ? "text-white" : "text-ink-2")}`} style={{ border: `1px solid ${stageFilter === f.id ? T.ink : T.border}` }}>
              {f.label}
              <span className={`text-[10px] font-extrabold py-0 px-1.5 rounded-full ${(stageFilter === f.id ? "bg-g" : "bg-canvas")} ${(stageFilter === f.id ? "text-white" : "text-ink-3")}`}>{f.n}</span>
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full font-sans" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr className="bg-canvas">
                {["ID", "Applicant", "Role", "Source", "Experience", "Location", "Stage", "Applied", ""].map((h, i) => (
                  <th key={i} className={`py-2.75 px-3.5 text-[10.5px] font-extrabold tracking-[1.4px] uppercase text-ink-3 border-b border-b-border whitespace-nowrap ${(i === 8 ? "text-right" : "text-left")}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((a, i, arr) => (
                <tr key={a.id} className={`cursor-pointer hover:bg-g-mist ${(a.status === "new" ? "bg-[#FFFBEA]" : "bg-paper")} ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                  <td className="py-3 px-3.5">
                    <span className="font-mono text-[11px] text-ink-3 font-bold">{a.id}</span>
                  </td>
                  <td className="py-3 px-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={a.name} size={28} tone={a.status === "new" ? "amber" : "primary"}/>
                      <div>
                        <div className="text-[12.5px] font-bold text-ink flex items-center gap-1.25">
                          {a.name}
                          {a.status === "new" && <span className="bg-a text-white text-[8px] font-extrabold py-px px-1 rounded-[3px] tracking-[0.5px]">NEW</span>}
                        </div>
                        <div className="text-[10.5px] text-ink-3 mt-px">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3.5 text-[12px] text-ink-2">{a.role}</td>
                  <td className="py-3 px-3.5">
                    <Pill tone={a.source === "Website" ? "primary" : a.source === "LinkedIn" ? "info" : a.source === "Referral" ? "amber" : "neutral"} size="sm">{a.source}</Pill>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-[11.5px] text-ink-2">{a.exp}</td>
                  <td className="py-3 px-3.5 text-[11.5px] text-ink-2">{a.location}</td>
                  <td className="py-3 px-3.5">
                    <Pill tone={
                      a.stage === "Offer" ? "ok" :
                      a.stage === "Final" || a.stage === "Interview 2" ? "primary" :
                      a.stage === "Rejected" ? "err" : "neutral"
                    }>{a.stage}</Pill>
                  </td>
                  <td className="py-3 px-3.5 text-[11px] text-ink-3">{a.applied}</td>
                  <td className="py-3 px-3.5 text-right">
                    <div className="flex gap-1 justify-end">
                      <button className="w-6.5 h-6.5 border border-border bg-paper rounded-md cursor-pointer inline-flex items-center justify-center">
                        <Mail size={12} color={T.ink3}/>
                      </button>
                      <button className="w-6.5 h-6.5 border border-border bg-paper rounded-md cursor-pointer inline-flex items-center justify-center">
                        <Eye size={12} color={T.ink3}/>
                      </button>
                    </div>
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
