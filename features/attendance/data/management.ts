import { greenTheme as T } from "@/shared/theme";

/* Attendance Ops data */
export const LIVE_FLOOR = {
  present: 112, wfh: 8, onLeave: 11, late: 5, notMarked: 3,
};

export const LATE_ARRIVALS = [
  { emp: "Imran Sheikh",    dept: "O&M",         loc: "Hosur Site",   checkIn: "09:52 AM", lateBy: "52 min", reason: "—" },
  { emp: "Nikhil Bhardwaj", dept: "Engineering", loc: "Hyderabad",    checkIn: "09:38 AM", lateBy: "38 min", reason: "Traffic" },
  { emp: "Divya Menon",      dept: "Marketing",   loc: "Remote",       checkIn: "09:34 AM", lateBy: "34 min", reason: "Doctor visit" },
  { emp: "Ashwin Pai",       dept: "O&M",         loc: "Tumakuru",     checkIn: "09:28 AM", lateBy: "28 min", reason: "—" },
  { emp: "Ravi Krishnan",   dept: "Operations",  loc: "Bengaluru HQ", checkIn: "09:22 AM", lateBy: "22 min", reason: "Metro delay" },
];

export const GEOFENCE_FLAGS = [
  { emp: "Nikhil Bhardwaj", loc: "Hyderabad Office", issue: "Punched in from 2.4km outside geofence", when: "Today 08:51 AM" },
  { emp: "Divya Menon",      loc: "Remote / Field",   issue: "No checkout since yesterday 11:58 PM",   when: "11h ago" },
];

export const SHIFT_TODAY = [
  { shift: "Morning (6AM–2PM)",   count: 24,  dept: "O&M Field",    color: T.a },
  { shift: "General (9AM–6PM)",    count: 86,  dept: "All corporate", color: T.g },
  { shift: "Evening (2PM–10PM)",  count: 12,  dept: "O&M Night",    color: T.b },
  { shift: "On-call",              count: 6,   dept: "Standby",      color: T.p },
];
