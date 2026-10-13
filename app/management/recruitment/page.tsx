import type { Metadata } from "next";
import { Recruitment } from "@/features/recruitment";

export const metadata: Metadata = { title: "Recruitment" };

export default function ManagementRecruitmentPage() {
  return <Recruitment/>;
}
