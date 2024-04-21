import { PrismaClient } from "@prisma/client"
import fs from "fs/promises"
import {
    placeHolderOrders,
    placeholderProducts,
    placeholderStores,
    placeholderUsers,
} from "./placeholder-data"

const prisma = new PrismaClient()

async function seedUsers() {
    await Promise.all(
        placeholderUsers.map(async (user) => {
            await prisma.user.upsert({
                where: {
                    email: user.email,
                },
                update: user,
                create: user,
            })
        }),
    )
    console.log("success!")
}
async function seedStores() {
    await Promise.all(
        placeholderStores.map(async (store) => {
            await prisma.store.upsert({
                where: {
                    id: store.id,
                },
                update: store,
                create: store,
            })
        }),
    )
    console.log("success!")
}
async function seedProducts() {
    await Promise.all(
        placeholderProducts.map(async (product) => {
            await prisma.product.upsert({
                where: {
                    id: product.id,
                },
                update: product,
                create: product,
            })
        }),
    )
    console.log("success!")
}
async function seedOrders() {
    await Promise.all(
        placeHolderOrders.map(async (order) => {
            await prisma.order.upsert({
                where: {
                    id: order.id,
                },
                update: order,
                create: order,
            })
        }),
    )
    console.log("success!")
}

async function main() {
    console.log('Seeding users...')
    await Promise.all([
        fs.mkdir("public/users", { recursive: true }),
        seedUsers(),
    ])
    console.log('Seeding stores...')
    await Promise.all([
        fs.mkdir("public/stores", { recursive: true }),
        seedStores(),
    ])
    console.log('Seeding products...')
    await Promise.all([
        fs.mkdir("public/products", { recursive: true }),
        seedProducts(),
    ])
    console.log('Seeding orders...')
    await seedOrders()
}

main()
    .then(() => {
        console.log("~ SUCCESSFULLY SEEDED DATABASE ~")
    })
    .catch((err) => {
        console.error(err)
    })
