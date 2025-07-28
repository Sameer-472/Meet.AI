import { ResponsiveDialog } from '@/components/responsive-dialog'
import React from 'react'

interface NewAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

const NewAgentsDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange} title='Agent' description='Create a new agent'>
            <div></div>
        </ResponsiveDialog>
    )
}

export default NewAgentsDialog