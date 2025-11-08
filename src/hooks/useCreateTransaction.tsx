import { useState } from "react";
import { ApiResponse } from "@/types/apiResponse";
import { CreateTransactionDTO, Transaction } from "@/types/transaction";
import { ApiRoutes } from "@/enum/apiRoutes";

export function useCreateTransaction() {
  const [loading, setLoading] = useState(false);

  const createTransaction = async (data: CreateTransactionDTO) => {
    setLoading(true);
    try {
        console.log(data)
      const res = await fetch(`${ApiRoutes.TRANSACTIONS.CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<Transaction> = await res.json();

      if (!res.ok)
        throw new Error(result.message || "Failed to create transaction");

      setLoading(false);
      return {message: result.message, status: result.status};
    } catch (error: any) {
      setLoading(false);
      return { message: error.message || "Erro ao atualizar transação", status: 500 };
    }
  };

  return { createTransaction, loading };
}
