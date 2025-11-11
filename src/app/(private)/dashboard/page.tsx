"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  FileText,
  LogOut,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { SummaryCard } from "@/components/dashboard/summaryCard";
import { useI18n } from "@/context/I18nContext";
import { useTransactions } from "@/hooks/transaction/useTransctions";
import { useRouter } from "next/navigation";
import { QuickActions } from "@/components/transaction/quickActions";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ModuleButtonProps {
  icon: React.ElementType;
  title: string;
}

export default function Dashboard() {
  const { t } = useI18n();
  const router = useRouter();

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const formattedToken = useMemo(() => {
    return accessToken ? accessToken.substring(0, 15) + "..." : "N/A";
  }, [accessToken]);

  const { transactions, totalRevenue, totalExpenses, currentBalance, loading } =
    useTransactions();

  const formattedRevenue = `$${totalRevenue.toFixed(2)}`;
  const formattedExpenses = `$${totalExpenses.toFixed(2)}`;
  const formattedBalance = `$${currentBalance.toFixed(2)}`;

  const chartData = useMemo(() => {
    const grouped: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const key = `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
      if (!grouped[key]) grouped[key] = { income: 0, expense: 0 };
      if (tx.type === "INCOME") grouped[key].income += tx.amount;
      else grouped[key].expense += tx.amount;
    });

    return Object.entries(grouped)
      .map(([date, values]) => ({ date, ...values }))
      .sort((a, b) => {
        const numA = Number(a.date.split("/").reverse().join(""));
        const numB = Number(b.date.split("/").reverse().join(""));
        return numA - numB;
      });
  }, [transactions]);

  const motionProps = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4 },
  };

  return (
    <motion.div className="bg-background min-h-screen">
      <main className="p-4 md:p-6 lg:p-8 w-full space-y-8">
        <motion.h2
          className="text-3xl font-bold text-card-foreground"
          {...motionProps}
        >
          {t("dashboard.title")}
        </motion.h2>

        {/* Summary Cards */}
        <motion.section
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          {...motionProps}
        >
          <SummaryCard
            title={t("dashboard.revenue.title")}
            value={formattedRevenue}
            description={t("dashboard.revenue.description")}
            icon={TrendingUp}
            valueColor="text-green-500"
          />
          <SummaryCard
            title={t("dashboard.expenses.title")}
            value={formattedExpenses}
            description={t("dashboard.expenses.description")}
            icon={TrendingDown}
            valueColor="text-red-500"
          />
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
        </motion.section>

        {/* Quick Actions */}
        <motion.section {...motionProps}>
          <QuickActions  />
        </motion.section>

        {/* Data Sections */}
        <motion.section className="grid gap-6 lg:grid-cols-3" {...motionProps}>
          {/* Cash Flow */}
          <motion.section
            className="bg-card p-6 rounded-xl shadow-lg border border-border lg:col-span-2 flex flex-col w-full min-w-0"
            aria-label={t("dashboard.cashflow.title")}
            {...motionProps}
          >
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              {t("dashboard.cashflow.title")}
            </h3>

            {chartData.length === 0 ||
            chartData.every((d) => d.income === 0 && d.expense === 0) ? (
              <p className="text-center text-muted-foreground mt-20">
                {t("dashboard.cashflow.noData")}
              </p>
            ) : (
              <ChartContainer
                id="cashflow"
                config={{
                  income: { label: "Income", color: "#22c55e" },
                  expense: { label: "Expense", color: "#ef4444" },
                }}
                className="flex-1 w-full h-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]min-w-[260px]"
              >
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
                  className="w-full h-full"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltipContent />
                  <ChartLegendContent />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#22c55e"
                    fill="#dcfce7"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#ef4444"
                    fill="#fee2e2"
                  />
                </AreaChart>
              </ChartContainer>
            )}
          </motion.section>

          {/* Recent Transactions */}
          <motion.aside
            className="bg-card p-6 rounded-xl shadow-lg border border-border flex flex-col w-full min-w-0"
            aria-label={t("dashboard.transactions.title")}
            {...motionProps}
          >
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              {t("dashboard.transactions.title")}
            </h3>
            <ul className="space-y-3 text-sm overflow-y-auto flex-1">
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
                      {tx.type === "INCOME" ? "+" : "-"} ${tx.amount.toFixed(2)}
                    </span>
                  </li>
                ))
              )}
            </ul>
            <div className="mt-2 flex justify-end">
              <Button
                className="cursor-pointer"
                size="sm"
                variant="outline"
                onClick={() => router.push("/transactions")}
              >
                {t("dashboard.transactions.viewAll")}
              </Button>
            </div>
          </motion.aside>
        </motion.section>

        {/* Modules */}
        <motion.section
          className="border-t border-border pt-6 mt-8"
          aria-label={t("dashboard.modules.title")}
          {...motionProps}
        >
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            {t("dashboard.modules.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ModuleButton icon={FileText} title="Reports" />
            <ModuleButton icon={Users} title="Clients" />
            <ModuleButton icon={LogOut} title="Multiusers" />
            <ModuleButton icon={DollarSign} title="Settings" />
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="mt-8 pt-4 border-t border-border text-center"
          {...motionProps}
        >
          <p className="text-xs text-muted-foreground">
            {t("dashboard.footer.authStatus")}:{" "}
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
