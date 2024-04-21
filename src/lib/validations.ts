import { z } from "zod"

export const imageSchema = z
    .custom<File>()
    .refine((input) => input, "Please select an image to upload")
    .refine((input) => {
        return (
            !input || (input instanceof File && input.type.startsWith("image/"))
        )
    }, "Please select an image file")
    .refine((input) => {
        // must be less than 2 MB
        return input && input.size < 1024 * 1024 * 1
    }, "File must less than 1MB")

export const addProductSchema = z.object({
    name: z
        .string()
        .min(1, "Product name is required.")
        .refine((val) => val.length <= 255, {
            message: "Product's name is too long.",
        }),
    image: imageSchema,
    category: z.string().min(1, "Please pick a category."),
    condition: z.string().min(1, `Please select product's condition.`),
    description: z
        .string()
        .min(250, `Product's description is too short. No bueno.`),
    videoUrl: z.string().url().optional().or(z.literal("")),
    // priceInRupiah: z.coerce
    //     .number()
    //     .min(100, "Minimum price of a product is Rp 100"),
    // status: z.coerce.boolean(),
    // stock: z.coerce.number(),
})

export type AddProductValues = z.infer<typeof addProductSchema>
