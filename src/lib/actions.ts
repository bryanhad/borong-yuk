"use server"

import { nanoid } from "nanoid"
import sharp from "sharp"
import { formatToSlug } from "./utils"
import { addProductSchema } from "./validations"
import db from "./db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addProduct(formData: FormData) {
    const values = Object.fromEntries(formData.entries())
    const {
        image,
        name,
        // category,
        condition,
        description,
        isAvailableForPuchase,
        priceInRupiah,
        stock,
        videoUrl,
    } = addProductSchema.parse(values)

    const fileName = `${formatToSlug(name)}-${nanoid(10)}`
    const imageDestinationPath = "/products/" + fileName + ".png"

    const imageBuffer = await image.arrayBuffer()

    try {
        await sharp(imageBuffer)
            .resize(500, 500)
            .toFile("./public" + imageDestinationPath)

        await db.product.create({
            data: {
                name,
                condition,
                description,
                priceInRupiah,
                stock,
                videoUrl,
                isAvailableForPuchase,
                imagePath: imageDestinationPath, 
                storeId: "1236-warung-jarwo-sukses-mantab",
            },
        })
        revalidatePath("/seller/products")
    } catch (err) {
        console.log(err)
    }
}
