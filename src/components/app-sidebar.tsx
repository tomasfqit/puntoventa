"use client"

import type * as React from "react"
import {
    ChevronRight,
    Home,
    Settings,
    Users,
    FileText,
    Database,
    Shield,
    Bell,
    Mail,
    Calendar,
    BarChart3,
    Package,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"

// Tipos para la estructura del menú
interface MenuAction {
    label: string
    action: () => void
}

interface SubMenuItem {
    title: string
    icon?: React.ComponentType<{ className?: string }>
    action?: MenuAction
}

interface MenuItem {
    title: string
    icon: React.ComponentType<{ className?: string }>
    url?: string
    items?: SubMenuItem[]
}

interface MenuGroup {
    title: string
    items: MenuItem[]
}

// Datos del menú con 3 niveles
const menuData: MenuGroup[] = [
    {
        title: "Principal",
        items: [
            {
                title: "Dashboard",
                icon: Home,
                url: "/dashboard",
            },
            {
                title: "Usuarios",
                icon: Users,
                items: [
                    {
                        title: "Lista de Usuarios",
                        icon: Users,
                        action: {
                            label: "Ver usuarios",
                            action: () => console.log("Navegando a lista de usuarios"),
                        },
                    },
                    {
                        title: "Roles y Permisos",
                        icon: Shield,
                        action: {
                            label: "Gestionar roles",
                            action: () => console.log("Abriendo gestión de roles"),
                        },
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
                items: [
                    {
                        title: "Crear Documento",
                        action: {
                            label: "Nuevo documento",
                            action: () => console.log("Creando nuevo documento"),
                        },
                    },
                    {
                        title: "Plantillas",
                        action: {
                            label: "Ver plantillas",
                            action: () => console.log("Abriendo plantillas"),
                        },
                    },
                    {
                        title: "Archivos Compartidos",
                        action: {
                            label: "Ver compartidos",
                            action: () => console.log("Viendo archivos compartidos"),
                        },
                    },
                ],
            },
            {
                title: "Base de Datos",
                icon: Database,
                items: [
                    {
                        title: "Tablas",
                        action: {
                            label: "Gestionar tablas",
                            action: () => console.log("Gestionando tablas"),
                        },
                    },
                    {
                        title: "Consultas",
                        action: {
                            label: "Ejecutar consultas",
                            action: () => console.log("Ejecutando consultas"),
                        },
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
                items: [
                    {
                        title: "Enviar Notificación",
                        action: {
                            label: "Nueva notificación",
                            action: () => console.log("Enviando notificación"),
                        },
                    },
                    {
                        title: "Historial",
                        action: {
                            label: "Ver historial",
                            action: () => console.log("Viendo historial de notificaciones"),
                        },
                    },
                ],
            },
            {
                title: "Mensajería",
                icon: Mail,
                items: [
                    {
                        title: "Bandeja de Entrada",
                        action: {
                            label: "Ver mensajes",
                            action: () => console.log("Abriendo bandeja de entrada"),
                        },
                    },
                    {
                        title: "Enviar Mensaje",
                        action: {
                            label: "Nuevo mensaje",
                            action: () => console.log("Componiendo nuevo mensaje"),
                        },
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
                items: [
                    {
                        title: "Crear Evento",
                        action: {
                            label: "Nuevo evento",
                            action: () => console.log("Creando nuevo evento"),
                        },
                    },
                    {
                        title: "Ver Agenda",
                        action: {
                            label: "Abrir agenda",
                            action: () => console.log("Abriendo agenda"),
                        },
                    },
                ],
            },
            {
                title: "Reportes",
                icon: BarChart3,
                items: [
                    {
                        title: "Generar Reporte",
                        action: {
                            label: "Crear reporte",
                            action: () => console.log("Generando reporte"),
                        },
                    },
                    {
                        title: "Exportar Datos",
                        action: {
                            label: "Exportar",
                            action: () => console.log("Exportando datos"),
                        },
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
                items: [
                    {
                        title: "Configuración General",
                        action: {
                            label: "Abrir configuración",
                            action: () => console.log("Abriendo configuración general"),
                        },
                    },
                    {
                        title: "Seguridad",
                        action: {
                            label: "Configurar seguridad",
                            action: () => console.log("Configurando seguridad"),
                        },
                    },
                    {
                        title: "Respaldos",
                        action: {
                            label: "Gestionar respaldos",
                            action: () => console.log("Gestionando respaldos"),
                        },
                    },
                ],
            },
        ],
    },
]

export function AppSidebar() {
    return (
        <Sidebar className="z-40">
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <Package className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-semibold">Mi Aplicación</span>
                        <span className="text-xs text-sidebar-foreground/70">v2.0.0</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                {menuData.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        {item.items ? (
                                            // Menú con submenús (Nivel 2 y 3)
                                            <Collapsible className="group/collapsible">
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton>
                                                        <item.icon className="size-4" />
                                                        <span>{item.title}</span>
                                                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items.map((subItem) => (
                                                            <SidebarMenuSubItem key={subItem.title}>
                                                                <SidebarMenuSubButton onClick={subItem.action?.action} className="cursor-pointer">
                                                                    {subItem.icon && <subItem.icon className="size-4" />}
                                                                    <span>{subItem.title}</span>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        ) : (
                                            // Menú simple (Nivel 1)
                                            <SidebarMenuButton asChild>
                                                <a href={item.url || "#"}>
                                                    <item.icon className="size-4" />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        )}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    )
}
