import type { Chat, ChatMessage } from "../types";

/* HR chats */
export const CHATS: Chat[] = [
  { id: "c1", name: "People Team",              isGroup: true,  members: 9,  last: "Neha: Diwali bonus run complete ✓", when: "11:42 AM", unread: 2, pinned: true, tone: "primary" },
  { id: "c2", name: "Aarav Mehta",              isGroup: false, last: "About the leave request for 20-22 Oct…",  when: "10:58 AM", unread: 1, online: true,  tone: "primary" },
  { id: "c3", name: "Managers · All",           isGroup: true,  members: 11, last: "Rohan: Q3 reviews should be in by Friday", when: "10:24 AM", unread: 3, tone: "info" },
  { id: "c4", name: "Priya Krishnan",           isGroup: false, last: "Thanks for the quick turnaround!", when: "09:40 AM", unread: 0, online: true,  tone: "primary" },
  { id: "c5", name: "Recruitment pipeline",      isGroup: true,  members: 4,  last: "You: 3 new applicants to screen today", when: "Yesterday", unread: 0, tone: "amber" },
  { id: "c6", name: "Lakshmi N. (Finance)",     isGroup: false, last: "Payroll inputs locked for Oct ✓", when: "Yesterday", unread: 0, tone: "primary" },
  { id: "c7", name: "Vikram Desai",             isGroup: false, last: "Sick leave approved — get well soon", when: "02 Oct", unread: 0, tone: "primary" },
  { id: "c8", name: "Imran Sheikh",             isGroup: false, last: "Probation review scheduled 12 Oct", when: "01 Oct", unread: 0, tone: "primary" },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  { from: "Aarav Mehta",     me: false, text: "Hi Davis, I've submitted a leave request for 20-22 Oct (Diwali). Just wanted to flag it's a 3-day one so wanted to make sure it's clear.", when: "10:52 AM" },
  { from: "me",              me: true,  text: "No problem Aarav — leave balance looks healthy and your work handover is already in place with Priya. Approving now.", when: "10:54 AM", status: "read" },
  { from: "me",              me: true,  text: "Also, congrats on being in the top 3 on the leaderboard this month 🏆", when: "10:55 AM", status: "read" },
  { from: "Aarav Mehta",     me: false, text: "Thank you! Appreciate it 🙏", when: "10:57 AM" },
  { from: "Aarav Mehta",     me: false, text: "About the leave request for 20-22 Oct — thanks for the quick approval!", when: "10:58 AM" },
];
