import type { CalendarEvent, Holiday } from "../types";

/* Calendar events for HR */
export const CAL_EVENTS: CalendarEvent[] = [
  { date: "7",  title: "Weekly HR sync",                     when: "10:00 AM", type: "teams",   duration: "30 min", location: "Teams · HR team" },
  { date: "7",  title: "Interview — Lead Solar Designer",     when: "02:00 PM", type: "teams",   duration: "1 hr",   location: "Teams · 4 panelists" },
  { date: "9",  title: "Imran probation review",              when: "11:00 AM", type: "teams",   duration: "45 min", location: "Teams · with Suresh Bhat" },
  { date: "10", title: "Q3 All-hands",                        when: "04:00 PM", type: "teams",   duration: "1 hr",   location: "Teams · All employees" },
  { date: "14", title: "New hire onboarding batch",           when: "09:00 AM", type: "onsite",  duration: "Full day", location: "Bengaluru HQ" },
  { date: "20", title: "Diwali",                              when: "All day",  type: "holiday", duration: "",       location: "Festival of lights" },
];

export const HOLIDAYS_FY: Holiday[] = [
  { date: "20 Oct", day: "Tue", name: "Diwali",                tone: "amber" },
  { date: "01 Nov", day: "Sat", name: "Kannada Rajyotsava",   tone: "primary" },
  { date: "25 Dec", day: "Thu", name: "Christmas",             tone: "amber" },
  { date: "26 Jan", day: "Mon", name: "Republic Day",          tone: "primary" },
  { date: "19 Mar", day: "Thu", name: "Holi",                  tone: "amber" },
];
