"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { LoginButton, AuthStatus } from "@/components/AuthButtons";

export default function LoginPage() {
    return (
        <ProtectedRoute requireAuth={false}>
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
                    <p className="mb-6">Esta página solo es accesible para usuarios no autenticados.</p>
                    <p className="mt-2 text-sm text-gray-600 mb-6">
                        Si ya tienes una sesión activa, serás redirigido al dashboard.
                    </p>
                    
                    <div className="space-y-4">
                        <AuthStatus />
                        <LoginButton />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
