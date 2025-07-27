import ErrorState from '@/components/generalComponents/errorState';
import LoadingState from '@/components/generalComponents/loadingState'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary";

const Page = () => {
    const queryClient = getQueryClient();
    // void queryClient.prefetchQuery(trpc.)
    return (
        <HydrationBoundary>
            <Suspense fallback={<LoadingState title='Loading Agents' description='this may take a few seconds' />}>
                <ErrorBoundary fallback={<ErrorState title='Error Loading Agents' description='Something went wrong' />}>
                    <div>Agents Page</div>
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page