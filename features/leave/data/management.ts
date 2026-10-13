/* Leave requests awaiting approval */
export const LEAVE_REQUESTS = [
  { id: "LV-184", emp: "Aarav Mehta",       dept: "Engineering",       type: "Casual",   from: "20 Oct", to: "22 Oct", days: 3, reason: "Diwali with family in Jaipur", applied: "Today, 09:14 AM", status: "pending", balance: "6/12 CL left" },
  { id: "LV-183", emp: "Sneha Reddy",       dept: "Engineering",       type: "WFH",      from: "21 Oct", to: "22 Oct", days: 2, reason: "Deep-focus report writing",      applied: "Today, 08:40 AM", status: "pending", balance: "4/8 WFH left" },
  { id: "LV-182", emp: "Priya Krishnan",    dept: "Project Execution", type: "Earned",   from: "06 Nov", to: "10 Nov", days: 5, reason: "Family wedding",                 applied: "Yesterday",       status: "pending", balance: "11/18 EL left" },
  { id: "LV-181", emp: "Kavya Shetty",      dept: "Marketing",         type: "Sick",     from: "06 Oct", to: "07 Oct", days: 2, reason: "Fever + flu, doctor advised rest",applied: "Today, 07:12 AM", status: "pending", balance: "7/10 SL left" },
  { id: "LV-180", emp: "Nikhil Bhardwaj",   dept: "Engineering",       type: "Casual",   from: "15 Oct", to: "15 Oct", days: 1, reason: "Personal work",                   applied: "Yesterday",       status: "pending", balance: "9/12 CL left" },
  { id: "LV-179", emp: "Imran Sheikh",      dept: "O&M (Field)",       type: "Comp-off", from: "18 Oct", to: "18 Oct", days: 1, reason: "Weekend site work on 05 Oct",     applied: "Yesterday",       status: "pending", balance: "2/3 CO left" },
];

export const LEAVE_HISTORY = [
  { id: "LV-178", emp: "Meera Joshi",   type: "Earned", from: "28 Sep", to: "30 Sep", days: 3, status: "Approved",  by: "You · 28 Sep" },
  { id: "LV-177", emp: "Vikram Desai",  type: "Sick",   from: "25 Sep", to: "26 Sep", days: 2, status: "Approved",  by: "You · 25 Sep" },
  { id: "LV-176", emp: "Harish Bhatia", type: "Casual", from: "22 Sep", to: "22 Sep", days: 1, status: "Declined",  by: "Project deadline conflict" },
  { id: "LV-175", emp: "Lavanya Iyer",  type: "WFH",    from: "18 Sep", to: "19 Sep", days: 2, status: "Approved",  by: "You · 17 Sep" },
];
