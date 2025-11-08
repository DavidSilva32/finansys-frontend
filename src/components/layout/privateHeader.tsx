"use client";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import ThemeToggle from "../ui/theme-toggle";
import { useRouter } from "next/navigation";

export default function PrivateHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="flex justify-between items-center px-6 py-3 w-full">
         <h1
          onClick={() => router.push("/")}
          className="text-2xl font-semibold text-primary cursor-pointer"
        >
          FinanSys
        </h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-sm h-8 px-3 shrink-0 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
