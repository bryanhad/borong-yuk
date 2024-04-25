import { mustLoggedIn } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

async function UserSettingsPage({ params }: { params: { settings: string[] } }) {
    const pathnameArr = params["settings"]

    if (!pathnameArr) {
        redirect("/user/settings")
    } else if (!pathnameArr[0].includes("settings")) {
        redirect("/user/settings")
    }

    const user = await mustLoggedIn()
    
    return <div>UserSettingsPage {JSON.stringify(params)}</div>
}

export default UserSettingsPage
