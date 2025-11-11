import { useEffect, useState, useCallback, useMemo } from "react";
import { ApiRoutes } from "@/enum/apiRoutes";
import { FetchResult, Transaction } from "@/types/transaction";
import { ApiResponse } from "@/types/apiResponse";
import { TransactionType } from "@/enum/transationEnums";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async (): Promise<FetchResult> => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    
    try {
      const res = await fetch(ApiRoutes.TRANSACTIONS.LIST, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data: ApiResponse<Transaction[]> = await res.json();

      if (!res.ok || !data.payload)
        throw new Error(data.message || "Erro ao carregar transações");

      setTransactions(data.payload);
      return { message: data.message, status: res.status };
    } catch (error: any) {
      setTransactions([]);
      return { message: error.message || "Erro de conexão", status: 500 };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) fetchTransactions();
  }, [fetchTransactions]);

  const totalRevenue = useMemo(
    () =>
      transactions
        .filter((t) => t.type === TransactionType.INCOME)
        .reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === TransactionType.EXPENSE)
        .reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );

  const currentBalance = totalRevenue - totalExpenses;

  return {
    transactions,
    loading,
    totalRevenue,
    totalExpenses,
    currentBalance,
    fetchTransactions,
  };
}
