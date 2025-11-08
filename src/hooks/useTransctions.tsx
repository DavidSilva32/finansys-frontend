import { useEffect, useState } from "react";
import { ApiRoutes } from "@/enum/apiRoutes";
import { Transaction } from "@/types/transaction";
import { toast } from "sonner";
import { ApiResponse } from "@/types/apiResponse";
import { TransactionType } from "@/enum/transationEnums";

export function useTransactions(userId: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      try {
        const res = await fetch(
          `${ApiRoutes.TRANSACTIONS.LIST}?userId=${userId}`
        );
        const data: ApiResponse<Transaction[]> = await res.json();
        setTransactions(data.payload || []);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchTransactions();
  }, [userId]);

  const totalRevenue = transactions
    .filter((t) => t.type === TransactionType.INCOME)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((acc, t) => acc + t.amount, 0);

  const currentBalance = totalRevenue - totalExpenses;

  return { transactions, loading, totalRevenue, totalExpenses, currentBalance };
}
