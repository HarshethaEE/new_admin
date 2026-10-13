import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RoleShell } from "../_components/RoleShell";

export const metadata: Metadata = {
  title: { template: "%s · Employee | Elements Energy", default: "Employee | Elements Energy" },
};

export default function EmployeeLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <RoleShell dashboard="employee">{children}</RoleShell>;
}
