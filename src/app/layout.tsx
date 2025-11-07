import type { Metadata } from "next";
import "@/styles/globals.css";
import { ClientLanguageWrapper } from "@/components/clientLanguageWrapper";

export const metadata: Metadata = {
  title: "FinanSys",
  description: "Smart Financial System for Small Businesses",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLanguageWrapper>{children}</ClientLanguageWrapper>
      </body>
    </html>
  );
}