import { auth } from "@/auth"
import AuthOptions from "@/components/AuthOptions"
import { Button } from "@/components/ui/button"
import { redirectAll } from "@/lib/actions/auth"
import Link from "next/link"
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
            <Button asChild>
                <Link href={'/'}>
                    Go back to home
                </Link>
            </Button>
        </div>
    )
}

export default SignInPage
