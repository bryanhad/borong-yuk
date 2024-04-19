import { Store, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function UserPopoverDropdown() {
    return (
        <div className="absolute bottom-0 right-0 max-h-0 translate-y-full overflow-hidden rounded-b-md shadow-md duration-300 group-hover:max-h-[300px]">
            <div className="flex max-w-96 flex-col gap-2 p-4">
                <UserInfo />
                <Separator />
                <Button asChild variant={"ghost"} className="justify-start">
                    <Link href={"/"} className="font-light">
                        Kembali ke Borongyuk
                    </Link>
                </Button>
                <Separator />
                <div className="flex flex-col gap-3">
                    <Button asChild variant={"ghost"} className="justify-start">
                        <Link
                            href={"seller/settings"}
                            className="font-extrabold"
                        >
                            <Settings size={18} className="mr-2 shrink-0" />
                            Settings
                        </Link>
                    </Button>
                    <Button asChild variant={"ghost"} className="justify-start">
                        <Link href={"/"} className="font-extrabold">
                            <LogOut size={18} className="mr-2 shrink-0" />
                            Logout
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

function UserInfo() {
    return (
        <div className="flex items-center gap-4">
            <div className="w-64 space-y-2">
                <p className="max-w-max truncate font-bold">
                    Bang Jarwo Columbus
                </p>
                <div className="flex items-center gap-2">
                    <Store
                        size={14}
                        className="shrink-0 text-muted-foreground"
                    />
                    <p className="max-w-max truncate text-sm font-light">
                        Toko Jarwo Sukses
                    </p>
                </div>
            </div>
            <div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default UserPopoverDropdown
