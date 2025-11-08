import { FetchResult } from "@/types/transaction";
import { toast } from "sonner";

export function handleToast(result: FetchResult) {
  const isSuccess = result.status >= 200 && result.status < 300;
  isSuccess ? toast.success(result.message) : toast.error(result.message);
}