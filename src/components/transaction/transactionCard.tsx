"use client";

import * as React from "react";
import { Transaction } from "@/types/transaction";
import { motion } from "framer-motion";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";
import { Button } from "../ui/button";
import TransactionForm from "./transactionForm";
import { useI18n } from "@/context/I18nContext";
import { handleToast } from "@/lib/toast";

export const TransactionCard: React.FC<Transaction> = ({
  id,
  type,
  category,
  description,
  amount,
  date,
  status,
  userId,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const { deleteTransaction, loading } = useDeleteTransaction();
  const { t } = useI18n();
  const isIncome = type === "INCOME";

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  }[status];

  const handleDelete = async () => {
    const result = await deleteTransaction(id);
    handleToast(result);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <motion.li
        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg shadow-sm border
        ${isIncome ? "border-green-300" : "border-red-300"} w-full`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Conteúdo principal */}
        <div className="flex flex-col sm:flex-1 gap-1">
          <p className="font-medium">{category}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {new Date(date).toLocaleDateString()}
          </p>
          <span
            className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${statusColor}`}
          >
            {t(`transactions.status.${status.toLowerCase()}`)}
          </span>
        </div>

        {/* Valor + Ações */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span
            className={
              isIncome
                ? "text-green-500 font-semibold"
                : "text-red-500 font-semibold"
            }
          >
            {isIncome ? `+ ${amount}` : `- ${amount}`}
          </span>

          {/* Dropdown de ações */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <MoreHorizontal className="size-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>
                <Edit className="size-4 mr-2" /> {t("transactions.card.edit")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setIsDeleteOpen(true)}>
                <Trash className="size-4 mr-2" /> {t("transactions.card.remove")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.li>

      {/* Modal de confirmação */}
      {isDeleteOpen && (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogTitle>{t("transactions.card.confirmRemoveTitle")}</DialogTitle>
            <p>{t("transactions.card.confirmRemoveText")}</p>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsDeleteOpen(false)}
              >
                {t("transactions.card.cancel")}
              </Button>
              <Button onClick={handleDelete} disabled={loading}>
                {loading
                  ? t("transactions.card.removing")
                  : t("transactions.card.removeConfirm")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de edição */}
      {isEditOpen && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogTitle className="sr-only">
              {t("transactions.card.edit")}
            </DialogTitle>
            <TransactionForm
              transaction={{
                id,
                type,
                category,
                description,
                amount,
                date,
                status,
                userId,
              }}
              defaultType={type as any}
              onSuccess={() => setIsEditOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
