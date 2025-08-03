import { ResponsiveDialog } from '@/components/responsive-dialog'
import React from 'react'
import { AgentForm } from './meeting-form'

interface NewAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

const NewAgentsDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange} title='Meeting' description='Create a new meeting'>
            <AgentForm onSuccess={()=> onOpenChange(false)} onCancel={()=> onOpenChange(false)}/>
        </ResponsiveDialog>
    )
}

export default NewAgentsDialog