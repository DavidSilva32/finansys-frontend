import PrivateHeader from "@/components/layout/privateHeader";
import ProtectedLayout from "@/components/protectedLayout";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background flex flex-col">
        <PrivateHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full">
          {children}
        </main>
      </div>
    </ProtectedLayout>
  );
}
