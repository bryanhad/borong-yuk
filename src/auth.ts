import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "./lib/db"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        error: "auth/error",
    },
    adapter: PrismaAdapter(db),
    providers: [Google],
})
