"use client";

import { SummaryCardProps } from "@/types/transaction";
import { motion } from "framer-motion";

export const TransactionSummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  valueColor = "text-card-foreground",
}) => (
  <motion.div
    className="bg-card p-6 rounded-xl shadow-lg border border-border"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <p className="text-sm text-muted-foreground">{title}</p>
    <p className={`text-xl font-bold ${valueColor}`}>{value}</p>
  </motion.div>
);
