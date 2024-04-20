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
            <Button variant={"ghost"} type="button">
                <Bell size={16} className="shrink-0" />
            </Button>
            <div className="absolute bottom-[1px] right-[50%] z-40 max-h-0 w-72 translate-x-[50%] translate-y-full overflow-hidden shadow-md duration-300 group-hover:max-h-[400px]">
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
                    <SaleNotifications className="justify-between px-0" />
                </div>
            </div>
        </div>
    )
}

export default NotificationPopover

export function SaleNotifications({ className }: { className?: string }) {
    return (
        <div className={cn("flex px-5 text-center text-xs", className)}>
            <Notification
                description="Waiting For Approval"
                amount={3}
                icon={
                    <PackageCheck
                        size={30}
                        className="mx-auto text-amber-400"
                    />
                }
            />
            <Notification
                description="On Process"
                amount={0}
                icon={
                    <BaggageClaim
                        size={30}
                        className="mx-auto text-amber-400"
                    />
                }
            />
            <Notification
                description="On Delivery"
                amount={12}
                icon={<Truck size={30} className="mx-auto text-amber-400" />}
            />
        </div>
    )
}

function Notification({
    className,
    icon,
    amount,
    description,
}: {
    className?: string
    icon: React.ReactNode
    amount: number
    description: string
}) {
    return (
        <div className={cn("w-[33%] space-y-2", className)}>
            <div className="relative mx-auto max-w-max">
                {icon}
                {amount > 0 && (
                    <p className="absolute right-0 top-0 translate-x-[70%] translate-y-[-20%] rounded-full border-2 border-white bg-red-500 px-[4px] py-[1px] text-[10px] font-semibold text-white">
                        {amount}
                    </p>
                )}
            </div>
            <p className="text-wrap">{description}</p>
        </div>
    )
}
