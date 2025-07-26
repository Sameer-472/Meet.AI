"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
    const { data: session } = authClient.useSession();
    const route = useRouter();
    return (
        <>
            <div>
                Logged in as {session?.user.name};
                <Button onClick={() => authClient.signOut({
                    fetchOptions: {onSuccess: ()=> route.push('/sign-in')}
                })}>
                    Sign Out
                </Button>
            </div>
        </>
    );
}
