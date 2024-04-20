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
}

async function main() {
    await Promise.all([
        fs.mkdir("public/users", { recursive: true }),
        seedUsers(),
    ])
    console.log("Successfully seeded users")
    await Promise.all([
        fs.mkdir("public/stores", { recursive: true }),
        seedStores(),
    ])
    console.log("Successfully seeded stores")
    await Promise.all([
        fs.mkdir("public/products", { recursive: true }),
        seedProducts(),
    ])
    console.log("Successfully seeded products")
    await seedOrders()
    console.log("Successfully seeded orders")
}

main()
    .then(() => {
        console.log("SUCCESSFULLY SEEDED DATABASE")
    })
    .catch((err) => {
        console.error(err)
    })
