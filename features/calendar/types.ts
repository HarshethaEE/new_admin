export interface CalendarEvent {
  /** Day of month, as a string ("7"). */
  date: string;
  title: string;
  when: string;
  type: "teams" | "onsite" | "holiday";
  duration: string;
  location: string;
}

export interface Holiday {
  date: string;
  day: string;
  name: string;
  tone: "amber" | "primary";
}

export interface Attendee {
  id: string;
  name: string;
}

/** Copy and options that differ between the Employee and HR calendars. */
export interface CalendarOptions {
  subtitle: string;
  teamsLegendLabel: string;
  holidaysRemainingLabel: string;
  /** Max holidays listed; omit to list all. */
  holidayLimit?: number;
  showHolidayDownload?: boolean;
  teamsStatus: string;
  teamsDescription: string;
  showSyncSettings?: boolean;
  defaultAttendees?: Attendee[];
  attendeesPlaceholder: string;
  showAgenda?: boolean;
}
