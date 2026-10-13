import type { Metadata } from "next";
import { ManagementOverview } from "@/features/overview";

export const metadata: Metadata = { title: "Dashboard" };

export default function ManagementHomePage() {
  return <ManagementOverview/>;
}
