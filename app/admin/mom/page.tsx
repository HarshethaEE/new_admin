import type { Metadata } from "next";
import { MinutesOfMeeting } from "@/features/mom";

export const metadata: Metadata = { title: "MOM" };

export default function AdminMomPage() {
  return <MinutesOfMeeting/>;
}
