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

interface SidebarProps {
    isOpen: boolean
}

// Datos del menú
const menuData = [
    {
        title: "Principal",
        items: [
            {
                title: "Dashboard",
                icon: Home,
                action: () => console.log("Ir a Dashboard"),
            },
            {
                title: "Usuarios",
                icon: Users,
                submenu: [
                    {
                        title: "Lista de Usuarios",
                        action: () => console.log("Ver lista de usuarios"),
                    },
                    {
                        title: "Roles y Permisos",
                        action: () => console.log("Gestionar roles"),
                    },
                ],
            },
        ],
    },
    {
        title: "Contenido",
        items: [
            {
                title: "Documentos",
                icon: FileText,
                submenu: [
                    {
                        title: "Crear Documento",
                        action: () => console.log("Crear nuevo documento"),
                    },
                    {
                        title: "Plantillas",
                        action: () => console.log("Ver plantillas"),
                    },
                    {
                        title: "Archivos Compartidos",
                        action: () => console.log("Ver archivos compartidos"),
                    },
                ],
            },
            {
                title: "Base de Datos",
                icon: Database,
                submenu: [
                    {
                        title: "Tablas",
                        action: () => console.log("Gestionar tablas"),
                    },
                    {
                        title: "Consultas",
                        action: () => console.log("Ejecutar consultas"),
                    },
                ],
            },
        ],
    },
    {
        title: "Comunicación",
        items: [
            {
                title: "Notificaciones",
                icon: Bell,
                submenu: [
                    {
                        title: "Enviar Notificación",
                        action: () => console.log("Enviar notificación"),
                    },
                    {
                        title: "Historial",
                        action: () => console.log("Ver historial"),
                    },
                ],
            },
            {
                title: "Mensajería",
                icon: Mail,
                submenu: [
                    {
                        title: "Bandeja de Entrada",
                        action: () => console.log("Abrir bandeja"),
                    },
                    {
                        title: "Enviar Mensaje",
                        action: () => console.log("Nuevo mensaje"),
                    },
                ],
            },
        ],
    },
    {
        title: "Herramientas",
        items: [
            {
                title: "Calendario",
                icon: Calendar,
                submenu: [
                    {
                        title: "Crear Evento",
                        action: () => console.log("Crear evento"),
                    },
                    {
                        title: "Ver Agenda",
                        action: () => console.log("Ver agenda"),
                    },
                ],
            },
            {
                title: "Reportes",
                icon: BarChart3,
                submenu: [
                    {
                        title: "Generar Reporte",
                        action: () => console.log("Generar reporte"),
                    },
                    {
                        title: "Exportar Datos",
                        action: () => console.log("Exportar datos"),
                    },
                ],
            },
        ],
    },
    {
        title: "Configuración",
        items: [
            {
                title: "Sistema",
                icon: Settings,
                submenu: [
                    {
                        title: "Configuración General",
                        action: () => console.log("Configuración general"),
                    },
                    {
                        title: "Seguridad",
                        action: () => console.log("Configurar seguridad"),
                    },
                    {
                        title: "Respaldos",
                        action: () => console.log("Gestionar respaldos"),
                    },
                ],
            },
        ],
    },
]

export function Sidebar({ isOpen }: SidebarProps) {
    return (
        <aside
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out z-40 ${isOpen ? "w-64" : "w-0"
                } overflow-hidden`}
        >
            <div className="p-4 h-full overflow-y-auto">
                {/* Logo/Brand */}
                <div className="flex items-center gap-2 mb-6 px-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <Package className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-semibold text-gray-900">Mi App</span>
                        <span className="text-xs text-gray-500">v2.0.0</span>
                    </div>
                </div>

                {/* Menú */}
                <nav className="space-y-6">
                    {menuData.map((group) => (
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
                                                onClick={item.action}
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
                </nav>
            </div>
        </aside>
    )
}

function MenuItemWithSubmenu({ item }: { item: any }) {
    const [isOpen, setIsOpen] = useState(false)

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
                    {item.submenu.map((subItem: any) => (
                        <li key={subItem.title}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start h-8 px-2 text-gray-600 hover:bg-gray-100"
                                onClick={subItem.action}
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
