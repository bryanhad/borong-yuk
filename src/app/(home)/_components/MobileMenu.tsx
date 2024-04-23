import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScanFace, Menu } from "lucide-react"
import Link from "next/link"
import AuthButtons from "./AuthButtons"

function MobileMenu() {
    return (
        <Sheet>
            <SheetTrigger className="px-3 md:hidden">
                <Button asChild variant={"ghost"}>
                    <div>
                        <Menu size={22} className="shrink-0" />
                    </div>
                </Button>
            </SheetTrigger>
            <SheetContent
                side={"bottom"}
                className="flex h-[100vh] flex-col gap-4 p-0"
            >
                <div className="p-4">
                    <p className="text-xl font-bold">Main Menu</p>
                </div>
                <Separator className="self-center " />
                <ScanFace
                    size={140}
                    className="shrink-0 self-center text-green-400"
                />
                <p className="text-center text-2xl font-bold text-green-400">
                    Consider Logging in!
                </p>
                <div className="flex justify-evenly gap-4 p-4">
                    <AuthButtons />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu
