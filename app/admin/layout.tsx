import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RoleShell } from "../_components/RoleShell";

export const metadata: Metadata = {
  title: { template: "%s · Admin | Elements Energy", default: "Admin | Elements Energy" },
};

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <RoleShell dashboard="admin">{children}</RoleShell>;
}
