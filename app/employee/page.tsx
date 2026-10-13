import type { Metadata } from "next";
import { EmployeeOverview } from "@/features/overview";

export const metadata: Metadata = { title: "Dashboard" };

export default function EmployeeHomePage() {
  return <EmployeeOverview/>;
}
