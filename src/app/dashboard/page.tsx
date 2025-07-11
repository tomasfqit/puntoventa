import ProtectedRoute from "@/components/ProtectedRoute";
import { LogoutButton, AuthStatus } from "@/components/AuthButtons";

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <AuthStatus />
                        <LogoutButton />
                    </div>
                </div>
                <p>Bienvenido al dashboard. Solo usuarios autenticados pueden ver esta página.</p>
            </div>
        </ProtectedRoute>
    );
}