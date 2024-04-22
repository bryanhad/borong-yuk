'use server'

import midtransClient from 'midtrans-client'
// Create Snap API instance
let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : process.env.SANDBOX_SERVER_KEY
    });

let parameter = {
    "transaction_details": {
        "order_id": "anjayz-60",
        "gross_amount": 200
    },
    "credit_card":{
        "secure" : true
    },
    "customer_details": {
        "first_name": "budi",
        "last_name": "pratama",
        "email": "budi.pra@example.com",
        "phone": "08111222333"
    }
};



export async function callMidtrans() {
    const transaction = await snap.createTransaction(parameter)
    return  transaction.token as string
}