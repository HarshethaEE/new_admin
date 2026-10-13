import type { Metadata } from "next";
import { AdminOverview } from "@/features/overview";

export const metadata: Metadata = { title: "Overview" };

export default function AdminHomePage() {
  return <AdminOverview/>;
}
