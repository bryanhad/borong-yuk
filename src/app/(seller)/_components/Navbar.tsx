import Link from "next/link"
import UserPopover from "./UserPopover"
import { Separator } from "@/components/ui/separator"
import MobileMenu from "./MobileMenu"
import NotificationPopover from "./NotificationPopover"

function Navbar() {
    return (
        <header className="h-16 border-b bg-white">
            <nav className="flex h-full justify-between px-4 sm:px-6 md:px-10">
                <Link href={"/"} className="flex items-center">
                    <h1 className="relative text-xl font-bold text-emerald-400 sm:text-2xl md:text-3xl">
                        Borongyuk
                        <span className="absolute bottom-[2px] right-0 translate-x-[110%] text-sm font-light text-black sm:text-lg md:text-xl">
                            Seller
                        </span>
                    </h1>
                </Link>
                <div className="hidden gap-5 lg:flex">
                    <NotificationPopover />
                    <Separator
                        orientation="vertical"
                        className="h-[70%] self-center"
                    />
                    <UserPopover />
                </div>
                <MobileMenu />
            </nav>
        </header>
    )
}

export default Navbar
