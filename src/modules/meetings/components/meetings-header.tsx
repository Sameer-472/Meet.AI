"use client"

import { Button } from '@/components/ui/button'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentsDialog from './new-meeting-dialog'
import { MeetingSearchFilter } from './meetings-search-filter'
import { useMeetingsFilters } from '../hooks/use-meeting-filters'
import { DEFAULT_PAGE } from '@/constant'
import { StatusFilter } from './status-filter'
import { Agent } from 'http'
import { AgentIdFilter } from './agent-id-filter'

const MeetingHeader = () => {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useMeetingsFilters();
    const isAnyFilterModified = !!filters.search || !!filters.search || !!filters.agentId;

    const onClearFilters = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE,
            status: null,
            agentId: "",
        })
    }
    return (
        <>
            <NewAgentsDialog open={open} onOpenChange={setOpen} />
            <div className='py-4 -x-4 md:px-8 flex flex-col gap-y-4'>
                <div className='flex items-center justify-between'>
                    <h5 className='font-medium text-xl'> My Meetings</h5>
                    <Button onClick={() => setOpen(true)}>
                        <PlusIcon />
                        New Meeting</Button>
                </div>
                <div className='flex items-center gap-x-2 p-1'>
                    <MeetingSearchFilter />
                    <StatusFilter />
                    <AgentIdFilter />
                    {isAnyFilterModified && (
                        <Button variant={"outline"} size={"sm"} onClick={onClearFilters}>
                            <XCircleIcon />
                            Clear
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default MeetingHeader