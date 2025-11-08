import { useState } from "react";
import { ApiResponse } from "@/types/apiResponse";
import { Transaction, UpdateTransactionDTO } from "@/types/transaction";
import { ApiRoutes } from "@/enum/apiRoutes";
import { toast } from "sonner";

export function useUpdateTransaction() {
  const [loading, setLoading] = useState(false);

  const updateTransaction = async (id: string, data: UpdateTransactionDTO) => {
    setLoading(true);
    try {
        console.log(data)
      const res = await fetch(`${ApiRoutes.TRANSACTIONS.UPDATE(id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<Transaction> = await res.json();

      if (!res.ok)
        throw new Error(result.message || "Failed to create transaction");

      toast.success(result.message);
      setLoading(false);
      return result.payload;
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return { updateTransaction, loading };
}
