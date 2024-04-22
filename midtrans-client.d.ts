declare module "midtrans-client" {
    export interface MidtransConfig {
        clientKey?: string
        serverKey: string
        isProduction?: boolean
    }

    export class Snap {
        constructor(config: MidtransConfig)
        createTransaction(
            transaction: Partial<Transaction> & {
                transaction_details: Transaction["transaction_details"]
                credit_card: Transaction["credit_card"]
            },
        ): Promise<TransactionResponse>
    }

    type Transaction = {
        transaction_details: {
            order_id: string
            gross_amount: number
        }
        credit_card: {
            secure: boolean
        }
        item_details: {
            id: string
            price: number
            quantity: number
            name: string
        }[]
        customer_details: {
            first_name?: string
            last_name?: string
            email?: string
            phone?: string
            billing_address?: {
                first_name?: string
                last_name?: string
                email?: string
                phone?: string
                address?: string
                city?: string
                postal_code?: string
                country_code?: string
            }
            shipping_address?: {
                first_name?: string
                last_name?: string
                email?: string
                phone?: string
                address?: string
                city?: string
                postal_code?: string
                country_code?: string
            }
        }
    }

    export interface TransactionDetails {
        order_id: string
        gross_amount: number
    }

    export interface ItemDetail {
        id: string
        price: number
    }

    export interface TransactionResponse {
        token: string
        redirect_url: string
    }
}
