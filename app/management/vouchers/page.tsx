import type { Metadata } from "next";
import { VoucherApprovals } from "@/features/expenses";

export const metadata: Metadata = { title: "Vouchers" };

export default function ManagementVouchersPage() {
  return <VoucherApprovals/>;
}
