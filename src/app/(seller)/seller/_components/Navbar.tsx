import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bell } from "lucide-react"
import UserPopover from "./UserPopover"
import UserPopoverDropdown from "./UserPopoverDropdown"

function Navbar() {
    return (
        <header className="shadow-sm">
            <nav className="flex h-[70px] items-center justify-between px-10">
                <Link href={"/seller"} className="flex h-full items-center">
                    <div className="flex items-end gap-1">
                        <h1 className="text-2xl font-semibold text-emerald-400">
                            Borong<span>yuk</span>
                        </h1>
                        <span className="text-xl text-muted-foreground pb-[1px]">Seller</span>
                    </div>
                </Link>
                <div className="flex h-full items-center gap-2">
                    <Button
                        asChild
                        variant={"ghost"}
                        className="cursor-pointer"
                    >
                        <div>
                            <Bell />
                        </div>
                    </Button>
                    <div className="group relative flex h-full items-center">
                        <UserPopover />
                        <UserPopoverDropdown />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
