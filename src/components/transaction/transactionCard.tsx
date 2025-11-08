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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatLocalizedDate } from "@/lib/date";

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
  const { t, locale } = useI18n();
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
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`${isIncome ? "border-green-300" : "border-red-300"}`}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MoreHorizontal className="size-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>
                    <Edit className="size-4 mr-2" />{" "}
                    {t("transactions.card.edit")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setIsDeleteOpen(true)}>
                    <Trash className="size-4 mr-2" />{" "}
                    {t("transactions.card.remove")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>

          <CardContent className="flex flex-col gap-1">
            {description && <CardDescription>{description}</CardDescription>}
            <p className="text-xs text-muted-foreground">
              {formatLocalizedDate(date, locale)}
            </p>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor} w-auto max-w-max`}
            >
              {t(`transactions.status.${status.toLowerCase()}`)}
            </span>
          </CardContent>

          <CardFooter className="justify-between">
            <span
              className={
                isIncome
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              {isIncome ? `+ ${amount}` : `- ${amount}`}
            </span>
          </CardFooter>
        </Card>
      </motion.li>

      {/* Modal de confirmação */}
      {isDeleteOpen && (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogTitle>
              {t("transactions.card.confirmRemoveTitle")}
            </DialogTitle>
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
          <DialogContent className="sm:max-w-[500px]">
            <DialogTitle>
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
