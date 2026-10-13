import type { Metadata } from "next";
import { TeamPerformance } from "@/features/performance";

export const metadata: Metadata = { title: "Performance" };

export default function ManagementPerformancePage() {
  return <TeamPerformance/>;
}
