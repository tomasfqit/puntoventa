"use client";
import { Loading } from "@/components/Loading";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <Loading message="Verificando autenticación..." />;
  }

  if (!isAuthenticated) {
    return <Loading message="Redirigiendo al login..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}