import { Store } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Sidebar() {
    return (
        <aside className="px-2 pt-4 shadow-md">
            <div className="flex items-center gap-2">
                <div>
                    <div className="rounded-full border-2 border-border p-3">
                        <Store
                            size={30}
                            className="shrink-0 text-muted-foreground"
                        />
                    </div>
                </div>
                <p className="w-32 truncate font-bold tracking-tighter">
                    Toko Jarwo Sukses
                </p>
            </div>
        </aside>
    )
}

export default Sidebar
