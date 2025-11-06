"use client";

import { useAuthCheck } from "@/hooks/useAuthCheck";
import LoadingScreen from "./loadingScreen";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isChecking } = useAuthCheck();

  if (isChecking) return <LoadingScreen message="Verifying session..." />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
