import type { Metadata } from "next";
import { CalendarView, employeeCalendar } from "@/features/calendar";
import { TEAM_MEMBERS } from "@/features/projects";

export const metadata: Metadata = { title: "Calendar" };

export default function EmployeeCalendarPage() {
  return (
    <CalendarView
      events={employeeCalendar.CAL_EVENTS}
      holidays={employeeCalendar.HOLIDAYS_FY}
      options={{
        subtitle: "Teams meetings, holidays, and events for FY 26-27",
        teamsLegendLabel: "Teams meeting",
        holidaysRemainingLabel: "days off remaining",
        holidayLimit: 5,
        showHolidayDownload: true,
        teamsStatus: "Connected",
        teamsDescription: "Your Teams calendar syncs automatically. Schedule meetings here and invites are sent directly.",
        showSyncSettings: true,
        defaultAttendees: TEAM_MEMBERS.slice(0, 3).map(m => ({ id: m.id, name: m.name })),
        attendeesPlaceholder: "Add more…",
        showAgenda: true,
      }}
    />
  );
}
