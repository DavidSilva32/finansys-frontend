"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/I18nContext";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useServerPing } from "@/hooks/useServerPing";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { t } = useI18n();
  const { isAuthenticated, isChecking: authChecking } = useAuthCheck({redirectOnFail: false});
  const { isServerReady } = useServerPing();

  const [serverConnecting, setServerConnecting] = useState(false);

  const onServerReady = () => {
    toast.success("Servidor pronto! Você pode disparar funções aqui.");
  };

  useEffect(() => {
    if (!isServerReady && !serverConnecting) {
      setServerConnecting(true);
    } 
    if (isServerReady && serverConnecting) {
      setServerConnecting(false);
      onServerReady();
    }
  }, [isServerReady, serverConnecting]);

  const goToLogin = () => {
    if (authChecking) return;

    router.push(isAuthenticated ? "/dashboard" : "/login");
  };

  return (
    <main className="flex flex-col min-h-screen bg-linear-to-b from-background to-surface text-foreground">
      <header className="flex justify-between items-center px-8 py-4 border-b border-border bg-surface/70 backdrop-blur">
        <h1 className="text-2xl font-semibold text-primary">FinanSys</h1>
        <Button variant="outline" onClick={goToLogin}>
          {serverConnecting ? t("home.connecting_server") : t("home.access")}
        </Button>
      </header>

      <section className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4 text-primary"
        >
          {t("home.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground mb-10 max-w-2xl"
        >
          {t("home.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
        >
          <div className="p-6 border border-border rounded-2xl bg-surface shadow-sm">
            <h3 className="font-semibold text-primary mb-2">
              {t("home.feature_automation")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("home.feature_automation_desc")}
            </p>
          </div>

          <div className="p-6 border border-border rounded-2xl bg-surface shadow-sm">
            <h3 className="font-semibold text-primary mb-2">
              {t("home.feature_control")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("home.feature_control_desc")}
            </p>
          </div>

          <div className="p-6 border border-border rounded-2xl bg-surface shadow-sm">
            <h3 className="font-semibold text-primary mb-2">
              {t("home.feature_security")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("home.feature_security_desc")}
            </p>
          </div>
        </motion.div>

        <Button
          size="lg"
          onClick={goToLogin}
          className="px-8 py-4 text-lg cursor-pointer"
        >
          {authChecking
            ? t("home.loading")
            : serverConnecting
            ? t("home.connecting_server")
            : t("home.access")}
        </Button>
      </section>

      <footer className="text-center py-4 border-t border-border text-sm text-muted-foreground">
        © 2025 Finansys — {t("home.footer")}
      </footer>
    </main>
  );
}
