"use client"

import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { getMidtransTransactionToken } from "@/lib/actions/payment"
import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Loader2, CircleX } from "lucide-react"

// extend the Window type to have the snap function available
declare global {
    interface Window {
        snap?: {
            embed: (
                token: string,
                options: {
                    embedId: string
                    onSuccess(res: any): void
                    onPending(res: any): void
                    onError(res: any): void
                    onClose(): void
                },
            ) => void
            hide: () => void
        }
    }
}

function MidtransButton() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSnapError, setIsSnapError] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        async function embedSnap() {
            try {
                const snapToken = await getMidtransTransactionToken(
                    "PRODUCT_ID_3",
                    1,
                )
                if (window.snap) {
                    window.snap.embed(snapToken, {
                        embedId: "snap-container", //the Id of the html div.
                        onSuccess: function (result) {
                            // alert("BERHASIL")

                            console.log("success")
                            console.log(result)
                        },
                        onPending: function (result) {
                            // alert("PENDING")
                            console.log("pending")
                            console.log(result)
                        },
                        onError: function (result) {
                            // alert("GAGAL :(")
                            console.log("error")
                            console.log(result)
                        },
                        onClose: function () {
                            // alert("KOK DI CLOSE??")
                            console.log(
                                "customer closed the popup without finishing the payment",
                            )
                        },
                    })
                }
            } catch (err) {
                setIsSnapError(true)
                toast.error(JSON.stringify(err))
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        if (isModalOpen) {
            setIsLoading(true)
            embedSnap()
        } else {
            if (window.snap) {
                window.snap.hide()
                setIsSnapError(false)
            }
        }
    }, [isModalOpen])

    return (
        <>
            <Modal
                disableDefaultCloseButton
                open={isModalOpen}
                onOpenChange={async () => {
                    if (isModalOpen) {
                        setIsModalOpen((prev) => !prev)
                    }
                }}
                buttonCustom={
                    <Button
                        ref={buttonRef}
                        onClick={() => {
                            setIsModalOpen((prev) => !prev)
                        }}
                        disabled={isButtonDisabled}
                    >
                        SHOW SNAP MODAL
                    </Button>
                }
                className="p-0"
            >
                <div id="snap-container" className="flex min-h-[70vh] w-full">
                    {isLoading ? (
                        <div className="flex flex-1 items-center justify-center">
                            <Loader2 size={60} className="animate-spin" />
                        </div>
                    ) : (
                        isSnapError && <ErrorModalContent />
                    )}
                </div>
            </Modal>
            <Script
                strategy="afterInteractive"
                src={"https://app.sandbox.midtrans.com/snap/snap.js"}
                onLoad={() => {
                    setIsButtonDisabled(false)
                }}
                type="text/javascript"
                data-client-key={
                    process.env.NEXT_PUBLIC_MIDTRANS_SANDBOX_CLIENT_KEY
                }
            />
        </>
    )
}

export default MidtransButton

function ErrorModalContent() {
    return (
        <div className="flex flex-1 flex-col items-center space-y-2 text-destructive">
            <CircleX size={110} />
            <p className="text-xl font-semibold">Oh noose!</p>
            <p>Something went wrong :(</p>
        </div>
    )
}
