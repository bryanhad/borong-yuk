import { auth } from "@/auth"
import AuthOptions from "@/components/AuthOptions"
import { redirectAll } from "@/lib/actions/auth"
import { notFound, redirect } from "next/navigation"

async function SignInPage({
    params,
    searchParams,
}: {
    searchParams: { callbackUrl: string }
    params: { "sign-in": string[] }
}) {
    const pathnameArr = params["sign-in"]

    await redirectAll(pathnameArr, '/auth/sign-in', 'sign-in')

    const session = await auth()
    const user = session?.user

    if (user) {
        redirect("/")
    }

    return (
        <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
            <AuthOptions redirectTo={searchParams.callbackUrl} />
        </div>
    )
}

export default SignInPage
