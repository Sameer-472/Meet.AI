import { AlertCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


interface Props {
  title: string,
  description: string
}

const EmptyState = ({ title, description }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Image src={'/assets/logo.svg'} alt='logo' width={140} height={140} />
      <div className='flex flex-col gap-y-6 max-w-md mx-auto text-center'>
        <p className='text-lg font-medium'>{title}</p>
        <p className='text-muted-foreground'>{description}</p>
      </div>
    </div>
  )
}

export default EmptyState