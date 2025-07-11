"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    return (
        <ProtectedRoute>
            <AuthenticatedLayout>
                <div className="p-8">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                    </div>
                    <p className="mb-4">Bienvenido al dashboard. Solo usuarios autenticados pueden ver esta página.</p>
                    <Button onClick={() => {
                        router.push("/about");
                    }}>
                        About
                    </Button>
                </div>
            </AuthenticatedLayout>
        </ProtectedRoute>
    );
}