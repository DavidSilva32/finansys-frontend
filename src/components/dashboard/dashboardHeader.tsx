"use client";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import ThemeToggle from "../ui/theme-toggle";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
        <h1 className="text-xl font-extrabold text-primary">FinanSys</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-sm h-8 px-3 shrink-0"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
