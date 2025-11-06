"use client";
import PublicHeader from "@/components/layout/publicHeader";
import { Toaster } from "@/components/ui/sonner";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicHeader />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
