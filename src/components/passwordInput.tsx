import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ register, error }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = error?.message;

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="password">Password</Label>
      <div className="relative"> 
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register("password")}
          className={`pr-10 border ${
            errorMessage ? "border-red-500" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground focus:outline-none"
        >
          {showPassword ? ( <Eye className="h-5 w-5" /> ) : ( <EyeOff className="h-5 w-5" /> )}
        </button>
      </div>
      {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
    </div>
  );
}
