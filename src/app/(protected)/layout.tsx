"use client";
import { Header } from "@/components/header";
import { Loading } from "@/components/Loading";
import { MainContent } from "@/components/main-content";
import { Sidebar } from "@/components/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

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
    <div className="min-h-screen bg-gray-100">
      <Header onToggleSidebar={toggleSidebar} title="Panel de Control" />
      <Sidebar isOpen={sidebarOpen} />
      <MainContent sidebarOpen={sidebarOpen}>
        <div className="w-full h-[90.3vh] bg-gray-100 overflow-y-auto p-2">
          {children}
        </div>
      </MainContent>
    </div>
  );
}