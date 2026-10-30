"use client";

import { useState, type ReactNode } from "react";
import { ProjectTracker } from "@/features/clients";
import { PageHeader, Card, Pill, StatKPI } from "@/shared/ui";
import { PROJECT_TRACKER } from "../data/tracker";

const TABS = [
  "Project Tracker",
  "Timeline",
  "Tasks",
  "Team",
] as const;

type TrackerTab = (typeof TABS)[number];
type Tone = "amber" | "blue" | "err" | "green" | "neutral" | "ok" | "primary";

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const statusTone = (status: string): Tone => {
  if (status === "Completed" || status === "Paid" || status === "Closed") return "ok";
  if (status === "In Progress" || status === "Scheduled") return "blue";
  if (status === "Open" || status === "Pending") return "amber";
  return "neutral";
};

const ProgressBar = ({ value }: { value: number }) => (
  <div className="h-2 overflow-hidden rounded-full bg-accent-mist">
    <div className="h-full rounded-full bg-accent" style={{ width: `${value}%` }} />
  </div>
);

const Table = ({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[680px] border-collapse text-left text-[12px]">
      <thead>
        <tr className="border-b border-border bg-canvas text-[10px] uppercase tracking-[1px] text-ink-3">
          {headers.map((header) => (
            <th key={header} className="px-4 py-3 font-bold">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-border last:border-0">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-4 py-3.5 align-top text-ink-2">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SectionTitle = ({ children, detail }: { children: ReactNode; detail?: ReactNode }) => (
  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
    <h2 className="m-0 text-[16px] font-extrabold tracking-[-0.3px] text-ink">{children}</h2>
    {detail && <span className="text-[12px] text-ink-3">{detail}</span>}
  </div>
);

const phaseNames = ["Planning", "Procurement", "Implementation", "Testing", "Handover"] as const;
const phaseStats = phaseNames.map((name) => {
  const tasks = PROJECT_TRACKER.tasks.filter((task) => task.phase === name);
  return {
    name,
    count: tasks.length,
    progress: tasks.length
      ? Math.round(tasks.reduce((total, task) => total + task.progress, 0) / tasks.length)
      : 0,
  };
});

const lifecycleSteps = [
  "Lead & Requirement",
  "Survey & Proposal",
  "Approval & Procurement",
  "Implementation",
  "Testing & Commissioning",
  "Handover & Support",
];

const timelineStart = new Date("2026-08-01T00:00:00");
const timelineEnd = new Date("2026-12-01T00:00:00");
const timelineDuration = timelineEnd.getTime() - timelineStart.getTime();
const timelinePosition = (date: string) => {
  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00`) : new Date(date);
  return Math.max(0, Math.min(100, ((parsedDate.getTime() - timelineStart.getTime()) / timelineDuration) * 100));
};

const Overview = () => {
  const openTasks = PROJECT_TRACKER.tasks.filter((task) => task.status !== "Completed");
  const openRisks = PROJECT_TRACKER.risks.filter((risk) => risk.status !== "Closed");
  const nextMilestones = PROJECT_TRACKER.milestones.filter((milestone) => milestone.status !== "Completed");

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
      <div className="grid content-start gap-4">
        <Card>
          <SectionTitle detail="Delivery summary">Project Summary</SectionTitle>
          <p className="m-0 text-[13px] leading-6 text-ink-2">{PROJECT_TRACKER.project.summary}</p>
          <div className="mt-5 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[1px] text-ink-3">Client</div>
              <div className="text-[13px] font-bold text-ink">{PROJECT_TRACKER.project.client}</div>
            </div>
            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[1px] text-ink-3">Project Manager</div>
              <div className="text-[13px] font-bold text-ink">{PROJECT_TRACKER.project.manager}</div>
            </div>
            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[1px] text-ink-3">Project Type</div>
              <div className="text-[13px] font-bold text-ink">{PROJECT_TRACKER.project.type}</div>
            </div>
            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[1px] text-ink-3">Target Date</div>
              <div className="text-[13px] font-bold text-ink">{PROJECT_TRACKER.project.target}</div>
            </div>
          </div>
        </Card>

        <Card padding={0}>
          <div className="p-5 pb-0">
            <SectionTitle detail={`${openTasks.length} still open`}>Priority Tasks</SectionTitle>
          </div>
          <Table
            headers={["Task", "Phase", "Assignee", "Due", "Progress"]}
            rows={openTasks.slice(0, 5).map((task) => [
              <div key="name">
                <div className="font-bold text-ink">{task.name}</div>
                <div className="mt-1 text-[11px] text-ink-3">{task.notes}</div>
              </div>,
              task.phase,
              task.assignee,
              task.due,
              <div key="progress" className="flex min-w-24 items-center gap-2">
                <ProgressBar value={task.progress} />
                <span className="font-mono text-[11px] font-bold">{task.progress}%</span>
              </div>,
            ])}
          />
        </Card>
      </div>

      <div className="grid content-start gap-4">
        <Card>
          <SectionTitle>Delivery by Phase</SectionTitle>
          <div className="grid gap-4">
            {phaseStats.map((phase) => (
              <div key={phase.name}>
                <div className="mb-2 flex justify-between text-[12px]">
                  <span className="font-bold text-ink">{phase.name}</span>
                  <span className="text-ink-3">{phase.progress}% · {phase.count} tasks</span>
                </div>
                <ProgressBar value={phase.progress} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle detail="Upcoming checkpoints">Milestones</SectionTitle>
          <div className="grid gap-3">
            {nextMilestones.slice(0, 3).map((milestone) => (
              <div key={milestone.id} className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                <div>
                  <div className="text-[12px] font-bold text-ink">{milestone.name}</div>
                  <div className="mt-1 text-[11px] text-ink-3">{milestone.planned} · {milestone.owner}</div>
                </div>
                <Pill tone={statusTone(milestone.status)}>{milestone.status}</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle detail={`${openRisks.length} need follow-up`}>Open Risks & Issues</SectionTitle>
          <div className="grid gap-3">
            {openRisks.map((risk) => (
              <div key={risk.title} className="border-b border-border pb-3 last:border-0 last:pb-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone={risk.impact === "High" ? "err" : "amber"}>{risk.impact} impact</Pill>
                  <span className="text-[12px] font-bold text-ink">{risk.title}</span>
                </div>
                <div className="mt-1.5 text-[11px] text-ink-3">Owner: {risk.owner} · Target: {risk.target}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle>Recent Activity</SectionTitle>
          <div className="grid gap-3">
            {PROJECT_TRACKER.activities.map((activity) => (
              <div key={activity.text} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
                <div>
                  <div className="text-[12px] font-semibold text-ink-2">{activity.text}</div>
                  <div className="mt-1 text-[11px] text-ink-3">{activity.date} · {activity.owner}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const TabContent = ({ tab }: { tab: TrackerTab }) => {
  switch (tab) {
    case "Project Tracker":
      return <ProjectTracker />;
    case "Timeline":
      return (
        <div className="grid gap-4">
          <Card>
            <SectionTitle detail="6 stages">Project Lifecycle</SectionTitle>
            <div className="overflow-x-auto pt-3">
              <div className="grid min-w-[780px] grid-cols-6">
                {lifecycleSteps.map((step, index) => {
                  const milestone = PROJECT_TRACKER.milestones[index];
                  const completed = milestone.status === "Completed";
                  const active = milestone.status === "In Progress";
                  return (
                    <div key={step} className="relative grid content-start justify-items-center gap-2 border-t-2 border-border px-2 pt-4 text-center first:border-transparent">
                      <span className={`absolute -top-[9px] left-1/2 flex size-[18px] -translate-x-1/2 items-center justify-center rounded-full border-2 text-[9px] font-bold ${completed ? "border-accent bg-accent text-white" : active ? "border-accent bg-canvas text-accent" : "border-border bg-canvas text-ink-3"}`}>
                        {completed ? "✓" : index + 1}
                      </span>
                      <div className="mt-1 min-h-8 text-[11px] font-bold leading-4 text-ink">{step}</div>
                      <div className="text-[10px] text-ink-3">{milestone.planned}</div>
                      <Pill tone={statusTone(milestone.status)}>{milestone.status}</Pill>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <Card padding={0}>
            <div className="p-5 pb-0">
              <SectionTitle detail="Aug – Nov 2026">Project Timeline · Gantt Chart</SectionTitle>
            </div>
            <div className="overflow-x-auto p-5 pt-2">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-[220px_minmax(0,1fr)] border-b border-border pb-2">
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-ink-3">Project Phase / Task</div>
                  <div className="grid grid-cols-4 text-center text-[10px] font-bold uppercase tracking-[1px] text-ink-3">
                    {["Aug 2026", "Sep 2026", "Oct 2026", "Nov 2026"].map((month) => <div key={month}>{month}</div>)}
                  </div>
                </div>
                {phaseStats.map((phase) => {
                  const tasks = PROJECT_TRACKER.tasks.filter((task) => task.phase === phase.name);
                  if (tasks.length === 0) return null;
                  return (
                    <div key={phase.name}>
                      <div className="grid min-h-9 grid-cols-[220px_minmax(0,1fr)] items-center border-b border-border bg-canvas px-2">
                        <div className="text-[11px] font-extrabold text-ink">{phase.name}<span className="ml-2 font-mono text-[10px] font-semibold text-ink-3">{phase.progress}%</span></div>
                        <div className="px-1"><ProgressBar value={phase.progress} /></div>
                      </div>
                      {tasks.map((task) => {
                        const start = timelinePosition(task.start);
                        const end = timelinePosition(task.due);
                        const width = Math.max(end - start, 1.8);
                        return (
                          <div key={task.id} className="grid min-h-10 grid-cols-[220px_minmax(0,1fr)] items-center border-b border-border last:border-b-0">
                            <div className="truncate pr-3 text-[11px] text-ink-2" title={task.name}>↳ {task.name}</div>
                            <div className="relative h-9">
                              <div className="pointer-events-none absolute inset-0 grid grid-cols-4">
                                {[0, 1, 2, 3].map((month) => <div key={month} className="border-l border-border/70 last:border-r" />)}
                              </div>
                              <div className="absolute top-2.5 h-4 overflow-hidden rounded-sm bg-accent-mist" style={{ left: `${start}%`, width: `${width}%` }} title={`${task.start} to ${task.due}`}>
                                <div className="h-full bg-accent" style={{ width: `${task.progress}%` }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      );
    case "Tasks":
      return (
        <Card padding={0}>
          <div className="p-5 pb-0"><SectionTitle detail={`${PROJECT_TRACKER.tasks.length} tasks`}>Project Tasks</SectionTitle></div>
          <Table
            headers={["Task", "Phase", "Assignee", "Due Date", "Progress", "Status", "Priority"]}
            rows={PROJECT_TRACKER.tasks.map((task) => [
              <div key="name"><div className="font-bold text-ink">{task.name}</div><div className="mt-1 text-[11px] text-ink-3">{task.notes}</div></div>,
              task.phase,
              task.assignee,
              task.due,
              <div key="progress" className="flex min-w-24 items-center gap-2"><ProgressBar value={task.progress} /><span className="font-mono text-[11px] font-bold">{task.progress}%</span></div>,
              <Pill key="status" tone={statusTone(task.status)}>{task.status}</Pill>,
              <Pill key="priority" tone={task.priority === "High" ? "amber" : "neutral"}>{task.priority}</Pill>,
            ])}
          />
        </Card>
      );
    case "Team":
      return <Card padding={0}><div className="p-5 pb-0"><SectionTitle detail={`${PROJECT_TRACKER.team.length} members`}>Project Team</SectionTitle></div>
        <Table headers={["Name", "Role", "Department", "Email"]} rows={PROJECT_TRACKER.team.map((member) => [
          <span key="name" className="font-bold text-ink">{member.name}</span>, member.role, member.department, member.email,
        ])} />
      </Card>;
  }
};

export const ClientProjects = () => {
  const [activeTab, setActiveTab] = useState<TrackerTab>("Project Tracker");

  return (
    <div className="grid gap-5">
      <div className="flex gap-1 overflow-x-auto border-b border-border" role="tablist" aria-label="Project sections">
        {TABS.map((tab) => (
          <button
            key={tab}
            id={`project-tab-${TABS.indexOf(tab)}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 border-b-2 px-3 py-3 text-[12px] font-semibold transition-colors ${
              activeTab === tab
                ? "border-accent text-accent-deep"
                : "border-transparent text-ink-3 hover:text-ink"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div role="tabpanel" aria-labelledby={`project-tab-${TABS.indexOf(activeTab)}`}>
        <TabContent tab={activeTab} />
      </div>
    </div>
  );
};
