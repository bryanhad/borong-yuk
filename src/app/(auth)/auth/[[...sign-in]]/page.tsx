import { auth } from "@/auth"
import AuthOptions from "@/components/AuthOptions"
import { Button } from "@/components/ui/button"
import { redirectAll } from "@/lib/actions/auth"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import AuthModal from "../../_components/auth-modal"

async function SignInPage({
    params,
    searchParams,
}: {
    searchParams: { callbackUrl: string }
    params: { "sign-in": string[] }
}) {
    const pathnameArr = params["sign-in"]

    await redirectAll(pathnameArr, "/auth/sign-in", "sign-in")

    const session = await auth()
    const user = session?.user

    if (user) {
        redirect("/")
    }

    return (
        <AuthModal>
            <AuthOptions redirectTo={searchParams.callbackUrl} />
        </AuthModal>
    )
}

export default SignInPage
