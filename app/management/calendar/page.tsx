import type { Metadata } from "next";
import { CalendarView, managementCalendar } from "@/features/calendar";

export const metadata: Metadata = { title: "Calendar" };

export default function ManagementCalendarPage() {
  return (
    <CalendarView
      events={managementCalendar.CAL_EVENTS}
      holidays={managementCalendar.HOLIDAYS_FY}
      options={{
        subtitle: "Teams meetings, interviews, holidays, and events",
        teamsLegendLabel: "Teams",
        holidaysRemainingLabel: "days remaining",
        teamsStatus: "Connected · auto-sync",
        teamsDescription: "Interviews, 1:1s, and all-hands sync directly to your Teams calendar.",
        attendeesPlaceholder: "Add attendees…",
      }}
    />
  );
}
