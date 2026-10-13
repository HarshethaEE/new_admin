import type { Metadata } from "next";
import { MyPayroll } from "@/features/payroll";

export const metadata: Metadata = { title: "Payroll" };

export default function EmployeePayrollPage() {
  return <MyPayroll/>;
}
