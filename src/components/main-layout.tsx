import type { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Header } from "./header"
import { MainContent } from "./main-content"

interface MainLayoutProps {
    children: ReactNode
    headerTitle?: string
    breadcrumbs?: Array<{ label: string; href?: string }>
    sidebarOpen: boolean;
    onToggleSidebar: () => void;

}

export function MainLayout({ children, headerTitle, sidebarOpen, onToggleSidebar }: MainLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <SidebarInset className="flex-1">
                    <Header title={headerTitle} onToggleSidebar={onToggleSidebar} />
                    <MainContent sidebarOpen={sidebarOpen}>{children}</MainContent>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
