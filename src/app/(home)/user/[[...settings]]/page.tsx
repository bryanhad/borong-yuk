import { mustLoggedIn, redirectAll } from "@/lib/actions/auth"
import { redirect } from "next/navigation"
import {User} from 'next-auth'
import SettingsForm from "./SettingsForm"

async function UserSettingsPage({
    params,
}: {
    params: { settings: string[] }
}) {
    const pathnameArr = params["settings"]

    await redirectAll(pathnameArr, "/user/settings", "settings")

    const user = await mustLoggedIn("/user/settings")

    return <div>
        <SettingsForm user={user}/>
    </div>
}

export default UserSettingsPage
