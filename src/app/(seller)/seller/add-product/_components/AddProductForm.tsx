"use client"

import LoadingButton from "@/components/LoadingButton"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { addProduct } from "@/lib/actions"
import { capitalizeFirstLetter, cn } from "@/lib/utils"
import { AddProductValues, addProductSchema } from "@/lib/validations"
import { Conditions } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { draftToMarkdown } from "markdown-draft-js"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import RichTextEditor from "./RichTextEditor"
import { useRouter } from "next/navigation"

function AddProductForm() {
    const router = useRouter()
    
    const form = useForm<AddProductValues>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            name: "",
            image: undefined,
            condition: Conditions.New,
            isAvailableForPuchase: true,
        },
    })
    const [selectedImage, setSelectedImage] = useState<string>()

    async function onSubmit(values: AddProductValues) {
        const formData = new FormData()
        Object.entries(values).forEach(([key, value]) => {
            if (value instanceof File === false) {
                formData.append(key, String(value))
            } else {
                formData.append(key, value)
            }
        })
        await addProduct(formData)
        toast.success("Successfully added product!")
        router.push('/seller/products')
    }

    // DONT JUDGE ME :D, AS LONG AS IT! WORKS AM I RITE????
    function handleNumberInputChange(
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (...event: any[]) => void,
        field: keyof AddProductValues,
    ) {
        const value = parseInt(e.target.value)
        if (isNaN(value) || value < 1) {
            onChange(0)
        } else {
            if (value > 0 && String(form.watch(field)).length < 2) {
                form.setValue(field, value)
            } else {
                onChange(value)
            }
        }
        form.trigger(field)
    }

    return (
        <Form {...form}>
            {/* noValidate will disable browser's native validation, cuz we want to use our own JS based valdiation dammit! */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Product&apos;s condition</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-1"
                                >
                                    {(
                                        Object.values(Conditions) as string[]
                                    ).map((condition) => (
                                        <FormItem
                                            key={condition}
                                            className="flex items-center space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <RadioGroupItem
                                                    value={condition}
                                                />
                                            </FormControl>
                                            <FormLabel className="cursor-pointer font-normal">
                                                {capitalizeFirstLetter(
                                                    condition,
                                                )}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <Label
                                // The Editor from wysiwyg doesn't support the ID attribute, so we have to do some workaround to achieve focus on label click.. with this onclick trick!
                                onClick={() => {
                                    // this setFocus also uses the ref that we pass to the component below! so it is important to pass a the field.ref if you want react-hook-form to work properly.
                                    form.setFocus("description")
                                }}
                            >
                                Description
                            </Label>
                            <FormControl>
                                <RichTextEditor
                                    onChange={(draft) =>
                                        field.onChange(draftToMarkdown(draft))
                                    }
                                    // note: ref is neccessary in using react-hook-form, so that whenever ther's a validation error, react-hook-form can automatically focus on that input!
                                    ref={field.ref}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />{" "}
                <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Video Url</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. https://www.youtube.com/watch?v=your_product_video"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="priceInRupiah"
                    render={({ field: { value, ...restOfFieldValues } }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <div className="flex items-center rounded-md border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                    <p className="px-3">Rp</p>
                                    <Input
                                        value={form.watch("priceInRupiah")}
                                        variant="withIcon"
                                        placeholder="Add Product's Price"
                                        {...restOfFieldValues}
                                        onChange={(e) =>
                                            handleNumberInputChange(
                                                e,
                                                restOfFieldValues.onChange,
                                                "priceInRupiah",
                                            )
                                        }
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isAvailableForPuchase"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Product&apos;s availability for purchase
                            </FormLabel>
                            <FormControl>
                                <div>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    {field.value === true
                                        ? `Yes, it's available`
                                        : "No, not right now"}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field: { value, ...restOfFieldValues } }) => (
                        <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                                <Input
                                    value={form.watch("stock")}
                                    placeholder="Product's Stock"
                                    {...restOfFieldValues}
                                    onChange={(e) =>
                                        handleNumberInputChange(
                                            e,
                                            restOfFieldValues.onChange,
                                            "stock",
                                        )
                                    }
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
