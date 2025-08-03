import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import MeetingHeader from '../components/meetings-header';

const MeetingsView = () => {

    // const trpc = useTRPC();
    // const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));
    return (
        <div>
            <MeetingHeader />
        </div>
    )
}

export default MeetingsView