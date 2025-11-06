import * as React from "react";
import { Button } from "./ui/button";

interface QuickActionButtonProps {
  title: string;
  icon: React.ElementType; // Icon pode ser qualquer componente React (e.g., Lucide Icon)
  variant?: "default" | "secondary"; // Tipos de variant aceitos pelo seu Button
  onClick?: () => void;
}

const QuickActionButton = ({
  title,
  icon: Icon,
  variant = "default",
  onClick,
}: QuickActionButtonProps) => (
  <Button variant={variant} className="w-full sm:w-auto" onClick={onClick}>
    {/* O ícone é renderizado como filho, dentro do slot de conteúdo do Button */}
    <Icon className="h-4 w-4" />
    {title}
  </Button>
);

export { QuickActionButton };
