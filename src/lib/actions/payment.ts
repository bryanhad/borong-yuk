"use server"

import midtransClient from "midtrans-client"

// Create Snap API instance
const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY as string,
})

export async function getMidtransTransactionToken(
    productId: string,
    amount: number,
) {
    const transactionToken = await snap.createTransaction({
        transaction_details: {
            gross_amount: amount,
            order_id: productId,
        },
        credit_card: {
            secure: true,
        },
        customer_details: {
            first_name: "budi",
            last_name: "pratama",
            email: "budi.pra@example.com",
            phone: "08111222333",
        },
    })
    
    return transactionToken.token
}
