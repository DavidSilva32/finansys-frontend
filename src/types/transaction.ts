import { TransactionStatus, TransactionType } from "@/enum/transationEnums";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  description?: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  userId: string
}

export interface TransactionCardProps {
  type: TransactionType;
  category: string;
  description?: string;
  amount: number;
  date: string;
  status: TransactionStatus;
}

export interface SummaryCardProps {
  title: string;
  value: string;
  valueColor?: string;
}

export interface CreateTransactionDTO extends Omit<Transaction, "id"> {}

export type UpdateTransactionDTO = Partial<Omit<Transaction, "id" | "userId">>;
