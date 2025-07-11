"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

export default function AboutPage() {
    return (
        <ProtectedRoute>
            <AuthenticatedLayout>
                <div className="p-8">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">About</h1>
                    </div>
                    <p className="mb-4">Esta es la página About. También está protegida y usa el mismo layout autenticado.</p>
                    <p>Puedes navegar entre Dashboard y About usando los enlaces en la barra de navegación.</p>
                </div>
            </AuthenticatedLayout>
        </ProtectedRoute>
    );
}