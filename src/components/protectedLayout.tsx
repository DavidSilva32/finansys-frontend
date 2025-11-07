"use client";

import { useAuthCheck } from "@/hooks/useAuthCheck";
import LoadingScreen from "./loadingScreen";
import router from "next/router";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isChecking } = useAuthCheck();

  if (isChecking) return <LoadingScreen message="Verifying session..." />;
  if (!isAuthenticated) {
  router.push("/login");
  return null;
}

  return <>{children}</>;
}
