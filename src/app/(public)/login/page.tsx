"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/passwordInput";
import { ApiRoutes } from "@/enum/apiRoutes";
import { ApiResponse, LoginResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

const loginSchema = z.object({
  email: z.email({ error: "Invalid Email" }),
  password: z
    .string()
    .min(8, { error: "Password must be longer than or equal to 8 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const { t } = useI18n();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch(`${ApiRoutes.AUTH.LOGIN}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData: ApiResponse<LoginResponse> = await response.json();

      if (!response.ok) throw new Error(resData.message);

      localStorage.setItem("token", resData.payload!.token);
      toast.success(resData.message);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <section
        aria-labelledby="login-heading"
        className="bg-card p-6 md:p-8 rounded-xl shadow-2xl w-full md:max-w-sm border border-border"
      >
        <h1
          id="login-heading"
          className="text-2xl font-bold text-card-foreground mb-6 text-center"
        >
          {t("login.title")}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="sr-only">{t("login.title")}</legend>

            <div className="flex flex-col gap-1">
              <Label htmlFor="email">{t("login.emailLabel")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("login.emailPlaceholder")}
                {...register("email")}
                className={errors.email ? "border-red-500" : "border-border"}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <PasswordInput register={register} error={errors.password} />
          </fieldset>

          <Button type="submit" className="w-full h-10" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("login.loading")}
              </div>
            ) : (
              t("login.submit")
            )}
          </Button>
        </form>

        <footer className="mt-6 pt-4 border-t border-border/70 text-center">
          <p className="text-sm text-muted-foreground">
            {t("login.noAccount")}{" "}
            <a
              href="#"
              onClick={() => router.push("/register")}
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              {t("login.createAccount")}
            </a>
          </p>
        </footer>
      </section>
    </main>
  );
}
