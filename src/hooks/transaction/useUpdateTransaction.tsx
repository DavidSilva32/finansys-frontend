import { useState } from "react";
import { ApiResponse } from "@/types/apiResponse";
import { Transaction, UpdateTransactionDTO } from "@/types/transaction";
import { ApiRoutes } from "@/enum/apiRoutes";

export function useUpdateTransaction() {
  const [loading, setLoading] = useState(false);

  const updateTransaction = async (id: string, data: UpdateTransactionDTO) => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    
    try {
      const res = await fetch(`${ApiRoutes.TRANSACTIONS.UPDATE(id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
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

  return { updateTransaction, loading };
}
