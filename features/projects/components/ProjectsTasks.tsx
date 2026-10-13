"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, FolderKanban, GitBranch, Milestone, Plus, UserPlus } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";
import { Avatar, Btn, Card, PageHeader, Pill } from "@/shared/ui";
import { ME } from "@/features/account";
import { DEADLINE_ALERTS, PROJECTS, TASKS, TEAM_MEMBERS } from "../data/employee";

/* ══════════════════════════════════════════════════════════════════════
   §04 · PROJECTS & TASKS — projects, tasks, timeline, deadlines
   ══════════════════════════════════════════════════════════════════════ */

export const ProjectsTasks = () => {
  const [tab, setTab] = useState("overview");
  const [taskFilter, setTaskFilter] = useState("all");
  const [assignmentModal, setAssignmentModal] = useState(null);

  const filteredTasks = useMemo(() => {
    if (taskFilter === "all") return TASKS;
    if (taskFilter === "mine") return TASKS.filter(t => t.assignee === "me");
    if (taskFilter === "completed") return TASKS.filter(t => t.status === "completed");
    if (taskFilter === "on-hold") return TASKS.filter(t => t.status === "on-hold");
    if (taskFilter === "active") return TASKS.filter(t => t.status === "in-progress" || t.status === "todo");
    return TASKS;
  }, [taskFilter]);

  return (
    <div>
      <PageHeader
        title="Projects & Tasks"
        sub={`${PROJECTS.length} active projects · ${TASKS.filter(t => t.assignee === "me" && t.status !== "completed").length} of your tasks open`}
        action={
          <div className="flex gap-2">
            <Btn variant="ghost" icon={UserPlus}>Assign task</Btn>
            <Btn variant="primary" icon={Plus}>New task</Btn>
          </div>
        }
      />

      {/* Deadline alerts banner */}
      <Card padding={0} className="mb-5 overflow-hidden">
        <div className="py-3.5 px-5 border-b border-b-a-soft flex items-center gap-2.5" style={{ background: `linear-gradient(90deg, ${T.aSoft} 0%, ${T.aMist} 100%)` }}>
          <AlertTriangle size={16} color={T.aDark}/>
          <div className="text-[13.5px] font-bold text-a-dark flex-1">Upcoming deadlines · action needed</div>
          <Pill tone="err">{DEADLINE_ALERTS.filter(a => a.severity === "critical").length} critical</Pill>
          <Pill tone="amber">{DEADLINE_ALERTS.filter(a => a.severity === "warning").length} this week</Pill>
        </div>
        <div className="py-0 px-5">
          {DEADLINE_ALERTS.map((a, i, arr) => (
            <div key={a.id} className={`flex items-center gap-3 py-3 px-0 ${(i < arr.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
              <div className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center ${(a.severity === "critical" ? "bg-err-soft" : (a.severity === "warning" ? "bg-a-soft" : "bg-info-soft"))} ${(a.severity === "critical" ? "text-err" : (a.severity === "warning" ? "text-a-dark" : "text-b"))}`}>
                {a.type === "milestone" ? <Milestone size={14}/> : <CheckCircle2 size={14}/>}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-ink">{a.title}</div>
                <div className="text-[11px] text-ink-3 mt-0.5">{a.project} · <span className="font-mono">{a.id}</span></div>
              </div>
              <div className="text-right">
                <div className={`text-[12px] font-extrabold font-mono ${(a.severity === "critical" ? "text-err" : "text-ink")}`}>{a.due}</div>
                <div className="text-[10px] text-ink-3 mt-0.5 uppercase tracking-[0.5px] font-bold">{a.type === "milestone" ? "Milestone" : "Task"}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-5">
        {[
          { id: "overview", label: "Projects",  icon: FolderKanban, n: PROJECTS.length },
          { id: "tasks",    label: "Tasks",     icon: CheckCircle2, n: TASKS.length },
          { id: "timeline", label: "Timeline",  icon: GitBranch,    n: null },
        ].map(t => {
          const Icon = t.icon;
          const on = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={`py-2.5 px-4 rounded-[10px] cursor-pointer text-[13px] font-bold font-sans flex items-center gap-2 ${(on ? "bg-g" : "bg-paper")} ${(on ? "text-white" : "text-ink-2")}`} style={{ border: `1px solid ${on ? T.g : T.border}` }}>
              <Icon size={14}/>{t.label}
              {t.n !== null && (
                <span className={`text-[10.5px] font-extrabold py-px px-1.75 rounded-full ${(on ? "bg-[rgba(255,255,255,0.25)]" : "bg-canvas")} ${(on ? "text-white" : "text-ink-3")}`}>{t.n}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* PROJECTS TAB */}
      {tab === "overview" && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
          {PROJECTS.map(p => (
            <Card key={p.id} padding={0} className="overflow-hidden">
              <div className="pt-4.5 pr-5 pb-3.5 pl-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <span className="text-[10.5px] text-ink-3 font-mono font-bold tracking-[1px]">{p.id}</span>
                    <div className="text-[14.5px] font-bold text-ink tracking-[-0.3px] mt-0.75">{p.client}</div>
                    <div className="text-[11.5px] text-ink-3 mt-0.75">{p.type}</div>
                  </div>
                  <Pill tone={p.status === "at-risk" ? "amber" : "ok"} dot>
                    {p.status === "at-risk" ? "At risk" : "On track"}
                  </Pill>
                </div>

                <div className="flex justify-between items-baseline mt-3.5 mb-1.5">
                  <span className="text-[11px] text-ink-3 font-bold tracking-[1.2px] uppercase">Progress</span>
                  <span className="text-[20px] font-extrabold text-g-deep font-mono tracking-[-0.6px]">{p.progress}%</span>
                </div>
                <div className="h-2 bg-g-mist rounded-[99px] overflow-hidden">
                  <div className="h-full" style={{ width: `${p.progress}%`, background: p.status === "at-risk" ? `linear-gradient(90deg, ${T.a}, ${T.aDark})` : `linear-gradient(90deg, ${T.g}, ${T.gDeep})` }}/>
                </div>

                <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 mt-3.5">
                  <div>
                    <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">Tasks</div>
                    <div className="text-[14px] font-extrabold text-ink font-mono mt-0.75">{p.tasksDone}/{p.tasksTotal}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">Team</div>
                    <div className="text-[14px] font-extrabold text-ink font-mono mt-0.75">{p.team}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">Days left</div>
                    <div className={`text-[14px] font-extrabold font-mono mt-0.75 ${(p.daysLeft < 30 ? "text-a" : "text-ink")}`}>{p.daysLeft}</div>
                  </div>
                </div>
              </div>

              <div className="py-3 px-5 bg-g-bg border-t border-t-border">
                <div className="text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase mb-1">Next milestone</div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-bold text-ink">{p.nextMilestone}</span>
                  <Pill tone="amber" size="sm">{p.nextDeadline}</Pill>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TASKS TAB */}
      {tab === "tasks" && (
        <>
          <div className="flex gap-2 mb-4 flex-wrap">
            {[
              { id: "all",       label: "All",        n: TASKS.length },
              { id: "mine",      label: "Assigned to me", n: TASKS.filter(t => t.assignee === "me").length },
              { id: "active",    label: "Active",     n: TASKS.filter(t => t.status === "in-progress" || t.status === "todo").length },
              { id: "completed", label: "Completed",  n: TASKS.filter(t => t.status === "completed").length },
              { id: "on-hold",   label: "On hold",    n: TASKS.filter(t => t.status === "on-hold").length },
            ].map(f => (
              <button key={f.id} onClick={() => setTaskFilter(f.id)} className={`py-2 px-3.5 rounded-[10px] cursor-pointer text-[13px] font-bold font-sans flex items-center gap-1.75 ${(taskFilter === f.id ? "bg-ink" : "bg-paper")} ${(taskFilter === f.id ? "text-white" : "text-ink-2")}`} style={{ border: `1px solid ${taskFilter === f.id ? T.ink : T.border}` }}>
                {f.label}
                <span className={`text-[10.5px] font-extrabold py-px px-1.75 rounded-full ${(taskFilter === f.id ? "bg-g" : "bg-canvas")} ${(taskFilter === f.id ? "text-white" : "text-ink-3")}`}>{f.n}</span>
              </button>
            ))}
          </div>

          <Card padding={0}>
            {filteredTasks.map((t, i) => {
              const project = PROJECTS.find(p => p.id === t.project);
              const assignee = t.assignee === "me" ? ME : TEAM_MEMBERS.find(m => m.id === t.assignee);
              return (
                <div key={t.id} className={`grid grid-cols-[32px_100px_2fr_1.3fr_100px_100px_110px_70px] gap-3 items-center py-3.5 px-5 ${(i < filteredTasks.length - 1 ? "border-b border-b-border" : "border-b-0")} ${(t.status === "completed" ? "opacity-65" : "opacity-100")}`}>
                  <button className={`w-5 h-5 rounded-[5px] cursor-pointer flex items-center justify-center ${(t.status === "completed" ? "bg-g" : "bg-transparent")}`} style={{ border: `2px solid ${t.status === "completed" ? T.g : T.faint}` }}>
                    {t.status === "completed" && <CheckCircle2 size={12} color="#fff"/>}
                  </button>
                  <span className="font-mono text-[11.5px] text-ink-3 font-bold">{t.id}</span>
                  <div>
                    <div className={`text-[13px] font-bold text-ink ${(t.status === "completed" ? "line-through" : "no-underline")}`}>{t.title}</div>
                  </div>
                  <span className="text-[12.5px] text-ink-2">{project?.client}</span>
                  <div className="flex items-center gap-1.5">
                    <Avatar name={assignee?.name || "?"} size={24} tone={t.assignee === "me" ? "primary" : "amber"}/>
                    <span className="text-[11.5px] text-ink-2 font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                      {t.assignee === "me" ? "You" : assignee?.name.split(" ")[0]}
                    </span>
                  </div>
                  <Pill tone={t.pri === "high" ? "err" : t.pri === "med" ? "amber" : "neutral"}>{t.pri === "high" ? "High" : t.pri === "med" ? "Medium" : "Low"}</Pill>
                  <Pill tone={
                    t.status === "completed" ? "ok" :
                    t.status === "in-progress" ? "info" :
                    t.status === "on-hold" ? "amber" : "neutral"
                  } dot>{
                    t.status === "completed" ? "Done" :
                    t.status === "in-progress" ? "Active" :
                    t.status === "on-hold" ? "On hold" : "To do"
                  }</Pill>
                  <span className={`text-[12px] font-bold font-mono ${(t.due === "Today" ? "text-a" : "text-ink-3")}`}>{t.due}</span>
                </div>
              );
            })}
          </Card>
        </>
      )}

      {/* TIMELINE TAB */}
      {tab === "timeline" && (
        <Card padding={0} className="overflow-hidden">
          <div className="py-4 px-5.5 border-b border-b-border flex justify-between items-center">
            <div>
              <div className="text-[15px] font-bold text-ink tracking-[-0.3px]">Project timeline</div>
              <div className="text-[12px] text-ink-3 mt-0.5">Jul 2026 → Mar 2027 · milestones as diamonds</div>
            </div>
            <div className="flex gap-3.5 text-[11px] text-ink-3">
              <div className="flex items-center gap-1.25"><span className="w-2.5 h-2.5 bg-g rounded-xs"/>On track</div>
              <div className="flex items-center gap-1.25"><span className="w-2.5 h-2.5 bg-a rounded-xs"/>At risk</div>
            </div>
          </div>

          {/* Timeline header */}
          <div className="px-5.5 pt-3.5 pb-0 grid grid-cols-[280px_repeat(9,1fr)] gap-0.5 text-[10px] text-ink-3 font-extrabold tracking-[1.2px] uppercase">
            <div></div>
            {["Jul '26", "Aug '26", "Sep '26", "Oct '26", "Nov '26", "Dec '26", "Jan '27", "Feb '27", "Mar '27"].map(m => (
              <div key={m} className="text-center py-1.5 px-0 border-b border-dashed border-b-border relative">
                {m}
              </div>
            ))}
          </div>

          {/* Today marker */}
          <div className="py-0 px-5.5 relative">
            <div className="absolute left-[calc(280px_+_(3.3_/_9)_*_(100%_-_280px_-_44px))] top-0 bottom-2.5 w-0.5 bg-g z-1 pointer-events-none">
              <div className="absolute -top-1 -left-1.25 w-3 h-3 bg-g rounded-full border-2 border-white"/>
              <div className="absolute -top-5.5 -left-6 text-[9.5px] font-extrabold text-g tracking-[1px] uppercase bg-paper py-0.5 px-1.5 rounded-sm border border-g-soft">Today</div>
            </div>

            {PROJECTS.map((p, idx) => {
              const monthMap: Record<string, number> = { "Jul": 0, "Aug": 1, "Sep": 2, "Oct": 3, "Nov": 4, "Dec": 5, "Jan": 6, "Feb": 7, "Mar": 8 };
              const startMonth = monthMap[p.startDate.split(" ")[1]];
              const endMonth = monthMap[p.endDate.split(" ")[1]];
              const barColor = p.status === "at-risk" ? T.a : T.g;
              const barColorDeep = p.status === "at-risk" ? T.aDark : T.gDeep;
              return (
                <div key={p.id} className={`grid grid-cols-[280px_repeat(9,1fr)] gap-0.5 py-3.5 px-0 items-center ${(idx < PROJECTS.length - 1 ? "border-b border-b-border" : "border-b-0")}`}>
                  <div className="pr-2.5">
                    <div className="text-[13px] font-bold text-ink tracking-[-0.2px]">{p.client}</div>
                    <div className="text-[11px] text-ink-3 mt-0.5">{p.id} · {p.role}</div>
                  </div>
                  <div className="h-9 rounded-[7px] flex items-center py-0 px-3 relative text-white" style={{ gridColumn: `${startMonth + 2} / ${endMonth + 3}`, background: `linear-gradient(90deg, ${barColor}DD, ${barColorDeep})` }}>
                    <div className="absolute left-0 top-0 bottom-0 bg-[rgba(255,255,255,0.22)] rounded-[7px_0_0_7px]" style={{ width: `${p.progress}%` }}/>
                    <span className="text-[11.5px] font-extrabold relative z-1">{p.progress}% · {p.nextMilestone}</span>
                    {/* Milestone marker */}
                    <div className="absolute right-3 top-1/2 w-2.5 h-2.5 bg-a border-2 border-a-dark z-2" style={{ transform: "translate(0, -50%) rotate(45deg)" }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};
