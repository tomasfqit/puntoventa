import Link from "next/link";
import { LogoutButton, AuthStatus } from "./AuthButtons";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gray-800 text-white p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <Link href="/dashboard" className="font-bold text-lg">Dashboard</Link>
                        <Link href="/about" className="hover:text-gray-300">About</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <AuthStatus />
                        <LogoutButton />
                    </div>
                </div>
            </nav>
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
} 