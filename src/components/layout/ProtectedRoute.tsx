"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/helpers";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
}

export default function ProtectedRoute({ 
    children, 
    requireAuth = true, 
    redirectTo = "/auth" 
}: ProtectedRouteProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isAuthenticated();
            setIsAuth(authenticated);

            if (requireAuth && !authenticated) {
                // Si requiere autenticación pero no está autenticado, redirigir al login
                router.push(redirectTo);
            } else if (!requireAuth && authenticated) {
                // Si no requiere autenticación pero está autenticado, redirigir al dashboard
                router.push("/dashboard");
            }
            
            setIsLoading(false);
        };

        checkAuth();
    }, [requireAuth, redirectTo, router]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-lg">Cargando...</div>
            </div>
        );
    }

    // Si requiere autenticación y no está autenticado, no mostrar contenido
    if (requireAuth && !isAuth) {
        return null;
    }

    // Si no requiere autenticación y está autenticado, no mostrar contenido
    if (!requireAuth && isAuth) {
        return null;
    }

    return <>{children}</>;
} 