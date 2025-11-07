export interface Transaction {
  id: string;
  type: "INCOME" | "EXPENSE";
  category: string;
  description?: string;
  amount: string;
  date: string;
  status: string;
}

export interface TransactionCardProps {
  type: "INCOME" | "EXPENSE";
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