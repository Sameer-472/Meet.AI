"use client"
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

const AgentsView = () => {
    const trpc = useTRPC();
    const [open, setOpen] = useState(true);
    // const {data} = useSuspenseQuery(trpc.agents)
    return (
        <>
            <ResponsiveDialog title='Add Agents' description='Responsive description' open={open} onOpenChange={setOpen} >
                <Button>Some test</Button>
            </ResponsiveDialog>
            <div>AgentsView</div>
        </>
    )
}

export default AgentsView