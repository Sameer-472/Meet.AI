"use client";
import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";


type CustomInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    description?: React.ReactNode;
};

const CustomInput = <T extends FieldValues>({ control, name, label, type, placeholder, description }: CustomInputProps<T>) => {
    return (
        <FormField control={control} name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}

export default CustomInput