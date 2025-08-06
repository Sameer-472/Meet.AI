"use client";
import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import CommandSelect from '@/components/command-select';
import GeneratedAvatar from '../generatedAvatar/generated-avatar';


type CustomInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    options: Array<{
        id: string;
        value: string;
        children: React.ReactNode;
    }>;
    description?: React.ReactNode;
    setSearch: (value: string) => void;
};

const CustomDropdown = <T extends FieldValues>({ control, name, label, type, placeholder, options, setSearch, description }: CustomInputProps<T>) => {
    return (
        <FormField control={control} name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {/* <Input
                            type={type}
                            placeholder={placeholder}
                            {...field}
                        /> */}
                        <CommandSelect value={field.value} placeholder={placeholder} onSearch={setSearch} onSelect={field.onChange} options={options} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                        {description}
                    </FormDescription>
                </FormItem>
            )}
        />
    )
}

export default CustomDropdown