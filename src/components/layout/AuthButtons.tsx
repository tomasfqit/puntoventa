"use client";

import { useRouter } from "next/navigation";
import { setToken, removeToken, isAuthenticated } from "@/helpers";

export function LoginButton() {
    const router = useRouter();

    const handleLogin = () => {
        // Simular un token de autenticación
        const fakeToken = "fake-jwt-token-" + Date.now();
        setToken(fakeToken);
        router.push("/dashboard");
    };

    return (
        <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Simular Login
        </button>
    );
}

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        removeToken();
        router.push("/auth");
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Cerrar Sesión
        </button>
    );
}

export function AuthStatus() {
    const authenticated = isAuthenticated();
    
    return (
        <div className="text-sm">
            Estado: {authenticated ? "Autenticado" : "No autenticado"}
        </div>
    );
} 