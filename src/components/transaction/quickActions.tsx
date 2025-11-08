"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TransactionType } from "@/enum/transationEnums";
import { Plus, Minus } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import TransactionForm from "./transactionForm";
import { Button } from "../ui/button";

interface QuickActionsProps {
  userId: string;
}

export function QuickActions({ userId }: QuickActionsProps) {
  const { t } = useI18n();
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);

  return (
    <motion.section className="flex flex-col sm:flex-row gap-4">
      {/* Income Modal */}
      <Dialog open={isIncomeOpen} onOpenChange={setIsIncomeOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto cursor-pointer">
            <Plus className="h-4 w-4" />
            {t("transactions.addIncome")}
          </Button>
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
          <Button variant="secondary" className="w-full sm:w-auto cursor-pointer">
            <Minus className="h-4 w-4" />
            {t("transactions.addExpense")}
          </Button>
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
