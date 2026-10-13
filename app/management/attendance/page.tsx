import type { Metadata } from "next";
import { AttendanceOps } from "@/features/attendance";

export const metadata: Metadata = { title: "Attendance Ops" };

export default function ManagementAttendancePage() {
  return <AttendanceOps/>;
}
