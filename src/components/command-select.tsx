import { ChevronsUpDownIcon } from 'lucide-react'
import React from 'react'
import { ReactNode, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'


interface Props {
    options: Array<{ id: string, value: string, children: ReactNode }>;
    onSelect: (value: string) => void;
    onSearch?: (value: string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
}



const CommandSelect: React.FC<Props> = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder,
    isSearchable,
    className
}: Props) => {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find(option => option.value === value);

    const handleOpenChange = (open: boolean) => {
        onSearch?.("");
        setOpen(open);
    }
    return (
        <>
            <Button type='button' variant={'outline'} className={cn('h-9 justify-between w-full px-3 font-normal', className)} onClick={() => setOpen(true)}>
                <div>
                    {selectedOption ? selectedOption.children : placeholder}
                </div>
                <ChevronsUpDownIcon />
            </Button>
            <CommandResponsiveDialog shouldFilter={!onSearch} open={open} onOpenChange={handleOpenChange}>
                <CommandInput placeholder='Search' onValueChange={onSearch} />
                <CommandList>
                    <CommandEmpty>
                        <span className='text-muted-foreground text-sm'>
                            No options found.
                        </span>
                    </CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => (
                            <CommandItem
                                key={option.id}
                                value={option.value}
                                onSelect={() => {
                                    onSelect(option.value);
                                    setOpen(false);
                                }}
                                className='cursor-pointer'
                            >
                                {option.children}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandResponsiveDialog>
        </>
    )
}

export default CommandSelect