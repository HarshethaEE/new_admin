import type { Metadata } from "next";
import { Reports } from "@/features/reports";

export const metadata: Metadata = { title: "Reports" };

export default function AdminReportsPage() {
  return <Reports/>;
}
