"use client"

import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { getMidtransTransactionToken } from "@/lib/actions/payment"
import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

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
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        async function embedSnap() {
            try {
                const snapToken = await getMidtransTransactionToken(
                    "PRODUCT_ID_2",
                    1,
                )
                if (window.snap) {
                    window.snap.embed(snapToken, {
                        embedId: "snap-container",
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
                const snapHTMLElement = document.getElementById('snap-midtrans')
                if (snapHTMLElement) {
                    console.log('yeah')
                    snapHTMLElement.style.width='800px'
                }
            } catch (err) {
                toast.error(JSON.stringify(err))
                console.log(err)
            }
        }
        if (isModalOpen) {
            embedSnap()
        } else {
            if (window.snap) window.snap.hide()
        }
    }, [isModalOpen])

    return (
        <>
            <Modal
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
            >
                <div id="snap-container" className="wfu"></div>
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
