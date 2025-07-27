import { Loader2Icon } from 'lucide-react'
import React from 'react'


interface Props {
    title: string,
    description: string
}

const LoadingState = ({title , description}: Props) => {
  return (
    <div className='py-4 px-8 flex flex-1 items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm'>
            <Loader2Icon className='size-6 animate-spin text-primary'/>
            <div className='flex flex-col gap-y-2 text-center'>
                <p className='text-lg font-medium'>{title}</p>
                <p>{description}</p>
            </div>
        </div>
    </div>
  )
}

export default LoadingState