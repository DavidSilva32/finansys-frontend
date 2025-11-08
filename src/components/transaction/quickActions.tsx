"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionType } from "@/enum/transationEnums";
import { Plus, Minus } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import { QuickActionButton } from "../dashboard/quickActionButton";
import TransactionForm from "./transactionForm";

interface QuickActionsProps {
  userId: string;
}

export function QuickActions({ userId }: QuickActionsProps) {
  const { t } = useI18n();
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);

  return (
    <motion.section
      className="flex flex-col sm:flex-row gap-4"
    >
      {/* Income Modal */}
      <Dialog open={isIncomeOpen} onOpenChange={setIsIncomeOpen}>
        <DialogTrigger asChild>
          <QuickActionButton
            title={t("transactions.addIncome")}
            icon={Plus}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Receita</DialogTitle>
          </DialogHeader>
          <TransactionForm
            defaultType={TransactionType.INCOME}
            userId={userId}
            onSuccess={() => setIsIncomeOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Expense Modal */}
      <Dialog open={isExpenseOpen} onOpenChange={setIsExpenseOpen}>
        <DialogTrigger asChild>
          <QuickActionButton
            title={t("transactions.addExpense")}
            icon={Minus}
            variant="secondary"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Despesa</DialogTitle>
          </DialogHeader>
          <TransactionForm
            defaultType={TransactionType.EXPENSE}
            userId={userId}
            onSuccess={() => setIsExpenseOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </motion.section>
  );
}
