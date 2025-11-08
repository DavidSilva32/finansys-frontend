"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { TransactionStatus, TransactionType } from "@/enum/transationEnums";
import {
  CreateTransactionDTO,
  Transaction,
  UpdateTransactionDTO,
} from "@/types/transaction";
import { useUpdateTransaction } from "@/hooks/useUpdateTransaction";
import { handleToast } from "@/lib/toast";
import { useI18n } from "@/context/I18nContext";

const formSchema = z.object({
  type: z.enum(TransactionType),
  category: z.string().min(1, "Informe a categoria"),
  description: z.string().optional(),
  amount: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Informe o valor")
  ),
  date: z.string().min(1, "Informe a data"),
  status: z.enum(TransactionStatus),
});

interface TransactionFormProps {
  transaction?: Transaction;
  userId?: string;
  defaultType?: TransactionType;
  onSuccess?: () => void;
}

export default function TransactionForm({
  transaction,
  userId = "",
  defaultType = TransactionType.INCOME,
  onSuccess,
}: TransactionFormProps) {
  const { createTransaction, loading: creating } = useCreateTransaction();
  const { updateTransaction, loading: updating } = useUpdateTransaction();
  const { t } = useI18n();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: transaction
      ? {
          type: transaction.type,
          category: transaction.category,
          description: transaction.description,
          amount: transaction.amount,
          date: transaction.date,
          status: transaction.status,
        }
      : {
          type: defaultType,
          category: "",
          description: "",
          amount: 0,
          date: "",
          status: TransactionStatus.PENDING,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const basePayload = { ...values };

    if (transaction) {
      const payload: UpdateTransactionDTO = { ...basePayload };
      const result = await updateTransaction(transaction.id, payload);
      handleToast(result);
    } else {
      const payload: CreateTransactionDTO = { ...basePayload, userId };
      const result = await createTransaction(payload);
      handleToast(result);
      form.reset({ ...form.getValues(), type: defaultType });
    }

    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-card p-6 rounded-xl shadow-md border border-border"
      >
        <h2 className="text-lg font-semibold text-center mb-4">
          {transaction
            ? t("transactions.form.editTitle")
            : t("transactions.form.newTitle")}
        </h2>

        {/* Tipo */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("transactions.form.typeLabel")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("transactions.form.typePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TransactionType.INCOME}>
                      {t("transactions.form.typeIncome")}
                    </SelectItem>
                    <SelectItem value={TransactionType.EXPENSE}>
                      {t("transactions.form.typeExpense")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categoria */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("transactions.form.categoryLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("transactions.form.categoryPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descrição */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("transactions.form.descriptionLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("transactions.form.descriptionPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Valor */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("transactions.form.amountLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder={t("transactions.form.amountPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Data */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("transactions.form.dateLabel")}</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("transactions.form.statusLabel")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("transactions.form.statusPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TransactionStatus.PENDING}>
                      {t("transactions.status.pending")}
                    </SelectItem>
                    <SelectItem value={TransactionStatus.COMPLETED}>
                      {t("transactions.status.completed")}
                    </SelectItem>
                    <SelectItem value={TransactionStatus.CANCELLED}>
                      {t("transactions.status.cancelled")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={creating || updating}
          className="w-full"
        >
          {creating || updating
            ? t("transactions.form.saving")
            : transaction
            ? t("transactions.form.saveChanges")
            : t("transactions.form.createTransaction")}
        </Button>
      </form>
    </Form>
  );
}
