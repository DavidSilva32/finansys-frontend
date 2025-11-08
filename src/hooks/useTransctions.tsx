import { useEffect, useState, useCallback } from "react";
import { ApiRoutes } from "@/enum/apiRoutes";
import { FetchResult, Transaction } from "@/types/transaction";
import { ApiResponse } from "@/types/apiResponse";
import { TransactionType } from "@/enum/transationEnums";

export function useTransactions(userId?: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async (): Promise<FetchResult> => {
    setLoading(true);
    try {
      const res = await fetch(
        `${ApiRoutes.TRANSACTIONS.LIST}?userId=${userId}`
      );
      const data: ApiResponse<Transaction[]> = await res.json();

      if (res.ok && data.payload) {
        setTransactions(data.payload);
        return { message: data.message, status: res.status };
      } else {
        setTransactions([]);
        return {
          message: data.message || "Erro ao carregar transações",
          status: res.status,
        };
      }
    } catch (error: any) {
      setTransactions([]);
      return { message: error.message || "Erro de conexão", status: 500 };
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchTransactions();
  }, [userId, fetchTransactions]);

  const totalRevenue = transactions
    .filter((t) => t.type === TransactionType.INCOME)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((acc, t) => acc + t.amount, 0);

  const currentBalance = totalRevenue - totalExpenses;

  return {
    transactions,
    loading,
    totalRevenue,
    totalExpenses,
    currentBalance,
    fetchTransactions, // 👈 retorna pra você usar manualmente
  };
}
