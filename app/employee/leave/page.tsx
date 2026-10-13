import type { Metadata } from "next";
import { MyLeave } from "@/features/leave";

export const metadata: Metadata = { title: "Leave" };

export default function EmployeeLeavePage() {
  return <MyLeave/>;
}
