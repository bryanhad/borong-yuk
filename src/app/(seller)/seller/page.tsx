import React from "react"
import DashboardCard from "../_components/DashboardCard"
import db from "@/lib/db"
import MidtransButton from "../_components/MidtransButton"

async function getSalesData() {
    const data = await db.product.aggregate({
        _sum: { priceInRupiah: true },
        _count: true,
    })
    return {
        totalSales: (data._sum.priceInRupiah || 0) / 100,
        numberOfSales: data._count,
    }
}

async function SellerDashboard() {
    const salesData = await getSalesData()

    return (
        <div>
            <DashboardCard title="Sales" subTitle={0} body={0} />
            <MidtransButton/>
        </div>
    )
}

export default SellerDashboard
