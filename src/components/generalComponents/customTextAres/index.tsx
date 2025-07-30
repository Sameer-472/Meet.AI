"use client";
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';


type CustomInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
};

const CustomTextArea = <T extends FieldValues>({ control, name, label, type, placeholder }: CustomInputProps<T>) => {
    return (
        <FormField control={control} name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}

export default CustomTextArea