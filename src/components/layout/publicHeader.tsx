"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useI18n } from "@/context/I18nContext";
import ThemeToggle from "../ui/theme-toggle";

export default function PublicHeader() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <header className="w-full bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <h1
          onClick={() => router.push("/")}
          className="text-xl font-bold text-primary cursor-pointer"
        >
          FinanSys
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => router.push("/login")}
            className="text-sm"
          >
            {t("home.access")}
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
