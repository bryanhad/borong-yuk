import { auth } from "@/auth"
import AuthOptions from "@/components/AuthOptions"
import NavItemDropdown from "@/components/NavItemDropdown"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Modal from "@/components/ui/modal"
import { Separator } from "@/components/ui/separator"
import { Search, ShoppingBasket, ShoppingCart } from "lucide-react"
import Link from "next/link"
import MobileMenu from "./MobileMenu"
import UserNavbarButton from "./UserNavbarButton"

async function Navbar() {
    const session = await auth()
    // TODO: UPLOAD GOOGLE PROFILE PICTURE TO REMOTE IMAGE STORAGE!

    return (
        <header className="peer h-20 border-b bg-white">
            <nav className="flex h-full justify-between gap-6 px-4 sm:px-6 md:px-10 lg:gap-16">
                <Link href={"/"} className="flex items-center">
                    <h1 className="relative text-xl font-bold text-emerald-400 sm:text-2xl md:text-3xl">
                        Borongyuk
                    </h1>
                </Link>
                <div className="flex flex-1 self-center">
                    <SearchBar />
                </div>
                {/* CART, AUTH BUTTON */}
                <div className="hidden gap-6 md:flex">
                    <NavItemDropdown
                        buttonTrigger={
                            <Button variant={"ghost"}>
                                <ShoppingCart size={16} className="shrink-0" />
                            </Button>
                        }
                    >
                        <div className="flex flex-col items-center justify-center gap-2 p-1">
                            <ShoppingBasket
                                className="text-green-400"
                                size={60}
                            />
                            <p className="text-xl font-semibold text-green-400">
                                Your cart is empty!
                            </p>
                            <p className="text-sm">
                                Start shopping by adding stuffs!
                            </p>
                        </div>
                    </NavItemDropdown>
                    <Separator
                        orientation="vertical"
                        className="h-[50%] self-center"
                    />
                    {session?.user ? (
                        <UserNavbarButton
                            name={session.user.name || "Bang Jarwo"}
                            image={session.user.image || ""}
                        />
                    ) : (
                        <Modal
                            buttonCustom={
                                <Button
                                    className="self-center"
                                    variant={"outline"}
                                >
                                    Sign In
                                </Button>
                            }
                        >
                            <div className="flex w-full flex-col py-5">
                                <AuthOptions />
                            </div>
                        </Modal>
                    )}
                </div>
                {/* MOBILE */}
                <MobileMenu />
            </nav>
        </header>
    )
}

export default Navbar

function SearchBar() {
    return (
        <div className="flex w-full items-center rounded-md border px-4 py-1">
            <label htmlFor="q" className="cursor-pointer">
                <Search size={20} className="mr-2 text-slate-400" />
            </label>
            <Input
                id="q"
                variant="withIcon"
                placeholder="Add Product's Price"
            />
        </div>
    )
}
