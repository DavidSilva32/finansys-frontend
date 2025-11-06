"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background font-sans px-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">
        Welcome to FinanSys
      </h1>
      <p className="text-center text-muted-foreground mb-6 max-w-xl">
        Intelligent Financial System for Small Businesses — control of income and expenses, automatic monthly balance and dashboard with graphs.
      </p>
      <Button onClick={goToLogin} className="px-6 py-3 cursor-pointer">
        Access
      </Button>
    </main>
  );
}