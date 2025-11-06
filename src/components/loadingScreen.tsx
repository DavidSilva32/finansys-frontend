import { Loader2 } from "lucide-react";

export default function LoadingScreen({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
      <Loader2 className="h-6 w-6 animate-spin mr-2" />
      {message}
    </div>
  );
}
