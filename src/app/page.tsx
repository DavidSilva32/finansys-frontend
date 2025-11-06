"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/I18nContext";
import { isTokenExpired } from "@/lib/authUtils";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { t } = useI18n();

  const goToLogin = () => {
    const token = localStorage.getItem("accessToken");
    if (token && !isTokenExpired(token)) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
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
        {t("home.button.access")}
      </Button>
    </main>
  );
}
