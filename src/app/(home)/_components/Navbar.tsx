import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

function Navbar() {
    return (
        <header className="h-16 border-b bg-white">
            <nav className="flex h-full justify-between px-4 sm:px-6 md:px-10">
                <Link href={"/"} className="flex items-center">
                    <h1 className="relative text-xl font-bold text-emerald-400 sm:text-2xl md:text-3xl">
                        Borongyuk
                    </h1>
                </Link>
                <div className="hidden gap-5 lg:flex">
                    <div className="flex items-center rounded-md border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <Search />
                        <Input
                            variant="withIcon"
                            placeholder="Add Product's Price"
                        />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
