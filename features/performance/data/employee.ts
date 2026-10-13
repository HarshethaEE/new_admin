import { Activity, CheckCircle2, Clock, FileText, Target, Timer } from "lucide-react";
import { greenTheme as T } from "@/shared/theme";

/* Points breakdown */
export const POINTS_BREAKDOWN = [
  { category: "Attendance",            earned: 580, max: 600, icon: Clock,       color: T.g,     weight: "6 pts/day · 18-day streak bonus" },
  { category: "Hours worked",          earned: 720, max: 800, icon: Timer,       color: T.gDeep, weight: "Base 8h/day · bonus for extra" },
  { category: "Task completion on time",earned: 580, max: 700, icon: CheckCircle2,color: T.b,    weight: "+20 per task · −10 if late" },
  { category: "Daily task updates",    earned: 440, max: 500, icon: FileText,    color: T.a,     weight: "+5 per update · consistency bonus" },
  { category: "Attendance updates",    earned: 280, max: 300, icon: Activity,    color: T.gLight,weight: "+3 per punch · streak bonus" },
  { category: "Organized & timely",    earned: 242, max: 300, icon: Target,      color: T.p,     weight: "Project + manager rating" },
];

export const LEADERBOARD = [
  { rank: 1, name: "Priya Krishnan",     dept: "Project Execution", points: 3184, delta: 142, badges: 7, streak: 24 },
  { rank: 2, name: "Rohan Iyer",         dept: "Engineering",       points: 3042, delta: 98,  badges: 9, streak: 21 },
  { rank: 3, name: "Aarav Mehta",        dept: "Engineering",       points: 2842, delta: 184, badges: 6, streak: 18, isMe: true },
  { rank: 4, name: "Karthik Subramani",  dept: "Project Execution", points: 2718, delta: 112, badges: 8, streak: 15 },
  { rank: 5, name: "Sneha Reddy",        dept: "Engineering",       points: 2614, delta: 96,  badges: 5, streak: 14 },
  { rank: 6, name: "Meera Joshi",        dept: "Finance",           points: 2548, delta: 72,  badges: 5, streak: 20 },
  { rank: 7, name: "Anjali Pillai",      dept: "People & Culture",  points: 2496, delta: 118, badges: 6, streak: 12 },
  { rank: 8, name: "Harish Bhatia",      dept: "IT & Systems",      points: 2418, delta: 84,  badges: 4, streak: 11 },
  { rank: 9, name: "Lavanya Iyer",       dept: "Project Execution", points: 2364, delta: 68,  badges: 4, streak: 9 },
  { rank: 10,name: "Nikhil Bhardwaj",    dept: "Engineering",       points: 2286, delta: 142, badges: 3, streak: 16 },
];

export const POINTS_HISTORY = [
  { m: "Apr", v: 2184 }, { m: "May", v: 2342 }, { m: "Jun", v: 2458 },
  { m: "Jul", v: 2524 }, { m: "Aug", v: 2648 }, { m: "Sep", v: 2742 }, { m: "Oct", v: 2842 },
];
