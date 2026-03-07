import { SidebarProvider, SidebarTrigger } from "@/core/components/shadcnComponents/Ui/sidebar"
import { AppSidebar } from "@/core/components/sidebar/AppSidebar"
import { AuthProvider } from "../providers/AuthProvider"
import { DefineApp } from "../utils/DefineApp"
import type { ReactNode } from "react"

interface bodyProps {
    appSidebarTitle: string
    appSidebarIcon: string
    appSidebarBodyStyle?: string
    children: ReactNode
}

export const AppSidebarBody: React.FC<bodyProps> = ({
    appSidebarTitle,
    appSidebarIcon,
    appSidebarBodyStyle,
    children
}) => {
    return (
        <DefineApp appTitle={appSidebarTitle} appIcon={appSidebarIcon}>
            <AuthProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <div className="h-fit">
                        <SidebarTrigger className="cursor-pointer"/>
                    </div>
                    <main className={`flex items-center w-full ${appSidebarBodyStyle}`}>
                        {children}
                    </main>
                </SidebarProvider>
            </AuthProvider>
        </DefineApp>
    )
}