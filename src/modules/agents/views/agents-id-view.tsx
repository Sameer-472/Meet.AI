"use client";

import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import AgentIdViewHeader from '../components/agent-id-view-header';
import GeneratedAvatar from '@/components/generalComponents/generatedAvatar/generated-avatar';
import { Badge } from '@/components/ui/badge';
import { VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useConfirm from '@/hooks/use-confirm';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import UpdateAgentDialog from '../components/update-agent-dialog';
// import { Badge } from 'lucide-react';

interface Props {
    agentId: string
}
const AgentIdView = ({ agentId }: Props) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));
    const [isOpen, setIsOpen] = useState(false);

    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                toast.success("Agent deleted")
                router.push('/agents');
                //invalidate free tier usage
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    );

    const [RemoveConfirmation, confirmRemove] = useConfirm({
        title: "Are you sure",
        description: `The following action will remove ${data.meetingCount} associated meetings`
    });

    const handleRemoveAgent = async () => {
        const ok = await confirmRemove();
        if (!ok) return;
        await removeAgent.mutate({ id: agentId })
    }

    return (
        <>
            <RemoveConfirmation />
            <UpdateAgentDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} initialValues={data} />
            <div className='flex-1 py-y px-4 md:px-4 flex flex-col gap-y-4'>
                <AgentIdViewHeader agentId={agentId} agentName={data.name} onEdit={() => { setIsOpen(true) }} onRemove={handleRemoveAgent} />
                < div className='bg-white rounded-lg border'>
                    <div className='px-4 py-5 gap-y-5 flex flex-col col-span-5'>
                        <div className='flex items-center gap-x-3'>
                            <GeneratedAvatar variant='botttsNeutral' seed={data.name} className='size-10' />
                            <h2 className='text-2xl font-medium'>{data.name}</h2>
                        </div>
                        <Badge variant={"outline"} className='flex items-center gap-x-2 [&>svg]:size-4'>
                            <VideoIcon className='text-blue-700' />
                            {data.meetingCount}{data.meetingCount === 1 ? "meeting" : "meetings"}
                        </Badge>
                        <div className='flex flex-col gap-y-4'>
                            <p className='text-lg font-medium'>Instructions</p>
                            <p>{data.instructions}</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AgentIdView