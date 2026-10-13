import type { PENDING_VOUCHERS } from "./data/management";

export type Voucher = (typeof PENDING_VOUCHERS)[number];

export interface VoucherLineItem {
  category: string;
  description: string;
  date: string;
  amount: number;
  receipt: boolean;
}
