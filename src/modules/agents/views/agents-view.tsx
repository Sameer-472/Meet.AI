import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

const AgentsView = () => {
    const trpc = useTRPC();
    // const {data} = useSuspenseQuery(trpc.agents)
    return (
        <div>AgentsView</div>
    )
}

export default AgentsView