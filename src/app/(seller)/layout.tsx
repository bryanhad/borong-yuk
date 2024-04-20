import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "@/app/globals.css"
import { cn } from "@/lib/utils"
import { FlashToast } from "@/lib/toast"
import Navbar from "./_components/Navbar"
import Sidebar from "./_components/Sidebar"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})
export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "flex min-h-screen flex-col bg-slate-100 font-sans antialiased",
                    fontSans.variable,
                )}
            >
                <Navbar />
                <div className="flex flex-col lg:flex-row flex-1">
                    <Sidebar />
                    {children}
                </div>
                <FlashToast />
            </body>
        </html>
    )
}
