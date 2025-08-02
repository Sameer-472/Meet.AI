import React from 'react';
import { AgentGetOne } from '../types';
import { useTRPC } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { agentsInsertSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import GeneratedAvatar from '@/components/generalComponents/generatedAvatar/generated-avatar';
import { CustomInput, CustomTextArea } from '@/components/generalComponents';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';


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

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({})
                )

                if (initialValue?.id) {
                    queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({
                            id: initialValue.id
                        })
                    )
                }
                toast.success("Agent Updated")
                onCancel?.()
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    );

    const updateAgent = useMutation(
        trpc.agents.updateAgent.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({})
                )

                if (initialValue?.id) {
                    queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({
                            id: initialValue.id
                        })
                    )
                }
                toast.success("Agent Updated")
                onCancel?.()
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    )

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValue?.name ?? "",
            instructions: initialValue?.instructions ?? ""
        }
    })

    const isEdit = !!initialValue?.id;
    const isPending = createAgent?.isPending || updateAgent?.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if (isEdit) {
            updateAgent.mutate({ ...values, id: initialValue?.id })
        }
        else {
            createAgent.mutate(values);
        }
    }

    return (
        <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar className='border size-16' seed={form.watch("name")} variant='botttsNeutral' />
                <CustomInput name='name' control={form.control} label='Name' placeholder='eg..John Doe' />
                <CustomTextArea name='instructions' control={form.control} label='Instruction' placeholder='You are a helpful math assistant that can answer questions with taks' />
                <div className='flex justify-between gap-x-2'>
                    {onCancel && (
                        <Button variant={"ghost"} type='button' onClick={() => onCancel()}>
                            Cancel
                        </Button>
                    )}
                    <Button disabled={isPending} type='submit'>
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}