import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import db from "./lib/db"
import uploadToImageKit from "./lib/server-utils"

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/auth/sign-in",
        error: "/auth/error",
    },
    adapter: PrismaAdapter(db),
    providers: [Google],
    callbacks: {
        async signIn({ user, account }) {
            if (!user.email || !account) return false
            try {
                const loggedInUser = await db.user.findUnique({
                    where: { email: user.email },
                })
                if (loggedInUser) {
                    return true
                }
                if (user.image && user.name && loggedInUser === null) {
                    const newUser = await db.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                        },
                    })
                    const { expires_in, ...restOfAccountFields } = account
                    await db.account.create({
                        data: {
                            userId: newUser.id,
                            ...restOfAccountFields,
                        },
                    })

                    const profilePicUrl = await uploadToImageKit({
                        fileName: `${newUser.name}-${newUser.id}`,
                        folder: "users",
                        image: user.image,
                    })

                    console.log("masuk sini")
                    await db.user.update({
                        where: { email: newUser.email },
                        data: { image: profilePicUrl },
                    })
                    return true
                }
                return false
            } catch (err: any) {
                console.log(err)
                throw new Error(err)
            }
        },
        // session({ session, user }) {
        //     const profilePic = user.image
        //     return session
        // },
    },
})
