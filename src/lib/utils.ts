import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function formatCurrency(amount: number, currency: "IDR" | "USD") {
    const CURRENCY_FORMATTER = new Intl.NumberFormat(currency === 'IDR' ? 'id-ID' : 'en-US', {
        currency,
        style: 'currency',
        minimumFractionDigits: 0
    })
    return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat('id-ID')

export function formatNumber(amount:number) {
    return NUMBER_FORMATTER.format(amount)
}