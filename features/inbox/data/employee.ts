import type { Chat, ChatMessage } from "../types";

/* Chats — WhatsApp style */
export const CHATS: Chat[] = [
  { id: "c1", name: "Metalware Project Team",  isGroup: true,  members: 7, last: "Priya: BOQ v3 uploaded, review by EOD", when: "11:42 AM", unread: 3, pinned: true, tone: "primary" },
  { id: "c2", name: "Rohan Iyer",               isGroup: false, last: "Great work on the inverter sizing!", when: "10:58 AM", unread: 0, online: true,  tone: "primary" },
  { id: "c3", name: "Infosys EC-city Rollout",  isGroup: true,  members: 11, last: "Karthik: Site survey rescheduled to 15 Oct", when: "10:24 AM", unread: 1, tone: "info" },
  { id: "c4", name: "Priya Krishnan",           isGroup: false, last: "Can we hop on a quick call?", when: "09:40 AM", unread: 2, online: true,  tone: "primary" },
  { id: "c5", name: "ITC Chola M&V",            isGroup: true,  members: 4, last: "You: Report draft shared", when: "Yesterday", unread: 0, tone: "amber" },
  { id: "c6", name: "Neha Verma (HRBP)",        isGroup: false, last: "Diwali bonus FAQ attached", when: "Yesterday", unread: 0, tone: "primary" },
  { id: "c7", name: "Engineering All-hands",    isGroup: true,  members: 72, last: "Rohan: Reminder — demo Friday 4PM", when: "02 Oct", unread: 0, tone: "info" },
  { id: "c8", name: "Faisal Khan (IT)",          isGroup: false, last: "Workstation ticket resolved ✓", when: "01 Oct", unread: 0, tone: "primary" },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  { from: "Priya Krishnan", me: false, text: "Hey Aarav, got a sec?", when: "11:38 AM" },
  { from: "me",             me: true,  text: "What's up?", when: "11:38 AM", status: "read" },
  { from: "Priya Krishnan", me: false, text: "Pushed BOQ v3 to the shared drive. Can you confirm the inverter counts for bay 4 match your design doc?", when: "11:40 AM" },
  { from: "me",             me: true,  text: "On it. Opening now.", when: "11:40 AM", status: "read" },
  { from: "me",             me: true,  text: "Confirmed — 12 strings × 48 modules, matches my calc. One small flag: the SMA inverter spec needs updating to the newer model we agreed on last week.", when: "11:41 AM", status: "read" },
  { from: "Priya Krishnan", me: false, text: "Perfect catch. Will update and resend before EOD.", when: "11:42 AM" },
  { from: "Priya Krishnan", me: false, text: "Also — Rohan wants a 15 min sync tomorrow 10 AM to walk through the handover plan. Teams invite coming your way.", when: "11:42 AM" },
];
