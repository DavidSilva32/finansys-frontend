import { useState, useEffect } from "react";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  fixed?: boolean;
}

export default function ThemeToggle({ fixed }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={fixed ? "fixed top-4 right-4 z-50" : ""}>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="cursor-pointer"
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-yellow-500" />
        ) : (
          <Moon className="h-4 w-4  text-blue-500" />
        )}
      </Button>
    </div>
  );
}
