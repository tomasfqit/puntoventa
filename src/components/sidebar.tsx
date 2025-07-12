"use client"

import { useState } from "react"
import {
    ChevronRight,
    Home,
    Settings,
    Users,
    FileText,
    Database,
    Bell,
    Mail,
    Calendar,
    BarChart3,
    Package,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"

interface SidebarProps {
    isOpen: boolean
}

interface SubMenuItem {
    title: string;
    path: string;
}

interface MenuItem {
    title: string;
    icon: any;
    path: string;
    submenu?: SubMenuItem[];
}

interface MenuGroup {
    title: string
    items: MenuItem[]
}

// Datos del menú
const menuData: MenuGroup[] = [
    {
        title: "Principal",
        items: [
            {
                title: "Dashboard",
                icon: Home,
                path: "/",
            },
            {
                title: "Usuarios",
                icon: Users,
                path: "/users",
                submenu: [
                    {
                        title: "Lista de Usuarios",
                        path: "/listado-usuarios",
                    },
                    {
                        title: "Roles y Permisos",
                        path: "/roles-y-permisos",
                    },
                ],
            },
        ],
    }
]

export function Sidebar({ isOpen }: SidebarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    // Función para filtrar los datos del menú
    const filterMenuData = (data: MenuGroup[], search: string): MenuGroup[] => {
        if (!search.trim()) return data

        return data.map(group => {
            const filteredItems = group.items.filter((item: MenuItem) => {
                // Buscar en el título del item principal
                const mainTitleMatch = item.title.toLowerCase().includes(search.toLowerCase())
                
                // Buscar en los submenús si existen
                const submenuMatch = item.submenu?.some((subItem: SubMenuItem) =>
                    subItem.title.toLowerCase().includes(search.toLowerCase())
                ) || false

                return mainTitleMatch || submenuMatch
            })

            // Solo retornar grupos que tengan items que coincidan
            if (filteredItems.length > 0) {
                return {
                    ...group,
                    items: filteredItems.map((item: MenuItem) => {
                        // Si el item tiene submenu, filtrar también los subitems
                        if (item.submenu) {
                            const filteredSubmenu = item.submenu.filter((subItem: SubMenuItem) =>
                                subItem.title.toLowerCase().includes(search.toLowerCase())
                            )
                            return {
                                ...item,
                                submenu: filteredSubmenu
                            }
                        }
                        return item
                    })
                }
            }
            return null
        }).filter((group): group is MenuGroup => group !== null)
    }

    const filteredMenuData = filterMenuData(menuData, searchTerm);

    return (
        <aside
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out z-40 ${isOpen ? "w-64" : "w-0"
                } overflow-hidden`}
        >
            <div className="p-1">
                <Input 
                    placeholder="Buscar" 
                    className="w-full bg-white" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="p-4 h-[84.8vh] overflow-y-auto">
                {/* Menú */}
                <nav className="space-y-6">
                    {filteredMenuData.map((group) => (
                        <div key={group.title}>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">{group.title}</h3>
                            <ul className="space-y-1">
                                {group.items.map((item) => (
                                    <li key={item.title}>
                                        {item.submenu ? (
                                            <MenuItemWithSubmenu item={item} />
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start h-10 px-2 text-gray-700 hover:bg-gray-100"
                                                onClick={()=> router.push(item.path)}
                                            >
                                                <item.icon className="mr-3 h-4 w-4" />
                                                {item.title}
                                            </Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {filteredMenuData.length === 0 && searchTerm && (
                        <div className="text-center text-gray-500 py-4">
                            No se encontraron resultados para "{searchTerm}"
                        </div>
                    )}
                </nav>
            </div>
        </aside>
    )
}

function MenuItemWithSubmenu({ item }: { item: MenuItem }) {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();
    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-start h-10 px-2 text-gray-700 hover:bg-gray-100">
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.title}
                    <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1">
                <ul className="ml-6 space-y-1">
                    {item.submenu?.map((subItem: SubMenuItem) => (
                        <li key={subItem.title}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start h-8 px-2 text-gray-600 hover:bg-gray-100"
                                onClick={()=> router.push(subItem.path)}
                            >
                                {subItem.title}
                            </Button>
                        </li>
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    )
}
