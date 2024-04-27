import ImageKit from "@/components/ImageKit"
import db from "@/lib/db"
import DashboardCard from "../_components/DashboardCard"
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
    // const salesData = await getSalesData()

    return (
        <div className="w-full max-w-[900px]">
            <DashboardCard title="Sales" subTitle={0} body={0} />
            <MidtransButton />
            <div className="relative h-[400px] w-full">
                <ImageKit
                    alt="basic iamge"
                    src="default-image.jpg"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>
        </div>
    )
}

export default SellerDashboard
