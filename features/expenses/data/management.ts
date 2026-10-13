import type { VoucherLineItem } from "../types";
/* ══════════════════════════════════════════════════════════════════════
   §10 · VOUCHERS — pay employee reimbursements
   ══════════════════════════════════════════════════════════════════════ */

export const PENDING_VOUCHERS = [
  { id: "VCH-00132", emp: "Priya Krishnan",    empId: "EMP-0018", trip: "TR-287", purpose: "Tumakuru Phase II site inspection", submitted: "Today, 11:14 AM", total: 24180, items: 6, account: "HDFC •••• 7281", dept: "Project Execution", urgency: "normal" },
  { id: "VCH-00131", emp: "Sneha Reddy",       empId: "EMP-0122", trip: "TR-286", purpose: "Mysuru rooftop audit",               submitted: "Today, 09:42 AM", total: 8640,  items: 4, account: "ICICI •••• 4291", dept: "Engineering",       urgency: "normal" },
  { id: "VCH-00130", emp: "Vikram Desai",      empId: "EMP-0067", trip: "TR-284", purpose: "Chennai → Mumbai client visit",      submitted: "Yesterday",       total: 42500, items: 9, account: "SBI ••••   8847",  dept: "Sales & BD",        urgency: "high" },
];

export const PAID_VOUCHERS = [
  { id: "VCH-00128", emp: "Aarav Mehta",       empId: "EMP-0017", trip: "TR-275", purpose: "ITC Chola M&V handover",            paid: "06 Oct · 11:40 AM", total: 19740, approvedBy: "You" },
  { id: "VCH-00127", emp: "Lavanya Iyer",      empId: "EMP-0211", trip: "TR-274", purpose: "Hosur site coordination",            paid: "04 Oct · 2:18 PM",  total: 11240, approvedBy: "You" },
  { id: "VCH-00126", emp: "Harish Bhatia",     empId: "EMP-0163", trip: "TR-273", purpose: "Hyderabad branch IT setup",          paid: "02 Oct · 4:52 PM",  total: 16820, approvedBy: "You" },
  { id: "VCH-00125", emp: "Priya Krishnan",    empId: "EMP-0018", trip: "TR-268", purpose: "Metalware Delhi commissioning",      paid: "28 Sep · 10:12 AM", total: 32640, approvedBy: "You" },
];

export const VOUCHER_LINE_ITEMS: Record<string, VoucherLineItem[]> = {
  "VCH-00132": [
    { category: "Flight",         description: "BLR → BLR site via SG-258",  date: "02 Oct", amount: 8400,  receipt: true },
    { category: "Hotel",          description: "Site guesthouse · 3 nights", date: "02 Oct", amount: 9000,  receipt: true },
    { category: "Meals",           description: "Team meals + client lunch",  date: "02 Oct", amount: 3240,  receipt: true },
    { category: "Local Transport", description: "Cabs + site shuttle",         date: "03 Oct", amount: 1840,  receipt: true },
    { category: "Fuel",            description: "Toll + parking",              date: "04 Oct", amount: 920,   receipt: true },
    { category: "Misc",            description: "Printing + site supplies",   date: "04 Oct", amount: 780,   receipt: true },
  ],
};
