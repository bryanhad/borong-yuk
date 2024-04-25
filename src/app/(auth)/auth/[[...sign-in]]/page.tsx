import { auth } from "@/auth"
import { notFound, redirect } from "next/navigation"

async function SignInPage({ params }: { params: { "sign-in": string[] } }) {
    const pathnameArr = params["sign-in"]

    if (!pathnameArr) {
        redirect("/auth/sign-in")
    } else if (!pathnameArr[0].includes("sign-in")) {
        notFound()
    }

    const session = await auth()
    const user = session?.user

    if (user) {
        redirect("/")
    }

    return <div>SignInPage {JSON.stringify(params["sign-in"])}</div>
}

export default SignInPage
