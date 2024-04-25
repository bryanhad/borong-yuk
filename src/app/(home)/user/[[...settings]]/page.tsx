import { mustLoggedIn, redirectAll } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

async function UserSettingsPage({
    params,
}: {
    params: { settings: string[] }
}) {
    const pathnameArr = params["settings"]

    await redirectAll(pathnameArr, "/user/settings", "settings")

    const user = await mustLoggedIn("/user/settings")

    return <div>UserSettingsPage {JSON.stringify(params)}</div>
}

export default UserSettingsPage
