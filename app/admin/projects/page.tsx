import type { Metadata } from "next";
import { ClientProjects } from "@/features/projects";

export const metadata: Metadata = { title: "Projects" };

export default function AdminProjectsPage() {
  return <ClientProjects/>;
}
