import {
  CalendarIcon, Clock, Cpu, FileCheck2, FileText, FolderKanban, GitBranch, Globe, Key,
  LayoutDashboard, Plane, Receipt, Settings, Sparkles, TrendingUp, User, UserPlus, Users, Wallet,
} from "lucide-react";
import { ADMIN_USER, ADMIN, ME } from "@/features/account";
import { CLIENTS } from "@/features/clients";
import { LEAVE_REQUESTS } from "@/features/leave";
import { LEADERBOARD } from "@/features/performance";
import { CLIENT_PROJECTS, TASKS } from "@/features/projects";
import { APPLICANTS } from "@/features/recruitment";
import type { DashboardConfig, DashboardId } from "@/shared/layout";
import { greenTheme, purpleTheme } from "@/shared/theme";

/* Per-dashboard shell configuration: theme, viewer, navigation.
   Each nav `slug` maps to a route at `${basePath}/${slug}`. */

const employee: DashboardConfig = {
  id: "employee",
  basePath: "/employee",
  theme: greenTheme,
  viewer: { name: ME.name, role: ME.role },
  viewerSubtitle: `Employee · Rank #${ME.rank}`,
  logo: { label: "Energy", size: 32 },
  searchPlaceholder: "Search anything",
  inbox: { badge: 6 },
  leaderboard: { entries: LEADERBOARD, slug: "performance" },
  nav: [
    { slug: "home",        label: "Dashboard",         icon: LayoutDashboard },
    { slug: "projects",    label: "Projects & Tasks",  icon: FolderKanban, badge: TASKS.filter(t => t.assignee === "me" && t.status !== "completed").length },
    { slug: "calendar",    label: "Calendar",          icon: CalendarIcon },
    { slug: "travel",      label: "Travel & Expenses", icon: Plane },
    { slug: "attendance",  label: "Attendance",        icon: Clock },
    { slug: "leave",       label: "Leave",             icon: FileText },
    { slug: "performance", label: "Performance",       icon: TrendingUp },
  ],
  bottomNav: [
    { label: "Profile",  icon: User },
    { label: "Settings", icon: Settings },
  ],
};

const management: DashboardConfig = {
  id: "management",
  basePath: "/management",
  theme: greenTheme,
  viewer: { name: ADMIN.name, role: ADMIN.role },
  viewerSubtitle: ADMIN.role,
  viewerSubtitleAccent: true,
  logo: { label: "HR Console", size: 36, accentLabel: true },
  searchPlaceholder: "Search employees, requests, applicants…",
  inbox: { badge: 6 },
  nav: [
    { slug: "home",        label: "Dashboard",            icon: LayoutDashboard },
    { slug: "calendar",    label: "Calendar",             icon: CalendarIcon },
    { slug: "employees",   label: "Employees",            icon: Users },
    { slug: "attendance",  label: "Attendance Ops",       icon: Clock },
    { slug: "performance", label: "Performance",          icon: TrendingUp },
    { slug: "leave",       label: "Leave Mgmt",           icon: FileText, badge: LEAVE_REQUESTS.length },
    { slug: "recruitment", label: "Recruitment",          icon: UserPlus, badge: APPLICANTS.filter(a => a.status === "new").length },
    { slug: "payroll",     label: "Payroll",              icon: Wallet },
    { slug: "vouchers",    label: "Vouchers",             icon: Receipt, badge: 3 },
    { slug: "finance",     label: "Invoices & Proposals", icon: FileCheck2 },
  ],
  bottomNav: [
    { label: "Profile",  icon: User },
    { label: "Settings", icon: Settings },
  ],
};

const admin: DashboardConfig = {
  id: "admin",
  basePath: "/admin",
  theme: purpleTheme,
  viewer: ADMIN_USER,
  viewerSubtitle: ADMIN_USER.role,
  viewerSubtitleAccent: true,
  logo: { label: "Admin", size: 36, accentLabel: true },
  searchPlaceholder: "Search clients, devices, projects…",
  environment: "Production",
  switcherNote: "Shared across employees + HR",
  nav: [
    { slug: "home",     label: "Overview",        icon: LayoutDashboard },
    { slug: "clients",  label: "Clients",         icon: Users,        badge: CLIENTS.length },
    { slug: "projects", label: "Projects",        icon: FolderKanban, badge: CLIENT_PROJECTS.length },
    { slug: "pipeline", label: "Pipeline",        icon: GitBranch },
    { slug: "devices",  label: "Devices",         icon: Cpu },
    { slug: "ai",       label: "AI Intelligence", icon: Sparkles },
    { slug: "reports",  label: "Reports",         icon: FileText },
    { slug: "twin",     label: "Digital Twin",    icon: Globe },
  ],
  bottomNav: [
    { slug: "access",   label: "Access Control", icon: Key },
    { slug: "settings", label: "Settings",       icon: Settings },
  ],
};

export const DASHBOARDS: Record<DashboardId, DashboardConfig> = { employee, management, admin };
