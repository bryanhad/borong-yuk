"use server"

import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export async function mustLoggedIn() {
    const session = await auth()
    const user = session?.user

    if (!user) {
        redirect("/")
    }
    return user
}

export async function signOutAction() {
    await signOut()
}