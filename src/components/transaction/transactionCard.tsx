"use client";

import { TransactionCardProps } from "@/types/transaction";
import { motion } from "framer-motion";

export const TransactionCard: React.FC<TransactionCardProps> = ({
  type,
  category,
  description,
  amount,
  date,
}) => {
  const isIncome = type === "INCOME";

  return (
    <motion.li
      className={`flex justify-between items-center p-4 rounded-lg shadow-sm border ${
        isIncome ? "border-green-300" : "border-red-300"
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <p className="font-medium">{category}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        <p className="text-xs text-muted-foreground">{new Date(date).toLocaleDateString()}</p>
      </div>
      <span className={isIncome ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
        {isIncome ? `+ ${amount}` : `- ${amount}`}
      </span>
    </motion.li>
  );
};
