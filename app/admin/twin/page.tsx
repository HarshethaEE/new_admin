import type { Metadata } from "next";
import { DigitalTwin } from "@/features/digital-twin";

export const metadata: Metadata = { title: "Digital Twin" };

export default function AdminTwinPage() {
  return <DigitalTwin/>;
}
