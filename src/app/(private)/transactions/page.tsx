"use client";

import { motion } from "framer-motion";
import { QuickActionButton } from "@/components/dashboard/quickActionButton";
import { Plus, Minus } from "lucide-react";
import { useTransactions } from "@/hooks/useTransctions";
import { TransactionSummaryCard } from "@/components/transaction/transactionSummaryCard";
import { TransactionCard } from "@/components/transaction/transactionCard";
import { decodeTokenPayload } from "@/lib/authUtils";
import { useI18n } from "@/context/I18nContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import TransactionForm from "@/components/transaction/transactionForm";
import { TransactionType } from "@/enum/transationEnums";
import { QuickActions } from "@/components/transaction/quickActions";

export default function TransactionsPage() {
  const accessToken = localStorage.getItem("accessToken");
  const userId = accessToken ? decodeTokenPayload(accessToken)?.sub : null;
  const { transactions, loading, totalRevenue, totalExpenses, currentBalance } =
    useTransactions(userId);
  const { t } = useI18n();

  return (
    <motion.div
      className="bg-background min-h-screen p-4 md:p-6 lg:p-8"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold mb-6">{t("transactions.title")}</h2>

      {/* Summary */}
      <motion.section className="grid gap-4 md:grid-cols-3 mb-6">
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

      {/* Quick Actions with Modal */}
      <QuickActions userId={userId} />

      {/* Transaction List */}
      <motion.section className="bg-card p-6 rounded-xl shadow-lg border border-border">
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
          <ul className="space-y-3">
            {transactions.map((tx) => (
              <TransactionCard key={tx.id} {...tx} />
            ))}
          </ul>
        )}
      </motion.section>
    </motion.div>
  );
}
