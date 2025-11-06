"use client";
import { Toaster } from "@/components/ui/sonner";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <ThemeToggle fixed />
      {children}
      <Toaster richColors position="top-right" />
    </div>
  );
}
