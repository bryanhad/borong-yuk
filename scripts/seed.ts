import {PrismaClient} from '@prisma/client'
import fs from 'fs/promises'
import { placeholderUsers } from './placeholder-data'

const prisma = new PrismaClient()

async function seedUsers() {
    await Promise.all(
        placeholderUsers.map(async (user) => {
                await prisma.user.upsert({
                    where: {
                        email: user.email
                    },
                    update: user,
                    create: user
                })
            }
        )
    )
}
// async function seedUsers() {
//     await Promise.all(
//         placeholderUsers.map(async (user) => {
//                 await prisma.user.upsert({
//                     where: {
//                         email: user.email
//                     },
//                     update: user,
//                     create: user
//                 })
//             }
//         )
//     )
// }

async function main() {
    await fs.mkdir('public/products', {recursive: true})

    // const imagePath = `/products/${}-${}`

    // await Promise.all(


    
    // )
}

main().then(() => {
    console.log('Success!')
}).catch(err => {
    console.error(err)
})