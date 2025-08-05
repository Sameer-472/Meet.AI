import { ResponsiveDialog } from '@/components/responsive-dialog'
import React from 'react'
import { MeetingForms } from './meeting-form'
// import { Meeting } from '../types'
import type { MeetingGetOne } from '../types';

interface NewAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    initialValues: MeetingGetOne;    
}

const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: NewAgentDialogProps) => {
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange} title='Edit Agent' description='Edit the agent details'>
            <MeetingForms
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
                initialValue={initialValues} />
        </ResponsiveDialog>
    )

}

export default UpdateAgentDialog;