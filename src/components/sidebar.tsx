"use client"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { MenuGroup, MenuItem, SidebarProps, SubMenuItem, menuData } from "@/constants/menuItems"
import {
    ChevronRight
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "./ui/input"



// Datos del menú

export function Sidebar({ isOpen }: SidebarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const localPath = usePathname();
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
            <div className="p-2 h-[84.8vh] overflow-y-auto">
                {/* Menú */}
                <nav className="space-y-4">
                    {filteredMenuData.map((group) => (
                        <div key={group.title}>
                            <div className="w-full flex flex-row gap-2 items-center justify-between p-1 ">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase">{group.title}</h3>
                                <div className="h-[1px] bg-gray-100 w-full"></div>
                            </div>
                            <ul className="space-y-1">
                                {group.items.map((item) => (
                                    <li key={item.title}>
                                        {item.submenu ? (
                                            <MenuItemWithSubmenu item={item} />
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start h-10 px-2 text-gray-700 hover:bg-gray-100"
                                                onClick={() => {
                                                    if (localPath !== item.path) {
                                                        router.push(item.path)
                                                    }
                                                }}
                                                style={{
                                                    backgroundColor: localPath === item.path ? "rgba(0, 0, 0, 0.05)" : "transparent",
                                                    color: localPath === item.path ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.6)",
                                                }}
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
    const localPath = usePathname();
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
                                onClick={() => localPath !== subItem.path && router.push(subItem.path)}
                                style={{
                                    backgroundColor: localPath === subItem.path ? "rgba(0, 0, 0, 0.05)" : "transparent",
                                    color: localPath === subItem.path ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.6)",
                                }}
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
