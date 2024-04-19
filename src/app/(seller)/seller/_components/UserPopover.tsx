import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function UserPopover() {
    return (
        <Button asChild variant={"ghost"}>
            <div className="flex max-w-[170px] items-center gap-2">
                <Avatar className="size-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="max-w-max truncate">Bang Jarwo Colombus</p>
            </div>
        </Button>
    )
}

export default UserPopover
