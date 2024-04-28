"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
    UpdateCustomerProfileValues,
    updateCustomerProfileSchema,
} from "@/lib/validations"

import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "next-auth"
import { useForm } from "react-hook-form"
import { updateCustomerProfile } from "./actions"
import LoadingButton from "@/components/LoadingButton"
import ImageKit from "@/components/ImageKit"
import Image from "next/image"
import { useState } from "react"

interface SettingsFormProps {
    user: User
}

export default function SettingsForm({ user }: SettingsFormProps) {
    const [selectedImage, setSelectedImage] = useState<string>()
    const { toast } = useToast()

    const form = useForm<UpdateCustomerProfileValues>({
        resolver: zodResolver(updateCustomerProfileSchema),
        defaultValues: {
            image: undefined,
            name: user.name || "",
        },
    })

    async function onSubmit(values: UpdateCustomerProfileValues) {
        const formData = new FormData()

        Object.entries(values).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value)
            }
        })

        try {
            await updateCustomerProfile(formData)
            toast({ description: "Profile updated!" })
        } catch (error) {
            toast({
                variant: "destructive",
                description: "An error occurred. Please try again.",
            })
        }
    }

    return (
        <main className="px-3 py-10">
            <section className="mx-auto max-w-7xl space-y-6">
                <h1 className="text-3xl font-bold">Settings</h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="max-w-sm space-y-2.5"
                    >
                        <FormField
                            control={form.control}
                            name="image"
                            render={({
                                field: { value, ...restOfFieldValues },
                            }) => (
                                <FormItem>
                                    <FormLabel>Profile Picture</FormLabel>
                                    <div className="h-[150px] w-[150px]">
                                        <Image
                                            src={
                                                selectedImage ||
                                                user.image ||
                                                ""
                                            }
                                            alt={`${user.name}'s profile picture`}
                                            width={150}
                                            height={150}
                                            className="h-full w-full rounded-full border-2 border-input/60 object-cover "
                                        />
                                    </div>
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
                                                        ? URL.createObjectURL(
                                                              file,
                                                          )
                                                        : undefined,
                                                )
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your public username
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter a username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your public username
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <LoadingButton
                            type="submit"
                            loading={form.formState.isSubmitting}
                        >
                            Submit
                        </LoadingButton>
                    </form>
                </Form>
            </section>
        </main>
    )
}
