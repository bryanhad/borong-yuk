"use server"

import ImageKit from "imagekit"
/**
 * Uploads to ImageKit!
 *
 * @param   image  Either a url or a File type
 * @param   folder  The folder that the file would be saved into. relative to root.
 * @param   fileName  The name the file would be saved into.
 * @returns The url of the uploaded image.
 */
export default async function uploadToImageKit({
    image,
    folder,
    fileName,
}: {
    image: string | File
    folder: string
    fileName: string
}): Promise<string> {
    // upload File instance to ImageKit!
    const imagekit = new ImageKit({
        publicKey: "public_2CXTqGTU/ICD7fIKi0EpoOiJlKY=",
        privateKey: process.env.IMAGE_KIT_KEY as string,
        urlEndpoint: "https://ik.imagekit.io/borongyuk/",
    })

    let imageToUpload: string | undefined = undefined

    if (image instanceof File) {
        const imageBuffer = await image.arrayBuffer()
        imageToUpload = Buffer.from(imageBuffer).toString("base64")
    } else {
        imageToUpload = image
    }

    // read the File into a Buffer
    return new Promise((resolve, reject) => {
        imagekit.upload(
            {
                folder: `/${folder}/`,
                // convert Buffer into a Base64 encoded string
                file: imageToUpload,
                fileName,
            },
            async (err, res) => {
                if (err || !res) {
                    reject(err)
                } else {
                    resolve(res.url)
                }
            },
        )
    })
}
