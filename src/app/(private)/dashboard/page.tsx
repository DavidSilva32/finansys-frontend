"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuickActionButton } from "@/components/dashboard/quickActionButton";
import {
  DollarSign,
  FileText,
  LogOut,
  Minus,
  Plus,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { SummaryCard } from "@/components/dashboard/summaryCard";
import { useI18n } from "@/context/I18nContext";
import { useTransactions } from "@/hooks/useTransctions";
import { decodeTokenPayload } from "@/lib/authUtils";
import {useRouter} from "next/navigation";
import { QuickActions } from "@/components/transaction/quickActions";

interface ModuleButtonProps {
  icon: React.ElementType;
  title: string;
}

export default function Dashboard() {
  const { t } = useI18n();
  const router = useRouter()

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const formattedToken = useMemo(() => {
    return accessToken ? accessToken.substring(0, 15) + "..." : "N/A";
  }, [accessToken]);

  const userId = accessToken ? decodeTokenPayload(accessToken)?.sub : null;
  const { transactions, totalRevenue, totalExpenses, currentBalance, loading } =
    useTransactions(userId);

  const formattedRevenue = `R$ ${totalRevenue.toFixed(2)}`;
  const formattedExpenses = `R$ ${totalExpenses.toFixed(2)}`;
  const formattedBalance = `R$ ${currentBalance.toFixed(2)}`;

  return (
    <motion.div
      className="bg-background min-h-screen"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <main className="p-4 md:p-6 lg:p-8 w-full space-y-8">
        <motion.h2
          className="text-3xl font-bold text-card-foreground"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {t("dashboard.title")}
        </motion.h2>

        {/* Summary Cards */}
        <motion.section
          aria-labelledby="summary-heading"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {i === 0 && (
                <SummaryCard
                  title={t("dashboard.revenue.title")}
                  value={formattedRevenue}
                  description={t("dashboard.revenue.description")}
                  icon={TrendingUp}
                  valueColor="text-green-500"
                />
              )}
              {i === 1 && (
                <SummaryCard
                  title={t("dashboard.expenses.title")}
                  value={formattedExpenses}
                  description={t("dashboard.expenses.description")}
                  icon={TrendingDown}
                  valueColor="text-red-500"
                />
              )}
              {i === 2 && (
                <SummaryCard
                  title={t("dashboard.balance.title")}
                  value={formattedBalance}
                  description={t("dashboard.balance.description")}
                  icon={DollarSign}
                  valueColor={
                    parseFloat(
                      formattedBalance.replace(/[^\d,-]/g, "").replace(",", ".")
                    ) > 0
                      ? "text-primary"
                      : "text-red-500"
                  }
                />
              )}
            </motion.div>
          ))}
        </motion.section>

        {/* Quick Actions */}
        <QuickActions userId={userId} />

        {/* Data sections */}
        <motion.section
          aria-labelledby="data-view-heading"
          className="grid gap-6 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="bg-card p-6 rounded-xl shadow-lg border border-border lg:col-span-2 h-96">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              {t("dashboard.cashflow.title")}
            </h3>
            <div className="text-muted-foreground italic h-full flex items-center justify-center">
              <p>{t("dashboard.cashflow.placeholder")}</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-lg border border-border h-96">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              {t("dashboard.transactions.title")}
            </h3>
            <ul className="space-y-3 text-sm">
              {loading ? (
                <li>{t("dashboard.transactions.loading")}</li>
              ) : transactions.length === 0 ? (
                <li className="text-muted-foreground italic">
                  {t("dashboard.transactions.noTransactions")}
                </li>
              ) : (
                transactions.slice(0, 5).map((tx) => (
                  <li
                    key={tx.id}
                    className={`flex justify-between items-center ${
                      tx.type === "INCOME" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {tx.description}{" "}
                    <span className="font-semibold">
                      {tx.type === "INCOME" ? "+" : "-"} R${" "}
                      {tx.amount.toFixed(2)}
                    </span>
                  </li>
                ))
              )}
            </ul>
            <div className="mt-2 flex justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push("/transactions")}
              >
                {t("dashboard.transactions.viewAll")}
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Modules */}
        <motion.section
          aria-labelledby="module-nav-heading"
          className="border-t border-border pt-6 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2
            id="module-nav-heading"
            className="text-xl font-semibold text-card-foreground mb-4"
          >
            {t("dashboard.modules.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ModuleButton
              icon={FileText}
              title={t("dashboard.modules.reports")}
            />
            <ModuleButton icon={Users} title={t("dashboard.modules.clients")} />
            <ModuleButton
              icon={LogOut}
              title={t("dashboard.modules.multiusers")}
            />
            <ModuleButton
              icon={DollarSign}
              title={t("dashboard.modules.settings")}
            />
          </div>
        </motion.section>

        <motion.footer
          className="mt-8 pt-4 border-t border-border text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-xs text-muted-foreground">
            {t("dashboard.footer.authStatus")}: Authenticated | Token Preview:{" "}
            <code className="break-all">{formattedToken}</code>
          </p>
        </motion.footer>
      </main>
    </motion.div>
  );
}

const ModuleButton: React.FC<ModuleButtonProps> = ({ icon: Icon, title }) => {
  const MotionButton = motion.create(Button);

  return (
    <MotionButton
      variant="outline"
      className="flex flex-col h-24 p-2 justify-center items-center relative overflow-hidden"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      <div className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100" />
      <Icon className="h-6 w-6 text-primary mb-1" />
      <span className="text-sm font-medium text-center">{title}</span>
    </MotionButton>
  );
};
