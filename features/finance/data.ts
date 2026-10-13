/* ══════════════════════════════════════════════════════════════════════
   §11 · INVOICES & PROPOSALS — client billing + sales docs
   ══════════════════════════════════════════════════════════════════════ */

export const INVOICES = [
  { id: "INV-2026-0184", client: "Metalware India",       project: "Delhi deployment · phase 2",     issued: "01 Oct", due: "31 Oct", amount: 1248000, status: "Sent",       daysOut: 25 },
  { id: "INV-2026-0183", client: "Infosys Electronic City",project: "EC-city rollout · milestone 3",  issued: "28 Sep", due: "28 Oct", amount: 1860000, status: "Sent",       daysOut: 22 },
  { id: "INV-2026-0182", client: "ITC Grand Chola",        project: "M&V audit · final",              issued: "25 Sep", due: "25 Oct", amount: 420000,  status: "Paid",       daysOut: 0 },
  { id: "INV-2026-0181", client: "UPL Chemicals",          project: "PF study · interim",             issued: "20 Sep", due: "20 Oct", amount: 320000,  status: "Overdue",    daysOut: -3 },
  { id: "INV-2026-0180", client: "Lemon Tree Hotels",      project: "Network rollout · Q3 batch",     issued: "15 Sep", due: "15 Oct", amount: 2240000, status: "Paid",       daysOut: 0 },
  { id: "INV-2026-0179", client: "Flipkart Fulfillment",   project: "Monthly O&M · Sep 2026",         issued: "01 Sep", due: "30 Sep", amount: 180000,  status: "Paid",       daysOut: 0 },
  { id: "INV-2026-0178", client: "Apollo Hospital",         project: "Energy audit · phase 1",         issued: "28 Aug", due: "28 Sep", amount: 540000,  status: "Overdue",    daysOut: -9 },
];

export const PROPOSALS = [
  { id: "PROP-089", client: "Marriott BLR Marathahalli",    scope: "Full-site EMS + rooftop PV · 1.2 MW",        value: 18000000, status: "Sent",       sent: "02 Oct",   expires: "02 Nov", stage: "Awaiting feedback" },
  { id: "PROP-088", client: "Tata Steel Jamshedpur",         scope: "Scope-2 reduction program · 3 facilities",   value: 42000000, status: "Draft",       sent: "—",         expires: "—",       stage: "Internal review" },
  { id: "PROP-087", client: "Cipla Pithampur Plant",         scope: "PF correction + load optimization",          value: 6400000,  status: "Negotiating",sent: "28 Sep",   expires: "28 Oct", stage: "Revision 2 in progress" },
  { id: "PROP-086", client: "Grasim Industries",             scope: "EMS deployment · 2 plants",                   value: 5600000,  status: "Sent",       sent: "25 Sep",   expires: "25 Oct", stage: "Technical clarifications" },
  { id: "PROP-085", client: "Hindustan Zinc Chanderiya",     scope: "Full energy management · smelter facility",  value: 8200000,  status: "Won",        sent: "18 Sep",   expires: "—",       stage: "Signed · onboarding" },
  { id: "PROP-084", client: "Taj Vivanta Chennai",           scope: "Hospitality EMS · pilot",                     value: 2400000,  status: "Lost",       sent: "12 Sep",   expires: "—",       stage: "Lost to competitor" },
];
