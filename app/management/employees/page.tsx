import type { Metadata } from "next";
import { EmployeeDirectory } from "@/features/employees";

export const metadata: Metadata = { title: "Employees" };

export default function ManagementEmployeesPage() {
  return <EmployeeDirectory/>;
}
