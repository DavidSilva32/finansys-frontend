import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeTokenPayload, isTokenExpired } from "@/lib/authUtils";
import { ApiRoutes } from "@/enum/apiRoutes";
import { ApiResponse, RefreshResponse } from "@/types/apiResponse";

interface AuthCheckOptions {
  redirectOnFail?: boolean
}

export const useAuthCheck = ({
  redirectOnFail = true,
}: AuthCheckOptions = {}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsChecking(false);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userId = accessToken ? decodeTokenPayload(accessToken)?.sub : null;

    if (!accessToken && !refreshToken) {
      setIsAuthenticated(false);
      setIsChecking(false);
      if (redirectOnFail) router.push("/login");
      return;
    }

    if (!isTokenExpired(accessToken)) {
      setIsAuthenticated(true);
      setIsChecking(false);
      return;
    }


    fetch(`${ApiRoutes.AUTH.REFRESH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, refreshToken })
    })
      .then(async (res) => {
        const data: ApiResponse<RefreshResponse> = await res.json();
        if (!res.ok || !data.payload)
          throw new Error(data.message || "Session expired");

        localStorage.setItem("accessToken", data.payload.tokens.accessToken);
        localStorage.setItem("refreshToken", data.payload.tokens.refreshToken);
        setIsAuthenticated(true);
      })
      .catch((error: any) => {
        if (error.name !== "AbortError") {
          console.error(error || "Session expired");
        }
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
        if (redirectOnFail) router.push("/login");
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, [router, redirectOnFail]);

  return { isAuthenticated, isChecking };
};
