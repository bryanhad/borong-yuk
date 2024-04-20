import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
    Bell,
    PackageCheck,
    Truck,
    BaggageClaim,
    ChevronRight,
} from "lucide-react"
import Link from "next/link"

function NotificationPopover() {
    return (
        <div className="group relative flex cursor-pointer items-center">
            <Button variant={"ghost"} asChild>
                <div>
                    <Bell size={16} className="shrink-0" />
                </div>
            </Button>
            <div className="absolute bottom-[1px] right-[50%] max-h-0 w-72 translate-x-[50%] translate-y-full overflow-hidden shadow-md duration-300 group-hover:max-h-[400px]">
                <Separator />
                <div className="flex flex-col gap-2 rounded-b-lg bg-white p-4 shadow-md">
                    <div className="flex justify-between">
                        <p className="font-bold">Sale</p>
                        <Link
                            href={"/seller/orders"}
                            className="flex items-center text-sm font-light text-emerald-500"
                        >
                            See more
                            <ChevronRight size={16} className="pt-[4px]" />
                        </Link>
                    </div>
                    <SaleNotification className="justify-between px-0" />
                </div>
            </div>
        </div>
    )
}

export default NotificationPopover

export function SaleNotification({ className }: { className?: string }) {
    return (
        <div className={cn("flex px-5 text-center text-xs", className)}>
            <div className="w-[33%] space-y-2">
                <PackageCheck size={30} className="mx-auto text-amber-400" />
                <p className="text-wrap">Waiting For Approval</p>
            </div>
            <div className="grow space-y-2">
                <BaggageClaim size={30} className="mx-auto text-amber-400" />
                <p className="text-wrap">On Process</p>
            </div>
            <div className="grow space-y-2">
                <Truck size={30} className="mx-auto text-amber-400" />
                <p className="text-wrap">On Delivery</p>
            </div>
        </div>
    )
}
