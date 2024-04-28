import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"

type AuthModalProps = {
    children: React.ReactNode
    className?: string
}

function AuthModal({ children, className }: AuthModalProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md",
                className,
            )}
        >
            {children}
            <Button asChild>
                <Link href={"/"}>Go back to home</Link>
            </Button>
        </div>
    )
}

export default AuthModal
