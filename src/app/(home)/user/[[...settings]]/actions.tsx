"use server"

import { auth } from "@/auth"
import db from "@/lib/db"
import uploadToImageKit from "@/lib/server-utils"
import { updateCustomerProfileSchema } from "@/lib/validations"
import ImageKit from "imagekit"
import { revalidatePath } from "next/cache"

// To learn more about server actions, watch my YT tutorial: https://www.youtube.com/watch?v=XD5FpbVpWzk

export async function updateCustomerProfile(formData: FormData) {
    const session = await auth()
    const user = session?.user
    if (!user?.id) {
        throw Error("Unauthorized") //if someone tries to hit our server actions from a backend..
        //we can just throw a generic error since this is unlikely scenario
    }

    const values = Object.fromEntries(formData.entries())

    const { name, image } = updateCustomerProfileSchema.parse(values)

    let newProfilePicUrl: string | undefined = undefined

    if (image) {
        newProfilePicUrl = await uploadToImageKit({
            image,
            folder: "users",
            fileName: `${user.name}-${user.id}`,
        })
    }

    console.log(newProfilePicUrl)
    await db.user.update({
        where: { id: user.id },
        data: { name, image: newProfilePicUrl },
    })

    // it re-renders the assigned path, so the client caching would be cleared and refetched! to ensure up to date data
    revalidatePath("/")
}
