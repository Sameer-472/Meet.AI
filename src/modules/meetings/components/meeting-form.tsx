import React from 'react';
import { useTRPC } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';
// import { meetingInsertShce } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import GeneratedAvatar from '@/components/generalComponents/generatedAvatar/generated-avatar';
import { CustomInput, CustomTextArea } from '@/components/generalComponents';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { meetingInsertSchema } from '../schemas';
import { MeetingGetOne } from '../types';


interface MeetingFormProps {
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
    initialValue?: MeetingGetOne;
}

export const MeetingForms = ({
    onSuccess,
    onCancel,
    initialValue
}: MeetingFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: (data) => {
                queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                )

                if (initialValue?.id) {
                    queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({
                            id: initialValue.id
                        })
                    )
                }
                toast.success("Meeting Updated")
                onSuccess?.(data?.id)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    );

    const updateMeeting = useMutation(
        trpc.meetings.updateMeeting.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                )

                if (initialValue?.id) {
                    queryClient.invalidateQueries(
                        trpc.meetings.getOne.queryOptions({
                            id: initialValue.id
                        })
                    )
                }
                toast.success("Meeting Updated")
                onCancel?.()
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    )

    const form = useForm<z.infer<typeof meetingInsertSchema>>({
        resolver: zodResolver(meetingInsertSchema),
        defaultValues: {
            name: initialValue?.name ?? "",
            // instructions: initialValue?.instructions ?? ""
        }
    })

    const isEdit = !!initialValue?.id;
    const isPending = createMeeting?.isPending || updateMeeting?.isPending;

    const onSubmit = (values: z.infer<typeof meetingInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({ ...values, id: initialValue?.id })
        }
        else {
            createMeeting.mutate(values);
        }
    }

    return (
        <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <CustomInput name='name' control={form.control} label='Title' placeholder='eg..John Doe' />
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