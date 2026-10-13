import { purpleTheme as T } from "@/shared/theme";

export const PIPELINE = [
  { stage: "Lead",       count: 8, color: T.mute },
  { stage: "Discovery",  count: 5, color: T.b },
  { stage: "Proposal",   count: 4, color: T.a },
  { stage: "Won",        count: 2, color: T.pLight },
  { stage: "Deploying",  count: 3, color: T.p },
  { stage: "Handover",   count: 1, color: T.pDeep },
];

export const PIPELINE_ITEMS = [
  { name: "Tata Steel Jamshedpur",     stage: "Lead",       city: "Jamshedpur" },
  { name: "L&T Powai Campus",          stage: "Lead",       city: "Mumbai" },
  { name: "Grasim Industries",         stage: "Discovery",  city: "Nagda" },
  { name: "Taj Vivanta Chennai",       stage: "Discovery",  city: "Chennai" },
  { name: "Cipla Pithampur Plant",     stage: "Proposal",   city: "Indore" },
  { name: "Hindustan Zinc Chanderiya", stage: "Proposal",   city: "Chittorgarh" },
  { name: "Aditya Birla Textile",      stage: "Deploying",  city: "Pune" },
  { name: "Mahindra Chakan",           stage: "Deploying",  city: "Pune" },
];
