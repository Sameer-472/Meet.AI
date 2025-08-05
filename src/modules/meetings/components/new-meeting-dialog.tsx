import { ResponsiveDialog } from '@/components/responsive-dialog'
import React from 'react'
import { MeetingForms } from './meeting-form'
import { useRouter } from 'next/navigation'
interface NewAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

const NewAgentsDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
    const router = useRouter()
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange} title='Meeting' description='Create a new meeting'>
            <MeetingForms onSuccess={(id)=> {
                router.push(`/meetings/${id}`)
                onOpenChange(false)
            }} onCancel={()=> onOpenChange(false)}/>
        </ResponsiveDialog>
    )
}

export default NewAgentsDialog