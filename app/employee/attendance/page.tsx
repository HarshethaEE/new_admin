import type { Metadata } from "next";
import { MyAttendance } from "@/features/attendance";

export const metadata: Metadata = { title: "Attendance" };

export default function EmployeeAttendancePage() {
  return <MyAttendance/>;
}
