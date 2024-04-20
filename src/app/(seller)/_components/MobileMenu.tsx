import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarLinks, SidebarSellerInfo } from "./Sidebar"
import { Separator } from "@/components/ui/separator"
import SidebarLink from "./SidebarLink"
import { Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SaleNotification } from "./NotificationPopover"

function MobileMenu() {
    return (
        <Sheet>
            <SheetTrigger className="px-3 lg:hidden">
                <Avatar className="size-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4 p-0">
                <SidebarSellerInfo className="max-w-[85%] gap-3 p-6" />
                <Separator className="w-[80%] self-center" />
                <SidebarLinks />
                <Separator className="w-[80%] self-center" />
                <SaleNotification />
                <Separator className="w-[80%] self-center" />
                <SidebarLink href={"/seller/settings"} icon={<Settings />}>
                    User Settings
                </SidebarLink>
                <Button
                    asChild
                    variant={"ghost"}
                    className="flex items-center justify-start"
                >
                    <p>
                        <LogOut className="mr-2 shrink-0" />
                        Logout
                    </p>
                </Button>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu
