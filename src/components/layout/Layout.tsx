import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gray-800 text-white p-4">
                <Link href="/dashboard" className="font-bold">Dashboard</Link>
            </nav>
            <main className="p-6">{children}</main>
        </div>
    );
}
