import DashboardHeader from "@/components/dashboard/dashboardHeader";
import ProtectedLayout from "@/components/protectedLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </ProtectedLayout>
  );
}
