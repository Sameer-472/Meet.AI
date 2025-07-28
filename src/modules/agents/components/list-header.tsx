"use client"

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentsDialog from './new-agent-dialog'

const AgentsListHeader = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <NewAgentsDialog open={open} onOpenChange={setOpen}/>
            <div className='py-4 -x-4 md:px-8 flex flex-col gap-y-4'>
                <div className='flex items-center justify-between'>
                    <h5 className='font-medium text-xl'> My Agents</h5>
                    <Button onClick={()=> setOpen(true)}>
                        <PlusIcon />
                        New Agents</Button>
                </div>
            </div>
        </>
    )
}

export default AgentsListHeader