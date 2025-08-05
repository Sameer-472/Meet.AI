import { ChevronsUpDownIcon } from 'lucide-react'
import React from 'react'
import { ReactNode , useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'


interface Props {
   options: Array<{ id: string, value: string ,children:  ReactNode}>;
    onSelect: (value: string) => void;
    onSearch: (value: string) => void;
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
    return (
        <>
            <Button>
                <div>
                    {selectedOption ? selectedOption.children : placeholder}
                </div>
            </Button>
        </>
  )
}

export default CommandSelect