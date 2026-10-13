import { greenTheme as T } from "@/shared/theme";

export const ORG = { total: 128, active: 128, onLeave: 11, newThisMonth: 7 };

export const EMPLOYEE_STATUS = [
  { label: "Full-Time",  count: 87, pct: 68, color: T.g },
  { label: "Part-Time",  count: 19, pct: 15, color: T.gLight },
  { label: "Freelance",  count: 13, pct: 10, color: T.a },
  { label: "Internship", count: 9,  pct: 7,  color: T.info },
];

export const EMPLOYEES = [
  { id: "EMP-0017", name: "Aarav Mehta",        role: "Senior Solar Engineer",     dept: "Engineering",       status: "Active",    type: "Full-Time",  perf: 92, joined: "12 Apr 2021", points: 2842 },
  { id: "EMP-0018", name: "Priya Krishnan",     role: "Project Manager",           dept: "Project Execution", status: "Active",    type: "Full-Time",  perf: 88, joined: "20 Jul 2020", points: 3184 },
  { id: "EMP-0049", name: "Meera Joshi",        role: "Senior Accountant",         dept: "Finance",           status: "Active",    type: "Full-Time",  perf: 85, joined: "08 Nov 2021", points: 2548 },
  { id: "EMP-0067", name: "Vikram Desai",       role: "Regional Sales Lead",       dept: "Sales & BD",        status: "On Leave",  type: "Full-Time",  perf: 79, joined: "01 Jun 2022", points: 2184 },
  { id: "EMP-0089", name: "Anjali Pillai",      role: "HR Business Partner",       dept: "People & Culture",  status: "Active",    type: "Full-Time",  perf: 91, joined: "15 Mar 2023", points: 2496 },
  { id: "EMP-0122", name: "Sneha Reddy",        role: "Electrical Engineer",       dept: "Engineering",       status: "Active",    type: "Full-Time",  perf: 86, joined: "01 Aug 2023", points: 2614 },
  { id: "EMP-0138", name: "Imran Sheikh",       role: "Maintenance Tech",          dept: "O&M (Field)",       status: "Probation", type: "Full-Time",  perf: 74, joined: "12 Feb 2024", points: 1824 },
  { id: "EMP-0198", name: "Nikhil Bhardwaj",    role: "Solar Engineer",            dept: "Engineering",       status: "Probation", type: "Full-Time",  perf: 72, joined: "08 Jan 2024", points: 2286 },
  { id: "EMP-0241", name: "Kavya Shetty",       role: "Growth Marketer",           dept: "Marketing",         status: "Active",    type: "Full-Time",  perf: 83, joined: "22 May 2025", points: 2142 },
  { id: "EMP-0252", name: "Ananya Singh",       role: "UX Designer (Contract)",     dept: "Product Design",    status: "Active",    type: "Freelance",  perf: 89, joined: "01 Jul 2026", points: 1986 },
];
