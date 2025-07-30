import { ResponsiveDialog } from '@/components/responsive-dialog'
import React from 'react'
import { AgentForm } from './agent-form'

interface NewAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

const NewAgentsDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange} title='Agent' description='Create a new agent'>
            <AgentForm onSuccess={()=> onOpenChange(false)} onCancel={()=> onOpenChange(false)}/>
        </ResponsiveDialog>
    )
}

export default NewAgentsDialog