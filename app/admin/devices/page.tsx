import type { Metadata } from "next";
import { Devices } from "@/features/devices";

export const metadata: Metadata = { title: "Devices" };

export default function AdminDevicesPage() {
  return <Devices/>;
}
