import type { Metadata } from "next";
import { TravelExpenses } from "@/features/expenses";

export const metadata: Metadata = { title: "Travel & Expenses" };

export default function EmployeeTravelPage() {
  return <TravelExpenses/>;
}
