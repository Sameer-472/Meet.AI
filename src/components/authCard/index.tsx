"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "../signInForm";
import SignUpForm from "../signUpForm";
// import SignInForm from "./SignInForm";
// import SignUpForm from "./SignUpForm";

const AuthCard = () => {
    const [activeTab, setActiveTab] = useState("signin");

    return (
        <Card className="w-full shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-8">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Welcome Meet.AI
                </CardTitle>
                <CardDescription className="text-gray-600">
                    {activeTab === "signin"
                        ? "Sign in to your account to continue"
                        : "Create a new account to get started"
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-lg">
                        <TabsTrigger
                            value="signin"
                            className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                        >
                            Sign In
                        </TabsTrigger>
                        <TabsTrigger
                            value="signup"
                            className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                        >
                            Sign Up
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin" className="space-y-6">
                        <SignInForm />
                    </TabsContent>
                    <TabsContent value="signup" className="space-y-6">
                        <SignUpForm />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default AuthCard;