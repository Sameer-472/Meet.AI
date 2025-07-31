import ErrorState from '@/components/generalComponents/errorState';
import LoadingState from '@/components/generalComponents/loadingState'
import AgentsListHeader from '@/modules/agents/components/list-header';
import { loadSearchParams } from '@/modules/agents/params';
import AgentsView from '@/modules/agents/views/agents-view';
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { SearchParams } from 'nuqs';
import React, { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from 'sonner';

interface Prop {
    searchParams: Promise<SearchParams>
}
const Page = async ({ searchParams }: Prop) => {
    const filters = await loadSearchParams(searchParams);
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({ ...filters}))
    return (
        <>
            <Toaster />
            <AgentsListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<LoadingState title='Loading Agents' description='this may take a few seconds' />}>
                    <ErrorBoundary fallback={<ErrorState title='Error Loading Agents' description='Something went wrong' />}>
                        <AgentsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default Page