import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { db } from "@/lib/db"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

function SellerProductsPage() {
    return (
        <div className="flex h-full flex-col">
            <div className="mb-6 flex justify-between">
                <h1 className="text-2xl font-bold">Your Products</h1>
                <Button asChild variant="outline">
                    <Link href="/seller/add-product">+ Add Product</Link>
                </Button>
            </div>
            <ProductsTable />
        </div>
    )
}

export default SellerProductsPage

async function getProductsData() {
    const products = await db.product.findMany()
    return products
}

async function ProductsTable() {
    const products = await getProductsData()

    return (
        <Table className="flex-shrink-0">
            <TableHeader>
                <TableRow>
                    <TableHead>Product Info</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="w-[150px]">Stock</TableHead>
                    <TableHead className="w-[80px]">Active</TableHead>
                    <TableHead className="w-[200px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="h-full overflow-y-auto">
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell className="font-medium">
                            <div className="flex gap-3 ">
                                <Image
                                    alt={`image of ${product.name}`}
                                    src={product.imagePath}
                                    height={100}
                                    width={100}
                                    className="rounded-md"
                                />
                                <div className="max-w-[200px] space-y-1">
                                    <p className="truncate font-semibold">
                                        {product.name}
                                    </p>
                                    <p className="truncate font-light">
                                        ID: {product.id}
                                    </p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            {formatCurrency(product.priceInCents || 0, "IDR")}
                        </TableCell>
                        <TableCell>120</TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-center">
                                <Switch
                                    id="airplane-mode"
                                    className="data-[state=checked]:bg-emerald-500"
                                />
                            </div>
                        </TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
