import type { Metadata } from "next";
import { FinanceDocs } from "@/features/finance";

export const metadata: Metadata = { title: "Invoices & Proposals" };

export default function ManagementFinancePage() {
  return <FinanceDocs/>;
}
