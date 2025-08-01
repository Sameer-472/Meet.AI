"use client"
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import EmptyState from '@/components/generalComponents/emptyState';
import { useAgentsFilters } from '../hooks/use-agent-filters';
import DataPagination from '../components/data-pagination';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navi';

const AgentsView = () => {
    const trpc = useTRPC();
    const router = useRouter();
    const [filters, setFilters] = useAgentsFilters();
    const [open, setOpen] = useState(true);
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }));
    return (
        <>
            {/* <div>{JSON.stringify(data, null, 2)}</div> */}
            <div className='flex pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
                <DataTable columns={columns} data={data.items} onRowClick={(row)=> router.push(`agents/${row.id}`)}/>
                <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page) => setFilters({ page })} />
                {data.items.length == 0 && (
                    <EmptyState title='Create your first agent' description='Create an agent to join you meeting. Each agent will follow your instruction and can interact with participants during th call.' />
                )}
            </div>
        </>
    )
}

export default AgentsView