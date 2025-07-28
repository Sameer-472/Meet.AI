import React from 'react';
import { AgentGetOne } from '../types';
import { useTRPC } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { agentsInsertSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';


interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValue?: AgentGetOne;
}

export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValue
}: AgentFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const createClinet = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: () => { },
            onError: () => { }
        })
    )

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValue?.name ?? "",
            instruction: initialValue?.instructions ?? ""
        }
    })
}