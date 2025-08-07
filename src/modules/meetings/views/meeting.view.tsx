import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import MeetingHeader from '../components/meetings-header';
import { DataTable } from '../components/data-table';

const MeetingsView = () => {

    const trpc = useTRPC();
    const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));
    return (
        <div className='overflow-x-scroll'>
            <MeetingHeader />
            <DataTable data={data?.items} />
        </div>
    )
}

export default MeetingsView