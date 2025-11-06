"use client";

import { Button } from "@/components/ui/button";
import { QuickActionButton } from "@/components/quickActionButton";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import {
  DollarSign,
  FileText,
  Loader2,
  LogOut,
  Minus,
  Plus,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { SummaryCard } from "@/components/summaryCard";
import { useI18n } from "@/context/I18nContext";

interface ModuleButtonProps {
  icon: React.ElementType;
  title: string;
}

export default function Dashboard() {
  const { t } = useI18n();
  const { isAuthenticated, isChecking } = useAuthCheck();

  const authToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const formattedToken = useMemo(() => {
    return authToken ? authToken.substring(0, 15) + "..." : "N/A";
  }, [authToken]);

  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Loading authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const mockData = {
    totalRevenue: "R$ 52.300,00",
    totalExpenses: "R$ 18.900,00",
    currentBalance: "R$ 33.400,00",
  };

  return (
    <div className="bg-background min-h-screen">
      <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-card-foreground">
          {t("dashboard.title")}
        </h2>

        <section
          aria-labelledby="summary-heading"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <h2 id="summary-heading" className="sr-only"></h2>

          <SummaryCard
            title={t("dashboard.revenue.title")}
            value={mockData.totalRevenue}
            description={t("dashboard.revenue.description")}
            icon={TrendingUp}
            valueColor="text-green-500"
          />

          <SummaryCard
            title={t("dashboard.expenses.title")}
            value={mockData.totalExpenses}
            description={t("dashboard.expenses.description")}
            icon={TrendingDown}
            valueColor="text-red-500"
          />

          <SummaryCard
            title={t("dashboard.balance.title")}
            value={mockData.currentBalance}
            description={t("dashboard.balance.description")}
            icon={DollarSign}
            className="md:col-span-2 lg:col-span-1"
            valueColor={
              parseFloat(
                mockData.currentBalance
                  .replace(/[^\d,-]/g, "")
                  .replace(",", ".")
              ) > 0
                ? "text-primary"
                : "text-red-500"
            }
          />
        </section>

        <section
          aria-labelledby="quick-actions-heading"
          className="flex flex-col sm:flex-row gap-4"
        >
          <h2 id="quick-actions-heading" className="sr-only">
            Quick Actions
          </h2>
          <QuickActionButton
            title={t("dashboard.actions.addRevenue")}
            icon={Plus}
          />
          <QuickActionButton
            title={t("dashboard.actions.addExpense")}
            variant="secondary"
            icon={Minus}
          />
        </section>

        <section
          aria-labelledby="data-view-heading"
          className="grid gap-6 lg:grid-cols-3"
        >
          <h2 id="data-view-heading" className="sr-only">
            Detailed Financial Data
          </h2>

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
              <li className="flex justify-between items-center text-green-500">
                Service Sale <span className="font-semibold">+ R$ 500,00</span>
              </li>
              <li className="flex justify-between items-center text-red-500">
                Office Rent <span className="font-semibold">- R$ 3.000,00</span>
              </li>
              <li className="flex justify-between items-center text-green-500">
                Product Sale{" "}
                <span className="font-semibold">+ R$ 1.200,00</span>
              </li>
              <li className="flex justify-between items-center text-red-500">
                Utility Bill <span className="font-semibold">- R$ 450,00</span>
              </li>
              <li className="text-muted-foreground pt-2">... more ...</li>
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="module-nav-heading"
          className="border-t border-border pt-6 mt-8"
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
            <ModuleButton
              icon={Users}
              title={t("dashboard.modules.clients")}
            />
            <ModuleButton
              icon={LogOut}
              title={t("dashboard.modules.multiusers")}
            />
            <ModuleButton
              icon={DollarSign}
              title={t("dashboard.modules.settings")}
            />
          </div>
        </section>

        <footer className="mt-8 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            {t("dashboard.footer.authStatus")}: Authenticated | Token Preview:{" "}
            <code className="break-all">{formattedToken}</code>
          </p>
        </footer>
      </main>
    </div>
  );
}

const ModuleButton: React.FC<ModuleButtonProps> = ({ icon: Icon, title }) => (
  <Button
    variant="outline"
    className="flex flex-col h-24 p-2 justify-center items-center"
  >
    <Icon className="h-6 w-6 text-primary mb-1" />
    <span className="text-sm font-medium text-center">{title}</span>
  </Button>
);
