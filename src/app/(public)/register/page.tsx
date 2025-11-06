"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/passwordInput";
import { ApiRoutes } from "@/enum/apiRoutes";
import { ApiResponse, RegisterResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  email: z.email({ error: "Invalid Email" }),
  password: z
    .string()
    .min(8, { error: "Password must be longer than or equal to 8 characters" }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch(`${ApiRoutes.AUTH.REGISTER}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData: ApiResponse<RegisterResponse> = await response.json();

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
        aria-labelledby="register-heading"
        className="bg-card p-6 xs:p-8 rounded-xl shadow-2xl w-full md:max-w-sm border border-border"
      >
        <h1
          id="register-heading"
          className="text-2xl font-bold text-card-foreground mb-6 text-center flex items-center justify-center gap-2"
        >
          <UserPlus className="h-6 w-6 text-primary" />
          Create New Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              {...register("name")}
              className={errors.name ? "border-red-500" : "border-border"}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
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

          <Button type="submit" className="w-full h-10" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                "Register and Log In"
              </div>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>

        <footer className="mt-6 pt-4 border-t border-border/70 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="#"
              onClick={() => router.push("/login")}
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Log In
            </a>
          </p>
        </footer>
      </section>
    </main>
  );
}
