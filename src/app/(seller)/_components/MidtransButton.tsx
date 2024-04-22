"use client"

import { Button } from "@/components/ui/button"
import { callMidtrans } from "@/lib/actions/payment"
import { loadScript } from "@/lib/utils"
import Script from "next/script"
import { useEffect } from "react"
import { toast } from "sonner"

function MidtransButton() {
    useEffect(() => {
        function tambahinEventListenerKeButton() {
            const button = document.getElementById("button-midtrans")
            if (button) {
                button.addEventListener("click", () => {
                    alert("WEI")
                    munculinModalMidtrans()
                })
            }
        }

        const munculinModalMidtrans = async () => {
            // Once the script is loaded, you can call the function provided by the script
            // Assuming the function provided by the script is named `libraryFunction`
            const snapToken = await callMidtrans()
            window.snap.pay(snapToken, {
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

        // Load the script dynamically
        loadScript(
            "https://app.sandbox.midtrans.com/snap/snap.js",
            tambahinEventListenerKeButton,
        )
    }, [])

    return (
        <>
            <Button id="button-midtrans">PRESS MEEEE</Button>
        </>
    )
}

export default MidtransButton

export function MidtransModal() {
    return <div id="snap-container"></div>
}
