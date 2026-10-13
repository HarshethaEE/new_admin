import type { Metadata } from "next";
import { Clients } from "@/features/clients";

export const metadata: Metadata = { title: "Clients" };

export default function AdminClientsPage() {
  return <Clients/>;
}
