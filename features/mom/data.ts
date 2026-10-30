/* ── MOCK DATA ─────────────────────────────────────────────────────── */

export interface PodImage {
  id: string;
  name: string;
  /** Object URL or data URL of the uploaded picture. */
  src: string;
}

/** One minutes-of-meeting note. */
export interface Pod {
  id: number;
  title: string;
  /** yyyy-mm-dd */
  date: string;
  attendees: string[];
  notes: string;
  images: PodImage[];
}

/** Suggested names in the attendee picker; anyone else can be typed in. */
export const POD_PEOPLE = ["Auna Sando", "Durai", "Bharathi", "Ramesh", "Suresh", "Mr. Sharma", "Ms. Ramesh", "Mr. Martin", "Mr. Karthik"];

export const PODS: Pod[] = [
  {
    id: 3,
    title: "Banas Dairy · Proposal walkthrough",
    date: "2026-10-28",
    attendees: ["Auna Sando", "Durai", "Mr. Sharma"],
    notes: "Walked the client through the EIS proposal section by section.\n\n• Client wants metering on all 4 chilling units, not just the main line\n• Asked for a revised BOQ with LoRa gateways instead of GSM\n• Payment terms: 40 / 50 / 10 acceptable in principle\n\nAction items\n– Durai to send revised BOQ by 02 Nov\n– Schedule site re-visit with their maintenance head",
    images: [],
  },
  {
    id: 2,
    title: "KC High School · Commercial negotiation",
    date: "2026-10-22",
    attendees: ["Bharathi", "Ms. Ramesh"],
    notes: "Discussed HVAC control pricing. School board meets on 5 Nov to approve.\n\n• They are comparing us against one other vendor\n• Requested a 2-year AMC bundled in the quote\n\nAction items\n– Bharathi to share AMC pricing options",
    images: [],
  },
  {
    id: 1,
    title: "Weekly pipeline review",
    date: "2026-10-19",
    attendees: ["Auna Sando", "Durai", "Bharathi", "Ramesh", "Suresh"],
    notes: "Went through every open opportunity.\n\n• First Solar is overdue — IT security review still pending\n• Jeyavishnu needs a follow-up call this week\n• Super Auto Forge site visit confirmed for next Tuesday",
    images: [],
  },
];
