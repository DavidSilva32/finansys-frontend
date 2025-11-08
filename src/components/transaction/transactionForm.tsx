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
import { Transaction } from "@/types/transaction";

const formSchema = z.object({
  type: z.enum(TransactionType),
  category: z.string().min(1, "Informe a categoria"),
  description: z.string().optional(),
  amount: z.number().min(1, "Informe o valor"),
  date: z.string().min(1, "Informe a data"),
  status: z.enum(TransactionStatus),
});

interface TransactionFormProps {
  defaultType?: TransactionType;
  userId: string;
  onSuccess?: () => void;
}

export default function TransactionForm({
    defaultType = TransactionType.INCOME,
    userId,
    onSuccess
}: TransactionFormProps) {
  const { createTransaction, loading } = useCreateTransaction();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: defaultType,
      category: "",
      description: "",
      amount: 0,
      date: "",
      status: TransactionStatus.PENDING,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload: Omit<Transaction, "id"> = {
    ...values,
    userId,
  };
    await createTransaction(payload);
    form.reset({ ...form.getValues(), type: defaultType });
    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-card p-6 rounded-xl shadow-md border border-border"
      >
        <h2 className="text-lg font-semibold text-center mb-4">
          Nova Transação
        </h2>

        {/* Tipo */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TransactionType.INCOME}>Entrada</SelectItem>
                    <SelectItem value={TransactionType.EXPENSE}>Saída</SelectItem>
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
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Alimentação, Salário..." {...field} />
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
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Opcional" {...field} />
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
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0,00" {...field} />
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
              <FormLabel>Data</FormLabel>
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
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TransactionStatus.PENDING}>Pendente</SelectItem>
                    <SelectItem value={TransactionStatus.COMPLETED}>Concluída</SelectItem>
                    <SelectItem value={TransactionStatus.CANCELLED}>Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Salvando..." : "Criar Transação"}
        </Button>
      </form>
    </Form>
  );
}
