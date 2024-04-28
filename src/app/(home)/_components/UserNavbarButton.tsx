"use client"

import NavItemDropdown from "@/components/NavItemDropdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { signOutAction } from "@/lib/actions/auth"
import { getNameInitial } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"
import { LogOut } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useRef } from "react"

function NavLinkButton({
    children,
    variant,
    size,
    dropDownRef,
    href,
}: {
    href: string
    children: React.ReactNode
    dropDownRef: React.RefObject<HTMLElement>
} & VariantProps<typeof buttonVariants>) {
    const router = useRouter()

    const handleClick = () => {
        if (dropDownRef.current) {
            dropDownRef.current.classList.remove("group/navbarDropdownParent")
            router.push(href)
        }
        setTimeout(() => {
            dropDownRef.current!.classList.add("group/navbarDropdownParent")
        }, 500)
    }

    return (
        <Button
            variant={variant || "outline"}
            size={size}
            onClick={() => handleClick()}
            className="justify-start"
        >
            {children}
        </Button>
    )
}

function UserNavbarButton({
    image,
    name,
}: {
    image: string | undefined
    name: string
}) {
    const pathname = usePathname()
    const dropDownRef = useRef<HTMLElement>(null)
    const signOutFormAction = signOutAction.bind(null, pathname)

    return (
        <NavItemDropdown
            ref={dropDownRef}
            className="right-0 w-[400px] translate-x-0"
            buttonTrigger={
                <Button variant={"ghost"}>
                    <div className="flex max-w-40 items-center">
                        <Avatar className="mr-2 size-9">
                            <AvatarImage className="object-cover" src={image} />
                            <AvatarFallback>
                                {getNameInitial(name)}
                            </AvatarFallback>
                        </Avatar>
                        <p className="max-w-max truncate">{name}</p>
                    </div>
                </Button>
            }
        >
            <div className="flex flex-col items-center justify-center gap-4 p-1">
                <div className="flex w-full items-center gap-2 rounded-md p-3 shadow-md">
                    <Avatar className="mr-2 size-10">
                        <AvatarImage className="object-cover" src={image} />
                        <AvatarFallback>{getNameInitial(name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-lg font-bold">{name}</p>
                        <p className="text-sm font-light">ROLE: CUSTOMER</p>
                    </div>
                </div>
                <div className="flex w-full justify-around gap-3">
                    <div className="flex flex-1 flex-col gap-2">
                        <NavLinkButton
                            dropDownRef={dropDownRef}
                            href={"/orders"}
                        >
                            Orders
                        </NavLinkButton>
                        <NavLinkButton
                            dropDownRef={dropDownRef}
                            href={"/wishlists"}
                        >
                            Wishlists
                        </NavLinkButton>
                    </div>
                    <div>
                        <Separator orientation="vertical" className="h-full" />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <NavLinkButton
                            dropDownRef={dropDownRef}
                            href={"/user/settings"}
                        >
                            Settings
                        </NavLinkButton>
                    </div>
                </div>
                <form className="w-full" action={signOutFormAction}>
                    <Button
                        type="submit"
                        className="flex w-full items-center gap-2"
                        variant={"default"}
                    >
                        <p>Sign Out</p>
                        <LogOut size={16} className="shrink-0" />
                    </Button>
                </form>
            </div>
        </NavItemDropdown>
    )
}

export default UserNavbarButton
