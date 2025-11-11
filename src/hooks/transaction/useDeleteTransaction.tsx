"use client";

import { ApiRoutes } from "@/enum/apiRoutes";
import { ApiResponse } from "@/types/apiResponse";
import { Transaction } from "@/types/transaction";
import { useState } from "react";

export function useDeleteTransaction() {
  const [loading, setLoading] = useState(false);

  const deleteTransaction = async (id: string) => {
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken")

    try {
      const response = await fetch(`${ApiRoutes.TRANSACTIONS.DELETE(id)}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      });

      const result: ApiResponse<Transaction> = await response.json();

      if (!response.ok) throw new Error(result.message);

      return {message: result.message, status: result.status};
    } catch (error: any) {
      setLoading(false);
      return { message: error.message || "Erro ao deletar transação", status: 500 };
    }
  };

  return { deleteTransaction, loading };
}
