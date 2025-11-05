"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiRoutes } from "@/enum/api";
import { ApiResponse, UserPayload } from "@/types/apiResponse";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(form)
      const response = await fetch(`${ApiRoutes.BASE_URL}${ApiRoutes.LOGIN}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data: ApiResponse<UserPayload> = await response.json();

      if (!response.ok) {
        throw new Error(data.message); 
      }

      localStorage.setItem("token", data.payload!.token);
      toast.success(data.message);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch("/api/auth/google");
      if (response.ok) {
        toast.success("Google Login Successful!");
        router.push("/dashboard");
      } else {
        toast.error("Google Login Failed!");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("An error occurred during Google Login.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background gap-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-card rounded-lg shadow-md w-96"
      >
        <fieldset className="space-y-4">
          <legend className="sr-only">Login</legend>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </fieldset>

        <Button type="submit" className="w-full cursor-pointer">
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      {/* Google Button Login */}
      <Button
        onClick={handleGoogleLogin}
        className="w-96 flex items-center justify-center gap-2 cursor-pointer"
        variant="outline"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 533.5 544.3"
        >
          <path
            fill="#4285F4"
            d="M533.5 278.4c0-18.1-1.6-35.5-4.6-52.4H272v99.3h146.9c-6.4 34.7-25.4 64.1-54.1 84v69.7h87.4c51.1-47 80.3-116.3 80.3-200.6z"
          />
          <path
            fill="#34A853"
            d="M272 544.3c72.6 0 133.5-24 178-65.1l-87.4-69.7c-24.3 16.3-55.3 25.9-90.6 25.9-69.6 0-128.6-46.8-149.6-109.6H32.7v68.9C77 477 167.6 544.3 272 544.3z"
          />
          <path
            fill="#FBBC05"
            d="M122.4 331.4c-5-14.5-7.8-30-7.8-45.9s2.8-31.4 7.8-45.9v-68.9H32.7c-15.2 29.5-24 62.6-24 99s8.8 69.5 24 99l89.7-68.3z"
          />
          <path
            fill="#EA4335"
            d="M272 107.6c39.5 0 75 13.6 102.9 40.2l77.2-77.2C405.4 24 344.6 0 272 0 167.6 0 77 67.3 32.7 171.5l89.7 68.9c21-62.8 80-109.6 149.6-109.6z"
          />
        </svg>
        Entrar com Google
      </Button>
    </main>
  );
}
