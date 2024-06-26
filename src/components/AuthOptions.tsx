import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import React from "react"
import { FcGoogle } from "react-icons/fc"

function AuthOptions({ redirectTo }: { redirectTo?: string }) {
    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signIn("google", {
                        redirectTo,
                    })
                }}
            >
                <Button
                    type="submit"
                    variant={"outline"}
                    className="w-full space-x-2"
                >
                    <FcGoogle />
                    <span>Sign In With Google</span>
                </Button>
            </form>
            <div className="mb-2 mt-6 flex items-center gap-3 text-slate-400">
                <Separator className="flex-1 shrink" />
                <p>or</p>
                <Separator className="flex-1 shrink" />
            </div>
            <form action="">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        id="email"
                        placeholder="bangJarwo@gmail.com"
                    />
                    <Button className="w-full">Sign in with Email</Button>
                </div>
            </form>
        </>
    )
}

export default AuthOptions
