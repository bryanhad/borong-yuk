import { cn } from "@/lib/utils"
import React, { ComponentProps } from "react"

type TitleProps = {} & ComponentProps<"h1">

function Title({ children, className, ...props }: TitleProps) {
    return (
        <h1 className={cn("text-lg font-bold xl:text-2xl", className)}>
            {children}
        </h1>
    )
}

export default Title
