"use client"

import { addProduct } from "@/lib/actions"
import { AddProductValues, addProductSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/LoadingButton"
import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

function AddProductForm() {
    const [selectedImage, setSelectedImage] = useState<string>()

    const form = useForm<AddProductValues>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            name: "",
            image: undefined,
        },
    })

    async function onSubmit(values: AddProductValues) {
        alert("woi")
        const formData = new FormData()
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value)
        })
        await addProduct(formData)
        toast.success("Success upload product image!")
    }

    return (
        <Form {...form}>
            {/* noValidate will disable browser's native validation, cuz we want to use our own JS based valdiation dammit! */}
            <form
                className="space-y-4"
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. Batagor Semarang"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    // we have to seperate the value field on the field obj, cuz you cannot assign value to an input with "file" type!
                    render={({ field: { value, ...restOfFieldValues } }) => (
                        <FormItem>
                            <FormLabel>Product Image</FormLabel>
                            <Image
                                src={
                                    selectedImage
                                        ? selectedImage
                                        : "/assets/add-image.png"
                                }
                                height={125}
                                width={125}
                                alt="new product image"
                                className={cn(
                                    "h-[125px] w-[125px] rounded-md border object-cover",
                                    { "p-4": !selectedImage },
                                )}
                            />
                            <FormControl>
                                <Input
                                    {...restOfFieldValues}
                                    type="file"
                                    accept="image/*"
                                    // we have to make some adjustments to our onChange, cuz by default input with "file" type will return a FileList, but our schema expects a File type, so we just have to give the schema a File type instead.
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        restOfFieldValues.onChange(file)
                                        setSelectedImage(
                                            file
                                                ? URL.createObjectURL(file)
                                                : undefined,
                                        )
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton
                    type="submit"
                    loading={form.formState.isSubmitting}
                >
                    Submit Job
                </LoadingButton>
            </form>
        </Form>
    )
}

export default AddProductForm
