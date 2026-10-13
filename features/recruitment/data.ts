import { greenTheme as T } from "@/shared/theme";

/* Recruitment — Google Sheet applicants */
export const APPLICANTS = [
  { id: "APP-0184", name: "Anushka Bose",      email: "a.bose@gmail.com",       role: "Lead Solar Designer",   source: "Website",   applied: "Today",    exp: "8 yrs", stage: "Screening",   location: "Bengaluru", status: "new" },
  { id: "APP-0183", name: "Rahul Deshmukh",     email: "rahul.d@outlook.com",    role: "Project Manager",       source: "Website",   applied: "Today",    exp: "6 yrs", stage: "Screening",   location: "Pune",      status: "new" },
  { id: "APP-0182", name: "Shreya Patel",       email: "shreya.p@yahoo.com",     role: "Energy Data Scientist", source: "Website",   applied: "Yesterday",exp: "4 yrs", stage: "Interview 1", location: "Bengaluru", status: "active" },
  { id: "APP-0181", name: "Arjun Reddy",         email: "arjun.r@gmail.com",      role: "Enterprise Sales Lead", source: "LinkedIn",  applied: "Yesterday",exp: "10 yrs",stage: "Interview 2", location: "Mumbai",    status: "active" },
  { id: "APP-0180", name: "Pooja Agarwal",       email: "pooja.a@gmail.com",      role: "O&M Technician",         source: "Website",   applied: "02 Oct",   exp: "3 yrs", stage: "Offer",       location: "Hyderabad", status: "active" },
  { id: "APP-0179", name: "Vikas Nair",          email: "vikas.n@gmail.com",      role: "Lead Solar Designer",   source: "Website",   applied: "02 Oct",   exp: "7 yrs", stage: "Interview 2", location: "Chennai",   status: "active" },
  { id: "APP-0178", name: "Divya Rao",           email: "divya.rao@gmail.com",    role: "Project Manager",       source: "Referral",  applied: "01 Oct",   exp: "5 yrs", stage: "Final",       location: "Bengaluru", status: "active" },
  { id: "APP-0177", name: "Suresh Menon",        email: "suresh.m@outlook.com",   role: "O&M Technician",         source: "Website",   applied: "30 Sep",   exp: "2 yrs", stage: "Screening",   location: "Kochi",     status: "new" },
  { id: "APP-0176", name: "Nisha Krishnan",      email: "nisha.k@gmail.com",      role: "Energy Data Scientist", source: "Website",   applied: "28 Sep",   exp: "5 yrs", stage: "Interview 1", location: "Bengaluru", status: "active" },
  { id: "APP-0175", name: "Kabir Mehta",         email: "kabir.m@gmail.com",      role: "Enterprise Sales Lead", source: "LinkedIn",  applied: "28 Sep",   exp: "9 yrs", stage: "Rejected",     location: "Delhi",     status: "closed" },
];

export const APPLICANT_SOURCES = [
  { source: "Website career page", count: 82, pct: 56, color: T.g },
  { source: "LinkedIn",             count: 28, pct: 19, color: T.b },
  { source: "Employee referral",    count: 18, pct: 12, color: T.a },
  { source: "Naukri / Indeed",      count: 13, pct: 9,  color: T.p },
  { source: "Other",                count: 6,  pct: 4,  color: T.mute },
];

export const OPEN_ROLES = [
  { title: "Lead Solar Designer",      dept: "Engineering",       budget: "₹ 20–26 L", applicants: 22 },
  { title: "Project Manager × 2",      dept: "Project Execution", budget: "₹ 18–22 L", applicants: 14 },
  { title: "Energy Data Scientist",    dept: "Engineering",       budget: "₹ 24–30 L", applicants: 28 },
  { title: "O&M Technician × 6",       dept: "O&M (Field)",       budget: "₹ 4.5–7 L", applicants: 46 },
  { title: "Enterprise Sales Lead",    dept: "Sales & BD",        budget: "₹ 24–32 L", applicants: 18 },
];
