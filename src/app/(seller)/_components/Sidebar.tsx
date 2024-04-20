import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import SidebarLink from "./SidebarLink"
import { Home, Package2, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"

function Sidebar() {
    return (
        <aside className="w-64 bg-white hidden shadow-md lg:block">
            <SidebarSellerInfo />
            <Separator className="mb-4" />
            <SidebarLinks />
        </aside>
    )
}

export default Sidebar

export function SidebarLinks({ className }: { className?: string }) {
    return (
        <div className={cn("overflow-hidden", className)}>
            <SidebarLink icon={<Home />} href={"/seller"}>
                Home
            </SidebarLink>
            <SidebarLink icon={<Package2 />} href={"/seller/products"}>
                Products
            </SidebarLink>
            <SidebarLink icon={<ClipboardList />} href={"/seller/orders"}>
                Orders
            </SidebarLink>
        </div>
    )
}

export function SidebarSellerInfo({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "flex items-center justify-between gap-2 p-4",
                className,
            )}
        >
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="truncate text-sm font-bold">
                Warung Jarwo Sukses Mantab
            </p>
        </div>
    )
}
