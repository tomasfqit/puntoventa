import type { ReactNode } from "react"

interface MainContentProps {
    children: ReactNode
    sidebarOpen: boolean
}

export function MainContent({ children, sidebarOpen }: MainContentProps) {
    return (
        <main className={`pt-16  transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-0"}`}>
            <div className="p-6">{children}</div>
        </main>
    )
}
