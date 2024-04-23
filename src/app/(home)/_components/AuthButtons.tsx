import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

function AuthButtons() {
    return (
        <>
            <Button
                variant={"outline"}
                asChild
                className="max-w-[200px] flex-1"
            >
                <Link href={"/login"}>Log In</Link>
            </Button>
            <Button asChild className="max-w-[200px] flex-1">
                <Link href={"/sign-up"}>Sign Up</Link>
            </Button>
        </>
    )
}

export default AuthButtons
