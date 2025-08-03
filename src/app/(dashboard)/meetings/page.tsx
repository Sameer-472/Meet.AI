import { LoadingState } from '@/components/generalComponents';
import ErrorState from '@/components/generalComponents/errorState';
import MeetingsView from '@/modules/meetings/views/meeting.view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const Page = () => {

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({}),
    );
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsViewLoading />}>
                <ErrorBoundary fallback={<MeetingsViewError />}>
                    <MeetingsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page


export const MeetingsViewLoading = () => {
    return (
        <LoadingState title='Loading Meetings...' description='This take a fews seconds' />
    )
}

export const MeetingsViewError = () => {
    return (
        <ErrorState title='Error loading meetings' description='Something went wrong' />
    )
}