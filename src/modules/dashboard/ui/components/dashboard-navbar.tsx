"use client";
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { CrossIcon, PanelLeftIcon, PanelRightIcon, SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import DashboardCommand from './dashboard-command';

const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();

    const [commandOpen, setCommandOpen] = useState(false)
    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
            <nav className='flex px-4 gap-x-2 items-center py-2 border-b bg-background'>
                <Button className='size-9 cursor-pointer' variant="outline" onClick={toggleSidebar}>
                    {state === "collapsed" || isMobile ?
                        <PanelLeftIcon className='size-4' />
                        : <PanelRightIcon className='size-4' />}
                </Button>
                <Button onClick={() => setCommandOpen(!commandOpen)} variant={"outline"} className='h-9 w-[240px] text-muted-foreground justify-start font-normal text-sm hover:text-muted-foreground cursor-pointer'>
                    <SearchIcon />
                    Search
                    {/* <CrossIcon /> */}
                </Button>
            </nav>
        </>
    )
}

export default DashboardNavbar