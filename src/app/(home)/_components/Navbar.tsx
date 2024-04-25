import { auth, signOut } from "@/auth"
import AuthOptions from "@/components/AuthOptions"
import NavItemDropdown from "@/components/NavItemDropdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Modal from "@/components/ui/modal"
import { Separator } from "@/components/ui/separator"
import { getNameInitial } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"
import { LogOut, Search, ShoppingBasket, ShoppingCart } from "lucide-react"
import Link, { LinkProps } from "next/link"
import MobileMenu from "./MobileMenu"

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

function NavLinkButton({
    children,
    variant,
    size,
    ...props
}: LinkProps & { children: React.ReactNode } & VariantProps<
        typeof buttonVariants
    >) {
    return (
        <Button variant={variant || 'outline'} size={size} asChild className="justify-start">
            <Link {...props}>{children}</Link>
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
    return (
        <NavItemDropdown
            className="right-0 w-[400px] translate-x-0"
            buttonTrigger={
                <Button variant={"ghost"}>
                    <div className="flex max-w-40 items-center">
                        <Avatar className="mr-2 size-9">
                            <AvatarImage src={image} />
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
                        <AvatarImage src={image} />
                        <AvatarFallback>{getNameInitial(name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-lg font-bold">{name}</p>
                        <p className="font-light text-sm">ROLE: CUSTOMER</p>
                    </div>
                </div>
                <div className="flex w-full justify-around gap-3">
                    <div className="flex flex-1 flex-col gap-2">
                        <NavLinkButton href={"/orders"}>Orders</NavLinkButton>
                        <NavLinkButton href={"/wishlists"}>
                            Wishlists
                        </NavLinkButton>
                    </div>
                    <div>
                        <Separator orientation="vertical" className="h-full" />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <NavLinkButton href={"/settings"}>
                            Settings
                        </NavLinkButton>
                    </div>
                </div>
                <form
                    className="w-full"
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                >
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
