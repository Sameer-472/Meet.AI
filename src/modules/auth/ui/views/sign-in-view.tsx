"use client"

import { Card, CardContent } from "@/components/ui/card"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { CustomInput } from "@/components/generalComponents/index";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// import { useForm } from "react-hook-form";


const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})


type FormSchema = z.infer<typeof formSchema>;

export const SignInView = () => {
    const [error, setError] = useState<string | null>(null)

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();
    const onSubmit = async (data: FormSchema) => {
        setError(null);

        const { error } = await authClient.signIn.email(
            {
                email: data.email,
                password: data.password
            },
            {
                onSuccess: () => {
                    router.push('/')
                },
                onError: (error) => {
                    console.log("error", error)
                    setError(error.error.message)
                }
            }
        )
    }

    console.log({ error })
    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Welcome back
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your account
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <CustomInput label={"Email"} name={"email"} control={form.control} type="email" />
                                    <CustomInput label={"Password"} name={"password"} control={form.control} type="password" />
                                </div>
                                {!!error && (
                                    <Alert className="bg-destructive/10 border-none">
                                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                        <AlertTitle>Error</AlertTitle>
                                    </Alert>
                                )}
                                <Button type="submit" className="w-full">
                                    Sign in
                                </Button>
                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10">
                                        Or Continue with
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant={"outline"} className="w-full" type="button">
                                        Google
                                    </Button>
                                    <Button variant={"outline"} className="w-full" type="button">
                                        Github
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don &apos;t have an account? {""}
                                    <Link href={"/sign-up"} className="underline underline-offset-4">Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-radial from-green-700 to-green-600 relative hidden md:flex flex-col">
                        <p className="text-2xl font-semibold text-white">Meet.AI</p>
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of services</a> and <a href="#">Privacy</a>
            </div>
        </div>
    )
}