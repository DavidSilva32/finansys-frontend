"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/I18nContext";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { t } = useI18n();
  const { isAuthenticated, isChecking } = useAuthCheck(false);

  const goToLogin = () => {
    if (isChecking) return;
    router.push(isAuthenticated ? "/dashboard" : "/login");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background font-sans px-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">
        {t("home.title")}
      </h1>
      <p className="text-center text-muted-foreground mb-6 max-w-xl">
        {t("home.description")}
      </p>
      <Button onClick={goToLogin} className="px-6 py-3 cursor-pointer">
        {isChecking ? t("home.loading") : t("home.access")}
      </Button>
    </main>
  );
}
