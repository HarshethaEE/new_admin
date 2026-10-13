import type { CalendarEvent, Holiday } from "../types";

/* Calendar events — with Teams integration */
export const CAL_EVENTS: CalendarEvent[] = [
  { date: "7",  title: "Rohan 1:1 sync",                     when: "10:00 AM", type: "teams",   duration: "15 min", location: "Teams · join link available" },
  { date: "7",  title: "Metalware design review",             when: "02:00 PM", type: "teams",   duration: "45 min", location: "Teams · 7 participants" },
  { date: "10", title: "Q3 All-hands",                        when: "04:00 PM", type: "teams",   duration: "1 hr",   location: "Teams · All employees" },
  { date: "14", title: "Infosys EC-city site walkthrough",    when: "09:00 AM", type: "onsite",  duration: "4 hr",   location: "Bengaluru · 7 participants" },
  { date: "20", title: "Diwali",                              when: "All day",  type: "holiday", duration: "",       location: "Festival of lights" },
  { date: "24", title: "Tumakuru site visit",                 when: "09:00 AM", type: "onsite",  duration: "Full day", location: "Tumakuru · Site team" },
];

export const HOLIDAYS_FY: Holiday[] = [
  { date: "20 Oct", day: "Tue", name: "Diwali",                tone: "amber" },
  { date: "01 Nov", day: "Sat", name: "Kannada Rajyotsava",   tone: "primary" },
  { date: "25 Dec", day: "Thu", name: "Christmas",             tone: "amber" },
  { date: "26 Jan", day: "Mon", name: "Republic Day",          tone: "primary" },
  { date: "19 Mar", day: "Thu", name: "Holi",                  tone: "amber" },
  { date: "02 Apr", day: "Thu", name: "Mahavir Jayanti",       tone: "primary" },
  { date: "25 Dec", day: "Thu", name: "Christmas",             tone: "amber" },
];
