import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/lib/authUtils";
import { toast } from "sonner";

export const useAuthCheck = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsChecking(false);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      if (token) {
        toast.error("Your session has expired. Please log in again.");
      }

      localStorage.removeItem("token");
      setIsAuthenticated(false);

      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }

    setIsChecking(false);
  }, [router]);

  return { isAuthenticated, isChecking };
};
