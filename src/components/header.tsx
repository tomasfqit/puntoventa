"use client"

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setToken } from "@/helpers";
import { Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
    onToggleSidebar: () => void
    title?: string
}

export function Header({ onToggleSidebar, title = "Mi Aplicación" }: HeaderProps) {
    const router = useRouter();
    const handleLogout = () => {
        setToken("");
        router.push("/login");
    }

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 z-50">
            <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-4">
                <Menu className="h-5 w-5" />
            </Button>

            <h1 className="text-xl font-semibold">{title}</h1>

            <div className="ml-auto flex items-center gap-4">
                {/* Aquí puedes agregar más elementos del header como usuario, notificaciones, etc. */}
                <span className="text-sm text-gray-600">Usuario</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Cuenta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
