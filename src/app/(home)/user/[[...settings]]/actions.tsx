"use server"

import { auth } from "@/auth"
import db from "@/lib/db"
import {
    UpdateCustomerProfileValues,
    updateCustomerProfileSchema,
} from "@/lib/validations"
import { revalidatePath } from "next/cache"

// To learn more about server actions, watch my YT tutorial: https://www.youtube.com/watch?v=XD5FpbVpWzk

export async function updateCustomerProfile(
    values: UpdateCustomerProfileValues,
) {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
        throw Error("Unauthorized") //if someone tries to hit our server actions from a backend..
        //we can just throw a generic error since this is unlikely scenario
    }

    const { name } = updateCustomerProfileSchema.parse(values)

    await db.user.update({
        where: { id: userId },
        data: { name },
    })

    // it re-renders the assigned path, so the client caching would be cleared and refetched! to ensure up to date data
    revalidatePath('/')
}
