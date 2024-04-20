import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Store, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

function UserPopover() {
    return (
        <div className="group relative flex cursor-pointer items-center">
            <Button variant={"ghost"}>
                <div className="flex max-w-40">
                    <Avatar className="mr-2 size-5">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="max-w-max truncate">
                        Bang Jarwo Supriati Ningrat
                    </p>
                </div>
            </Button>
            <div className="absolute bottom-[1px] right-0 max-h-0 w-72 translate-y-full overflow-hidden shadow-md duration-300 group-hover:max-h-[400px]">
                <Separator />
                <div className="flex flex-col gap-2 rounded-b-lg bg-white p-4 shadow-md">
                    <UserInfo />
                    <Separator />
                    <Button asChild variant={"ghost"} className="justify-start">
                        <Link href={"/"} className="font-light">
                            Kembali ke Borongyuk
                        </Link>
                    </Button>
                    <Separator />
                    <div className="flex flex-col gap-4">
                        <Button
                            asChild
                            variant={"ghost"}
                            className="justify-start"
                        >
                            <Link
                                href={"/"}
                                className="flex items-center font-light"
                            >
                                <Settings size={12} className="mr-2 shrink-0" />
                                User Settings
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant={"ghost"}
                            className="justify-start"
                        >
                            <Link
                                href={"/"}
                                className="flex items-center font-light"
                            >
                                <LogOut size={12} className="mr-2 shrink-0" />
                                Logout
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPopover

function UserInfo() {
    return (
        <div className="flex items-center justify-between gap-4 p-2">
            <div className="max-w-[70%] space-y-2">
                <p className="max-w-max truncate font-bold">
                    Bang Jarwo Supriati Ningrat
                </p>
                <div className="flex items-center">
                    <Store
                        size={20}
                        className="mr-2 shrink-0 text-muted-foreground"
                    />
                    <p className="max-w-max truncate text-sm tracking-tighter">
                        Warung Jarwo Sukses Mantab
                    </p>
                </div>
            </div>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}
