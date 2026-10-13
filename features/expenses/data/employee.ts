/* ══════════════════════════════════════════════════════════════════════
   §09 · TRAVEL & EXPENSES — voucher generation
   ══════════════════════════════════════════════════════════════════════ */

export const TRAVEL_REQUESTS = [
  { id: "TR-284", purpose: "Metalware Delhi site visit", from: "Bengaluru", to: "Delhi", dates: "15-17 Oct", mode: "Flight", budget: 18500, status: "Approved", approver: "Rohan Iyer" },
  { id: "TR-281", purpose: "Infosys EC-city design review", from: "Bengaluru", to: "Mysuru", dates: "22 Oct", mode: "Car", budget: 4800, status: "Pending", approver: "Rohan Iyer" },
  { id: "TR-275", purpose: "ITC Chola M&V handover", from: "Bengaluru", to: "Chennai", dates: "02-03 Oct", mode: "Flight", budget: 16200, status: "Completed", approver: "Rohan Iyer" },
];

export const EXPENSES = [
  { id: "EX-412", trip: "TR-275", category: "Flight",         description: "BLR → MAA · IndiGo 6E-123", date: "02 Oct", amount: 6240, status: "Reimbursed", receipt: true },
  { id: "EX-413", trip: "TR-275", category: "Hotel",          description: "Novotel Chennai · 2 nights",  date: "02 Oct", amount: 8400, status: "Reimbursed", receipt: true },
  { id: "EX-414", trip: "TR-275", category: "Meals",           description: "Client lunch + team dinner",  date: "02 Oct", amount: 3860, status: "Reimbursed", receipt: true },
  { id: "EX-418", trip: "TR-275", category: "Local Transport", description: "Cabs · ITC + airport",         date: "03 Oct", amount: 1240, status: "Approved",   receipt: true },
  { id: "EX-421", trip: "TR-284", category: "Flight",         description: "BLR → DEL · Vistara UK-849",  date: "06 Oct", amount: 7850, status: "Pending",    receipt: false },
];

export const VOUCHERS = [
  { id: "VCH-00128", trip: "TR-275", issued: "05 Oct 2026", total: 19740, status: "Paid",      paidOn: "06 Oct", paidTo: "ICICI •••• 4832" },
  { id: "VCH-00119", trip: "TR-268", issued: "22 Sep 2026", total: 12420, status: "Paid",      paidOn: "24 Sep", paidTo: "ICICI •••• 4832" },
  { id: "VCH-00114", trip: "TR-262", issued: "08 Sep 2026", total: 24180, status: "Paid",      paidOn: "10 Sep", paidTo: "ICICI •••• 4832" },
];
