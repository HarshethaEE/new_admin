"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Plus, Search, X } from "lucide-react";
import { Btn, Card, PageHeader, Pill, StatKPI } from "@/shared/ui";
import {
  PIPELINE_ITEMS,
  PIPELINE_STAGES,
  type OpportunityStatus,
  type PipelineOpportunity,
  type PipelineStage,
} from "../data";

const POCS = ["Durai", "Bharathi", "Ramesh", "Suresh"];

const stageTone = (stage: PipelineStage) => {
  switch (stage) {
    case "New Lead":
      return "neutral";
    case "Qualified":
      return "blue";
    case "Site Audit":
      return "primary";
    case "Proposal Submitted":
      return "amber";
    case "Negotiation":
      return "purple";
    case "Won":
      return "ok";
  }
};

const statusTone = (status: OpportunityStatus) =>
  status === "Overdue" ? "err" : status === "Closed Won" ? "ok" : "blue";

const formatDate = (date: string) => {
  if (!date) return "—";
  const [year, month, day] = date.split("-").map(Number);
  const monthName = new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(year, month - 1, day));
  return `${String(day).padStart(2, "0")} ${monthName} ${year}`;
};

const fieldClassName =
  "h-10 w-full rounded-[10px] border border-border bg-paper px-3 text-[12px] text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15";

type EditableField = "remarks" | "description";

const EditableCell = ({
  value,
  label,
  className,
  onSave,
}: {
  value: string;
  label: string;
  className?: string;
  onSave: (value: string) => void;
}) => {
  const [draft, setDraft] = useState<string | null>(null);

  const commit = () => {
    if (draft === null) return;
    onSave(draft.trim() || "—");
    setDraft(null);
  };

  if (draft !== null) {
    return (
      <textarea
        autoFocus
        aria-label={label}
        className={`${fieldClassName} h-20 min-w-[180px] resize-y py-2 text-[11px]`}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Escape") setDraft(null);
          if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) commit();
        }}
      />
    );
  }

  return (
    <button
      type="button"
      title={`Click to edit ${label.toLowerCase()}`}
      className={`-mx-1.5 w-full cursor-text whitespace-pre-line rounded-md px-1.5 py-1 text-left hover:bg-canvas hover:ring-1 hover:ring-border ${className ?? ""}`}
      onClick={() => setDraft(value === "—" ? "" : value)}
    >
      {value}
    </button>
  );
};

export const Pipeline = () => {
  const [opportunities, setOpportunities] = useState(PIPELINE_ITEMS);
  const [stageFilter, setStageFilter] = useState("");
  const [pocFilter, setPocFilter] = useState("");
  const [query, setQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return opportunities.filter((opportunity) => {
      const matchesStage = !stageFilter || opportunity.stage === stageFilter;
      const matchesPoc = !pocFilter || opportunity.poc === pocFilter;
      const matchesQuery =
        !normalizedQuery ||
        Object.values(opportunity).some((value) => String(value).toLowerCase().includes(normalizedQuery));
      return matchesStage && matchesPoc && matchesQuery;
    });
  }, [opportunities, pocFilter, query, stageFilter]);

  const overdueCount = opportunities.filter((opportunity) => opportunity.status === "Overdue").length;
  const wonCount = opportunities.filter((opportunity) => opportunity.status === "Closed Won").length;
  const followUpCount = opportunities.filter((opportunity) => opportunity.status === "Upcoming").length;

  const addOpportunity = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const stage = String(formData.get("stage")) as PipelineStage;
    const nextDate = String(formData.get("next"));
    const newOpportunity: PipelineOpportunity = {
      id: Math.max(0, ...opportunities.map((opportunity) => opportunity.id)) + 1,
      client: String(formData.get("client")).trim(),
      project: String(formData.get("project")).trim(),
      person: String(formData.get("person")).trim() || "—",
      details: String(formData.get("details")).trim() || "—",
      stage,
      last: formatDate(String(formData.get("last"))),
      next: stage === "Won" ? "—" : formatDate(nextDate),
      status: stage === "Won" ? "Closed Won" : "Upcoming",
      poc: String(formData.get("poc")).trim(),
      remarks: String(formData.get("remarks")).trim() || "—",
      description: String(formData.get("description")).trim() || "—",
    };
    setOpportunities((current) => [newOpportunity, ...current]);
    setIsAdding(false);
  };

  const updateOpportunity = (id: number, field: EditableField, value: string) => {
    setOpportunities((current) =>
      current.map((opportunity) => (opportunity.id === id ? { ...opportunity, [field]: value } : opportunity)),
    );
  };

  return (
    <div>
      <PageHeader
        title="Sales Pipeline"
        sub={`${opportunities.length} opportunities · ${followUpCount} upcoming follow-ups`}
        action={<Btn variant="primary" icon={Plus} onClick={() => setIsAdding(true)}>Add Opportunity</Btn>}
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <StatKPI label="Total opportunities" value={opportunities.length} sub="Across all sales stages" />
        <StatKPI label="Overdue follow-ups" value={overdueCount} trend="Needs attention" trendColor="amber" />
        <StatKPI label="Closed won" value={wonCount} trend={`${followUpCount} upcoming follow-ups`} />
      </div>

      <Card padding={16} className="mb-4">
        <div className="grid gap-3 lg:grid-cols-[190px_170px_minmax(240px,1fr)]">
          <label className="grid gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[1px] text-ink-3">Stage</span>
            <select
              aria-label="Filter by stage"
              className={fieldClassName}
              value={stageFilter}
              onChange={(event) => setStageFilter(event.target.value)}
            >
              <option value="">All Stages</option>
              {PIPELINE_STAGES.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[1px] text-ink-3">Point of Contact</span>
            <select
              aria-label="Filter by point of contact"
              className={fieldClassName}
              value={pocFilter}
              onChange={(event) => setPocFilter(event.target.value)}
            >
              <option value="">All POC</option>
              {POCS.map((poc) => <option key={poc} value={poc}>{poc}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[1px] text-ink-3">Search opportunities</span>
            <span className="relative">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
              <input
                type="search"
                aria-label="Search opportunities"
                className={`${fieldClassName} pl-9`}
                placeholder="Search by client, project or contact..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </span>
          </label>
        </div>
        {(stageFilter || pocFilter || query) && (
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
            <span className="text-[11px] text-ink-3">{filtered.length} matching opportunities</span>
            <button
              type="button"
              className="text-[11px] font-bold text-accent-deep hover:underline"
              onClick={() => { setStageFilter(""); setPocFilter(""); setQuery(""); }}
            >
              Clear filters
            </button>
          </div>
        )}
      </Card>

      <Card padding={0} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1700px] border-collapse text-left text-[11px]">
            <thead>
              <tr className="border-b border-border bg-canvas text-[9px] uppercase tracking-[0.8px] text-ink-3">
                {["S.No", "Client / Company", "Project / Opportunity", "Contact Person", "Contact Details", "Stage", "Last Contact", "Next Follow-up", "Status", "Point of Contact", "Remarks", "Discussion Description"].map((heading) => (
                  <th key={heading} className="px-3 py-3.5 font-bold">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((opportunity, index) => (
                <tr key={opportunity.id} className="border-b border-border last:border-0 hover:bg-accent-mist/40">
                  <td className="px-3 py-3.5 text-ink-3">{index + 1}</td>
                  <td className="max-w-[190px] px-3 py-3.5 font-bold text-ink">{opportunity.client}</td>
                  <td className="max-w-[190px] px-3 py-3.5 text-ink-2">{opportunity.project}</td>
                  <td className="px-3 py-3.5 text-ink-2">{opportunity.person}</td>
                  <td className="whitespace-pre-line px-3 py-3.5 text-ink-3">{opportunity.details}</td>
                  <td className="px-3 py-3.5"><Pill tone={stageTone(opportunity.stage)}>{opportunity.stage}</Pill></td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-ink-3">{opportunity.last}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 font-semibold text-ink-2">{opportunity.next}</td>
                  <td className="px-3 py-3.5"><Pill tone={statusTone(opportunity.status)} dot>{opportunity.status}</Pill></td>
                  <td className="px-3 py-3.5 font-semibold text-ink-2">{opportunity.poc}</td>
                  <td className="max-w-[180px] px-3 py-3.5 text-ink-2">
                    <EditableCell
                      label="Remarks"
                      value={opportunity.remarks}
                      onSave={(value) => updateOpportunity(opportunity.id, "remarks", value)}
                    />
                  </td>
                  <td className="max-w-[260px] px-3 py-3.5 leading-5 text-ink-3">
                    <EditableCell
                      label="Discussion Description"
                      value={opportunity.description}
                      onSave={(value) => updateOpportunity(opportunity.id, "description", value)}
                    />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-4 py-12 text-center text-[13px] text-ink-3">
                    No opportunities match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border px-4 py-3 text-[11px] text-ink-3">
          Showing {filtered.length} of {opportunities.length} opportunities
        </div>
      </Card>

      {isAdding && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/40 p-4"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setIsAdding(false); }}
        >
          <Card className="my-auto w-full max-w-2xl" padding={0} role="dialog" aria-modal="true" aria-labelledby="add-opportunity-title">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 id="add-opportunity-title" className="m-0 text-[18px] font-extrabold text-ink">Add Opportunity</h2>
                <p className="mb-0 mt-1 text-[12px] text-ink-3">Add a prospect to the sales pipeline.</p>
              </div>
              <button type="button" aria-label="Close dialog" className="rounded-lg p-2 text-ink-3 hover:bg-canvas" onClick={() => setIsAdding(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={addOpportunity}>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <label className="grid gap-1.5 text-[11px] font-semibold text-ink-2">Client / Company<input className={fieldClassName} name="client" required /></label>
                <label className="grid gap-1.5 text-[11px] font-semibold text-ink-2">Project / Opportunity<input className={fieldClassName} name="project" required /></label>
                <label className="grid gap-1.5 text-[11px] font-semibold text-ink-2">Contact Person<input className={fieldClassName} name="person" /></label>
                <label className="grid gap-1.5 text-[11px] font-semibold text-ink-2">Contact Details<input className={fieldClassName} name="details" placeholder="Phone / email" /></label>
                <label className="grid gap-1.5 text-[11px] font-semibold text-ink-2">Stage<select className={fieldClassName} name="stage" defaultValue="New Lead">{PIPELINE_STAGES.map((stage) => <option key={stage}>{stage}</option>)}</select></label>
                <label className="grid gap-1.5 text-[11px] font-semibold text-ink-2">Point of Contact<input className={fieldClassName} name="poc" required /></label>
                <label className="grid gap-1.5 text-[11px] font-semibold text-ink-2">Last Contact<input className={fieldClassName} name="last" type="date" /></label>
                <label className="grid gap-1.5 text-[11px] font-semibold text-ink-2">Next Follow-up<input className={fieldClassName} name="next" type="date" /></label>
                <label className="grid gap-1.5 text-[11px] font-semibold text-ink-2 sm:col-span-2">Remarks<input className={fieldClassName} name="remarks" /></label>
                <label className="grid gap-1.5 text-[11px] font-semibold text-ink-2 sm:col-span-2">Discussion Description<textarea className={`${fieldClassName} h-24 resize-y py-2.5`} name="description" placeholder="Record the discussion, customer feedback and agreed next steps." /></label>
              </div>
              <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
                <Btn variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Btn>
                <Btn variant="primary" icon={Plus} type="submit">Add Opportunity</Btn>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
