import type { Metadata } from "next";
import { LeaveManagement } from "@/features/leave";

export const metadata: Metadata = { title: "Leave Management" };

export default function ManagementLeavePage() {
  return <LeaveManagement/>;
}
