import type { Metadata } from "next";
import { AIInsights } from "@/features/ai-insights";

export const metadata: Metadata = { title: "AI Intelligence" };

export default function AdminAiPage() {
  return <AIInsights/>;
}
