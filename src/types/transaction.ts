import { TransactionType } from "@/enum/transationType";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  description?: string;
  amount: string;
  date: string;
  status: string;
}

export interface TransactionCardProps {
  type: TransactionType;
  category: string;
  description?: string;
  amount: string;
  date: string;
}

export interface SummaryCardProps {
  title: string;
  value: string;
  valueColor?: string;
}