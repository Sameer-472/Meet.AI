import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardNavbar from '@/modules/dashboard/ui/components/dashboard-navbar'
import { DashboardSideBar } from '@/modules/dashboard/ui/components/dashboard-sidebar'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSideBar />
            <main className='flex flex-col w-screen bg-muted'>
                <DashboardNavbar />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout