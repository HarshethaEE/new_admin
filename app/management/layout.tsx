import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RoleShell } from "../_components/RoleShell";

export const metadata: Metadata = {
  title: { template: "%s · HR Management | Elements Energy", default: "HR Management | Elements Energy" },
};

export default function ManagementLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <RoleShell dashboard="management">{children}</RoleShell>;
}
