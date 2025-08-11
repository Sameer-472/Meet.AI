import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import MeetingHeader from '../components/meetings-header';
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import EmptyState from '@/components/generalComponents/emptyState';
import DataPagination from '../components/data-pagination';

const MeetingsView = () => {

    const trpc = useTRPC();
    const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));
    return (
        <div className='overflow-x-scroll'>
            <MeetingHeader />
            <DataTable data={data?.items} columns={columns} />
            {/* <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page) => setFilters({ page })} /> */}
            {data?.items.length == 0 && (
                <EmptyState title='Create your first Meeting' description='Create an meeting to join you agents. Each agent will follow your instruction and can interact with participants during th call.' />
            )}
        </div>
    )
}

export default MeetingsView