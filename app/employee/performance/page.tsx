import type { Metadata } from "next";
import { MyPerformance } from "@/features/performance";

export const metadata: Metadata = { title: "Performance" };

export default function EmployeePerformancePage() {
  return <MyPerformance/>;
}
