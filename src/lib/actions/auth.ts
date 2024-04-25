"use server"

import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export async function mustLoggedIn(currentPathname?: string) {
    const session = await auth()
    const user = session?.user

    if (!user) {
        redirect(
            `/auth/sign-in${currentPathname ? `?callbackUrl=${currentPathname}` : ""}`,
        )
    }
    return user
}

export async function signOutAction(currentPath?: string) {
    if (currentPath?.includes("/user/settings")) {
        await signOut({ redirectTo: "/" })
    } else {
        await signOut()
    }
}
