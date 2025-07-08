import { Card, CardContent } from "@/components/ui/card"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlert } from "lucide-react";
import { useForm } from "react-hook-form";


const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

export const SignInView = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Welcome back login to your account
                                    </h1>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-radial from-green-700 to-green-600 relative hidden md:flex flex-col">
                        <p className="text-2xl font-semibold text-white">Meet.AI</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}