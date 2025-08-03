import { ResponsiveDialog } from '@/components/responsive-dialog'
import React from 'react'
import { AgentForm } from './meeting-form'
import { AgentGetOne } from '../types'

interface NewAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    initialValues: AgentGetOne
}

const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: NewAgentDialogProps) => {
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange} title='Edit Agent' description='Edit the agent details'>
            <AgentForm
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
                initialValue={initialValues} />
        </ResponsiveDialog>
    )

}

export default UpdateAgentDialog;