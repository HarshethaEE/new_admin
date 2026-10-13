import type { Metadata } from "next";
import { AdminSettings } from "@/features/settings";

export const metadata: Metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  return <AdminSettings/>;
}
