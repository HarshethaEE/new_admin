/* Projects */
export const PROJECTS = [
  {
    id: "PRJ-012", name: "Metalware India · Delhi deployment",
    client: "Metalware India", type: "Industrial · EMS + solar",
    progress: 68, status: "on-track", role: "Design lead", team: 7,
    startDate: "15 Jul 2026", endDate: "22 Nov 2026",
    budget: 48, spent: 32,
    tasksTotal: 48, tasksDone: 32,
    nextDeadline: "18 Oct", nextMilestone: "Commissioning",
    daysLeft: 47,
  },
  {
    id: "PRJ-018", name: "Infosys EC-ity · Phase 2",
    client: "Infosys Electronic City", type: "IT Campus · Scope-2 reduction",
    progress: 42, status: "at-risk", role: "Contributor", team: 11,
    startDate: "02 Sep 2026", endDate: "28 Feb 2027",
    budget: 180, spent: 72,
    tasksTotal: 36, tasksDone: 15,
    nextDeadline: "22 Oct", nextMilestone: "Device shortlisting",
    daysLeft: 145,
  },
  {
    id: "PRJ-021", name: "ITC Grand Chola · M&V audit",
    client: "ITC Grand Chola", type: "Hospitality · M&V",
    progress: 91, status: "on-track", role: "Reviewer", team: 4,
    startDate: "10 Aug 2026", endDate: "20 Oct 2026",
    budget: 36, spent: 33,
    tasksTotal: 24, tasksDone: 22,
    nextDeadline: "15 Oct", nextMilestone: "Client sign-off",
    daysLeft: 14,
  },
  {
    id: "PRJ-024", name: "UPL Chemicals · PF study",
    client: "UPL Chemicals", type: "Chemicals · reactive power",
    progress: 28, status: "on-track", role: "Lead", team: 3,
    startDate: "20 Sep 2026", endDate: "15 Dec 2026",
    budget: 24, spent: 7,
    tasksTotal: 18, tasksDone: 5,
    nextDeadline: "22 Oct", nextMilestone: "Capacitor sizing",
    daysLeft: 70,
  },
];

export const TEAM_MEMBERS = [
  { id: "u1", name: "Priya Krishnan",   role: "PM" },
  { id: "u2", name: "Rohan Iyer",       role: "VP Eng" },
  { id: "u3", name: "Sneha Reddy",      role: "Elec Eng" },
  { id: "u4", name: "Nikhil Bhardwaj",  role: "Solar Eng" },
  { id: "u5", name: "Karthik Subramani",role: "PE Head" },
  { id: "u6", name: "Anjali Pillai",    role: "HRBP" },
];

export const TASKS = [
  { id: "T-412", title: "Finalize inverter string sizing · Metalware",      project: "PRJ-012", assignee: "me",   status: "in-progress", pri: "high", due: "Today",     dueFull: "6 Oct 2026" },
  { id: "T-411", title: "Review HVAC retrofit BOQ · Infosys",                project: "PRJ-018", assignee: "me",   status: "in-progress", pri: "high", due: "Today",     dueFull: "6 Oct 2026" },
  { id: "T-410", title: "Site visit prep · UPL harmonic measurement",        project: "PRJ-024", assignee: "me",   status: "todo",        pri: "med",  due: "Tomorrow",  dueFull: "7 Oct 2026" },
  { id: "T-408", title: "Draft M&V report Section 4 · ITC Chola",            project: "PRJ-021", assignee: "me",   status: "in-progress", pri: "med",  due: "09 Oct",    dueFull: "9 Oct 2026" },
  { id: "T-406", title: "Capacitor sizing calculation · UPL",                 project: "PRJ-024", assignee: "u3",   status: "todo",        pri: "med",  due: "22 Oct",    dueFull: "22 Oct 2026" },
  { id: "T-405", title: "Vendor quotes for Phase 1 inverters",                 project: "PRJ-018", assignee: "u1",   status: "on-hold",     pri: "low",  due: "10 Nov",    dueFull: "10 Nov 2026" },
  { id: "T-402", title: "Site inspection report · bay 4 walkthrough",         project: "PRJ-012", assignee: "me",   status: "completed",   pri: "high", due: "02 Oct",    dueFull: "2 Oct 2026" },
  { id: "T-398", title: "Design document review · PRJ-021",                    project: "PRJ-021", assignee: "u2",   status: "completed",   pri: "med",  due: "28 Sep",    dueFull: "28 Sep 2026" },
  { id: "T-396", title: "Procurement coordination · Aditya Birla Phase 1",     project: "PRJ-018", assignee: "u4",   status: "in-progress", pri: "med",  due: "15 Oct",    dueFull: "15 Oct 2026" },
];

export const DEADLINE_ALERTS = [
  { type: "task",    title: "Finalize inverter string sizing", project: "Metalware India", due: "Today 4PM", severity: "critical", id: "T-412" },
  { type: "task",    title: "Review HVAC retrofit BOQ",         project: "Infosys EC-city",  due: "Today 5PM", severity: "critical", id: "T-411" },
  { type: "milestone",title: "Client sign-off · M&V audit",     project: "ITC Grand Chola", due: "15 Oct · 9d",severity: "warning",  id: "PRJ-021" },
  { type: "task",    title: "Site visit prep · harmonic study", project: "UPL Chemicals",  due: "Tomorrow",  severity: "warning",  id: "T-410" },
  { type: "milestone",title: "Commissioning milestone",         project: "Metalware India", due: "18 Oct · 12d",severity: "info",    id: "PRJ-012" },
];
