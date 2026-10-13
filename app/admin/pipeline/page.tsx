import type { Metadata } from "next";
import { Pipeline } from "@/features/pipeline";

export const metadata: Metadata = { title: "Pipeline" };

export default function AdminPipelinePage() {
  return <Pipeline/>;
}
