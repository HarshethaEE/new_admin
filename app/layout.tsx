import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Lato, Plus_Jakarta_Sans } from "next/font/google";
import { PrelineScript } from "./_components/PrelineScript";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-jakarta" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-lato" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Elements Energy | Dashboard",
  description: "Employee, management, and admin dashboards for Elements Energy.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${lato.variable} ${jetbrains.variable}`}>
      <body>
        {children}
        <PrelineScript/>
      </body>
    </html>
  );
}
