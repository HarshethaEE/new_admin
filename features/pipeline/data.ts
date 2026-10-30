import { purpleTheme as T } from "@/shared/theme";

export const PIPELINE_STAGES = [
  "New Lead",
  "Qualified",
  "Site Audit",
  "Proposal Submitted",
  "Negotiation",
  "Won",
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];
export type OpportunityStatus = "Upcoming" | "Overdue" | "Closed Won";

export interface PipelineOpportunity {
  id: number;
  client: string;
  project: string;
  person: string;
  details: string;
  stage: PipelineStage;
  last: string;
  next: string;
  status: OpportunityStatus;
  poc: string;
  remarks: string;
  description: string;
}

export const PIPELINE_ITEMS: PipelineOpportunity[] = [
  { id: 1, client: "Banas Dairy (Palanpur)", project: "Energy Monitoring System (EIS)", person: "Mr. Sharma", details: "98765 43210\nsharma@banasdairy.co.in", stage: "Proposal Submitted", last: "16 Oct 2026", next: "20 Oct 2026", status: "Upcoming", poc: "Durai", remarks: "Follow up on proposal feedback", description: "Discussed technical scope and shared proposal. Waiting for customer feedback." },
  { id: 2, client: "KC High School (Chennai)", project: "HVAC Control", person: "Ms. Ramesh", details: "98765 43211\nramesh@kchigh.edu.in", stage: "Negotiation", last: "18 Oct 2026", next: "22 Oct 2026", status: "Upcoming", poc: "Bharathi", remarks: "Commercial discussion", description: "Discussed commercial terms. Customer reviewing internally." },
  { id: 3, client: "First Solar", project: "EMS Implementation", person: "Mr. Martin", details: "98765 43212\nmartin@firstsolar.com", stage: "Site Audit", last: "10 Oct 2026", next: "25 Oct 2026", status: "Overdue", poc: "Durai", remarks: "IT review", description: "Completed initial discussion. IT team to review data security requirements." },
  { id: 4, client: "Super Auto Forge", project: "EMS + Storage", person: "Mr. Karthik", details: "98765 43213\nkarthik@superautoforge.in", stage: "Qualified", last: "12 Oct 2026", next: "18 Oct 2026", status: "Upcoming", poc: "Ramesh", remarks: "Schedule technical meeting", description: "Discussed requirement. Planning site visit next week." },
  { id: 5, client: "Jeyavishnu Clothing Pvt. Ltd.", project: "EMS Implementation", person: "Mr. Prakash", details: "98765 43214\nprakash@jeyavishnu.com", stage: "New Lead", last: "05 Oct 2026", next: "20 Oct 2026", status: "Overdue", poc: "Bharathi", remarks: "Send company profile", description: "Initial discussion done. Shared company profile and product details." },
  { id: 6, client: "Yamaha Music India", project: "EMS Subscription", person: "Mr. Hayashi", details: "98765 43215\nhayashi@yamaha.co.in", stage: "Won", last: "01 Oct 2026", next: "—", status: "Closed Won", poc: "Ramesh", remarks: "Project handover", description: "Customer confirmed order. Moving to implementation." },
  { id: 7, client: "Metalware Corporation", project: "EMS + Analytics", person: "Mr. Suresh", details: "98765 43216\nsuresh@metalware.in", stage: "New Lead", last: "12 Oct 2026", next: "24 Oct 2026", status: "Upcoming", poc: "Suresh", remarks: "Initial discussion", description: "Requirement discussed. Share detail proposal in next meeting." },
  { id: 8, client: "Brakes India (Hosur)", project: "Energy Monitoring", person: "Mr. Kumar", details: "98765 43217\nkumar@brakesindia.com", stage: "Qualified", last: "14 Oct 2026", next: "19 Oct 2026", status: "Upcoming", poc: "Ramesh", remarks: "Share SLD and data points", description: "Discussed SLD and meter details. Waiting for site data." },
  { id: 9, client: "Penguin Apparels", project: "EMS + Water Monitoring", person: "Ms. Anitha", details: "98765 43218\nanitha@penguinapparels.com", stage: "Qualified", last: "15 Oct 2026", next: "21 Oct 2026", status: "Upcoming", poc: "Bharathi", remarks: "Follow up on technical queries", description: "Answered customer technical queries. Awaiting final confirmation." },
  { id: 10, client: "U Tech Rubber Products", project: "Energy Monitoring", person: "Mr. Dinesh", details: "98765 43219\ndinesh@utechrubber.com", stage: "Site Audit", last: "18 Oct 2026", next: "27 Oct 2026", status: "Upcoming", poc: "Bharathi", remarks: "Site visit", description: "Site visit scheduled. Prepare checklist and required documents." },
  { id: 11, client: "SMS Pharmaceuticals", project: "Energy Monitoring", person: "Mr. Rao", details: "98765 43220\nrao@smspharma.com", stage: "Negotiation", last: "16 Oct 2026", next: "22 Oct 2026", status: "Upcoming", poc: "Ramesh", remarks: "Commercial terms", description: "Discussed pricing and AMC terms. Customer to revert after internal review." },
  { id: 12, client: "SCSVMV", project: "Energy Monitoring", person: "Dr. Krishnan", details: "98765 43221\nkrishnan@scsvmv.edu.in", stage: "Proposal Submitted", last: "20 Oct 2026", next: "26 Oct 2026", status: "Upcoming", poc: "Durai", remarks: "Follow up for PO", description: "Proposal shared. Follow up for purchase order." },
  { id: 13, client: "TNEB / Government", project: "Energy Audit", person: "Mr. Rajan", details: "98765 43222\nrajan@tn.gov.in", stage: "New Lead", last: "15 Oct 2026", next: "26 Oct 2026", status: "Upcoming", poc: "Bharathi", remarks: "Clarify scope", description: "Initial discussion on audit scope. Share detailed scope document." },
  { id: 14, client: "Elements IITMRP", project: "Campus EMS", person: "Mr. Vivek", details: "98765 43223\nvivek@iitmrp.com", stage: "Negotiation", last: "15 Oct 2026", next: "21 Oct 2026", status: "Upcoming", poc: "Durai", remarks: "Technical + Commercial", description: "Discussed integration and commercial points. Waiting for final approval." },
  { id: 15, client: "Banas Dairy (Phase 1)", project: "EIS Platform", person: "Mr. Patel", details: "98765 43224\npatel@banasdairy.co.in", stage: "Won", last: "08 Oct 2026", next: "—", status: "Closed Won", poc: "Durai", remarks: "Subscription activated", description: "Subscription activated. Monitoring going live." },
];

const stageColors = [T.mute, T.b, T.pLight, T.a, T.p, T.pDeep];

export const PIPELINE = PIPELINE_STAGES.map((stage, index) => ({
  stage,
  count: PIPELINE_ITEMS.filter((opportunity) => opportunity.stage === stage).length,
  color: stageColors[index],
}));
