"use client"

import imageKitLoader from "@/lib/image-kit-loader"
import Image, { ImageLoaderProps, ImageProps } from "next/image"

const ImageKit = ({ alt, sizes, height, width, ...props }: ImageProps) => {
    return (
        <Image
            loader={imageKitLoader}
            alt={alt}
            sizes={sizes}
            height={height}
            width={width}
            {...props}
        />
    )
}

export default ImageKit
