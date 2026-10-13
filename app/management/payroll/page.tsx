import type { Metadata } from "next";
import { PayrollRun } from "@/features/payroll";

export const metadata: Metadata = { title: "Payroll" };

export default function ManagementPayrollPage() {
  return <PayrollRun/>;
}
