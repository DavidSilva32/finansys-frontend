// hooks/useDeleteTransaction.ts
"use client";

import { ApiRoutes } from "@/enum/apiRoutes";
import { ApiResponse } from "@/types/apiResponse";
import { Transaction } from "@/types/transaction";
import { useState } from "react";
import { toast } from "sonner";

export function useDeleteTransaction() {
  const [loading, setLoading] = useState(false);

  const deleteTransaction = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${ApiRoutes.TRANSACTIONS.DELETE(id)}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result: ApiResponse<Transaction> = await response.json();

      if (!response.ok) throw new Error(result.message);

      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteTransaction, loading };
}
