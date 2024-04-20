import { cn } from "@/lib/utils"
import React from "react"

function Main({
    classname,
    children,
}: {
    classname?: string
    children: React.ReactNode
}) {
    return (
        <main className={cn("p-6", classname)}>
            {children}
        </main>
    )
}

export default Main
