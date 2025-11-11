"use client";

import { motion } from "framer-motion";
import { useTransactions } from "@/hooks/transaction/useTransctions";
import { TransactionSummaryCard } from "@/components/transaction/transactionSummaryCard";
import { TransactionCard } from "@/components/transaction/transactionCard";
import { decodeTokenPayload } from "@/lib/authUtils";
import { useI18n } from "@/context/I18nContext";
import { QuickActions } from "@/components/transaction/quickActions";
import { handleToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function TransactionsPage() {
  const accessToken = localStorage.getItem("accessToken");
  const userId = accessToken ? decodeTokenPayload(accessToken)?.sub : null;
  const {
    transactions,
    loading,
    totalRevenue,
    totalExpenses,
    currentBalance,
    fetchTransactions,
  } = useTransactions(userId);
  const { t } = useI18n();

  async function handleRefresh() {
    const result = await fetchTransactions();
    handleToast(result);
  }

  return (
    <motion.main
      className="bg-background min-h-screen p-4 md:p-6 lg:p-8"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold mb-6">{t("transactions.title")}</h2>

      {/* Summary Section */}
      <motion.section
        className="grid gap-4 md:grid-cols-3 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TransactionSummaryCard
          title={t("transactions.income")}
          value={`R$ ${totalRevenue.toFixed(2)}`}
          valueColor="text-green-500"
        />
        <TransactionSummaryCard
          title={t("transactions.expenses")}
          value={`R$ ${totalExpenses.toFixed(2)}`}
          valueColor="text-red-500"
        />
        <TransactionSummaryCard
          title={t("transactions.balance")}
          value={`R$ ${currentBalance.toFixed(2)}`}
          valueColor={currentBalance >= 0 ? "text-primary" : "text-red-500"}
        />
      </motion.section>

      {/* Quick Actions Section */}
      <motion.section
        className="flex flex-col md:flex-row justify-between items-center mb-6 w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-full md:w-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <QuickActions userId={userId} />
        </motion.div>

        <div className="hidden md:flex">
          <Button
            className="cursor-pointer"
            onClick={handleRefresh}
            size="sm"
            variant="default"
            disabled={loading}
          >
            <Loader
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            {t("transactions.refresh")}
          </Button>
        </div>
      </motion.section>

      {/* Transaction List Section */}
      <motion.section
        className="bg-card p-6 rounded-xl shadow-lg border border-border"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          {t("transactions.listTitle")}
        </h3>

        {loading ? (
          <p>{t("transactions.loading")}</p>
        ) : transactions.length === 0 ? (
          <p className="text-muted-foreground italic">
            {t("transactions.noTransactions")}
          </p>
        ) : (
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {transactions.map((tx) => (
              <TransactionCard key={tx.id} {...tx} />
            ))}
          </motion.ul>
        )}
      </motion.section>
    </motion.main>
  );
}
