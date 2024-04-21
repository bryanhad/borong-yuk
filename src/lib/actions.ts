"use server"

import { nanoid } from "nanoid"
import sharp from "sharp"
import { formatToSlug } from "./utils"
import { addProductSchema } from "./validations"

export async function addProduct(formData: FormData) {
    console.log("masuk")
    const values = Object.fromEntries(formData.entries())
    const { image, name } = addProductSchema.parse(values)

    const fileName = `${formatToSlug(name)}-${nanoid(10)}`
    const imageDestinationPath = "/products/" + fileName + ".png"

    const imageBuffer = await image.arrayBuffer()

    try {
        await sharp(imageBuffer)
            .resize(500, 500)
            .toFile("./public" + imageDestinationPath)
    } catch (err) {
        console.log(err)
    }
}
