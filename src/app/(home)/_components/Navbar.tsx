import NavItemDropdown from "@/components/NavItemDropdown"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingBasket} from "lucide-react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import MobileMenu from "./MobileMenu"
import AuthButtons from "./AuthButtons"

function Navbar() {
    return (
        <header className="peer h-20 border-b bg-white">
            <nav className="flex h-full justify-between gap-6 lg:gap-16 px-4 sm:px-6 md:px-10">
                <Link href={"/"} className="flex items-center">
                    <h1 className="relative text-xl font-bold text-emerald-400 sm:text-2xl md:text-3xl">
                        Borongyuk
                    </h1>
                </Link>
                <div className="flex flex-1 self-center">
                    <SearchBar />
                </div>
                {/* CART, AUTH BUTTON */}
                <div className="hidden md:flex gap-6">
                    <NavItemDropdown
                        buttonTrigger={
                            <Button variant={"ghost"}>
                                <ShoppingCart size={16} className="shrink-0" />
                            </Button>
                        }
                    >
                        <div className="p-1 gap-2 flex flex-col items-center justify-center">
                            <ShoppingBasket className="text-green-400" size={60}/>
                            <p className="text-green-400 text-xl font-semibold">Your cart is empty!</p>
                            <p className="text-sm">Start shopping by adding stuffs!</p>
                        </div>
                    </NavItemDropdown>
                    <Separator
                        orientation="vertical"
                        className="h-[50%] self-center"
                    />
                    <div className="space-x-3 self-center">
                      <AuthButtons/>
                    </div>
                </div>
                {/* MOBILE */}
                <MobileMenu/>
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
