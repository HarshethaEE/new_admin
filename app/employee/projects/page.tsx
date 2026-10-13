import type { Metadata } from "next";
import { ProjectsTasks } from "@/features/projects";

export const metadata: Metadata = { title: "Projects & Tasks" };

export default function EmployeeProjectsPage() {
  return <ProjectsTasks/>;
}
