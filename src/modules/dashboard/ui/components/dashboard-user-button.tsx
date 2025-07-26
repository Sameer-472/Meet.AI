import GeneratedAvatar from '@/components/generalComponents/generatedAvatar/generated-avatar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import React from 'react'
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession();
    const router = useRouter()
    console.log("data", data)

    if (isPending || !data?.user) {
        return null;
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bh-white/5 hover:bg-white/10 overflow-hidden'>
                {data?.user?.image ? (
                    <Avatar>
                        <AvatarImage src={data?.user?.image} />
                    </Avatar>
                ) : <GeneratedAvatar seed={data?.user?.name} variant='initials' className='size-9 mr-3' />}
                <div className='flex flex-col gap-0.5 overflow-hidden flex-1 min-w-0 text-left'>
                    <p className='text-sm truncate w-full'>{data?.user?.name}</p>
                    <p className='text-xs truncate w-full'>{data?.user?.email}</p>
                </div>
                <ChevronDownIcon className='size-3'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side='right' className='w-72'>
                <DropdownMenuLabel className=''>
                    <div className='flex flex-col gap-1'>
                        <span className='font-medium truncate'>{data?.user?.name}</span>
                        <span className='text-sm font-normal text-muted-foreground'>{data?.user?.email}</span>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='cursor-pointer flex items-center justify-between'>
                        Billing
                        <CreditCardIcon />
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => authClient.signOut({
                        fetchOptions: { onSuccess: () => router.push('/sign-in') }
                    })} className='cursor-pointer flex items-center justify-between'>
                        Logout
                        <LogOutIcon />
                    </DropdownMenuItem>
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DashboardUserButton