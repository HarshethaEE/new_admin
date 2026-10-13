import type { Metadata } from "next";
import { AccessControl } from "@/features/access-control";

export const metadata: Metadata = { title: "Access Control" };

export default function AdminAccessPage() {
  return <AccessControl/>;
}
