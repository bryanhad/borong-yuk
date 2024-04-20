import { OrderStatus, Providers, Roles } from "../src/types"
import { Order, Product, Store, User } from "@prisma/client"

export const placeholderStores: Omit<Store, "createdAt" | "updatedAt">[] = [
    {
        id: "1236-warung-jarwo-sukses-mantab",
        imagePath: "/stores/warung-jarwo.png",
        name: "Warung Jarwo Sukses Mantab",
        userId: "1234-bang-jarwo-supriatni-ningrat",
    },
]

export const placeholderProducts: Omit<Product, "createdAt" | "updatedAt">[] = [
    {
        id: "1237-bakso-malang-frozen",
        name: "Bakso Malang Frozen",
        description:
            "Bakso khas malang yang menggiurkan semua kalangan manusia",
        imagePath: "/products/bakso-malang-jarwo.png",
        isAvailableForPuchase: true,
        priceInRupiah: 12000,
        stock: 234,
        storeId: "1236-warung-jarwo-sukses-mantab",
    },
    {
        id: "1238-motor-mio",
        name: "Motor Mio",
        description: "Motor mio bekas saya 27 tahun",
        imagePath: "/products/motor-miu-bang-jarwo.png",
        isAvailableForPuchase: false,
        priceInRupiah: 7550000,
        stock: 2,
        storeId: "1236-warung-jarwo-sukses-mantab",
    },
]

export const placeHolderOrders: Omit<Order, "createdAt" | "updatedAt">[] = [
    {
        id: "1239-aeoufnaeoifne",
        productId: "1237-bakso-malang-frozen",
        status: OrderStatus.WaitingForApproval,
        pricePaidInRupiah: 12000,
        userId: "1235-jarjit-ala-bin-mail",
    },
    {
        id: "1240-qwih0qpeiafro",
        productId: "1238-motor-mio",
        status: OrderStatus.WaitingForApproval,
        pricePaidInRupiah: 7550000,
        userId: "1235-jarjit-ala-bin-mail",
    },
]

export const placeholderUsers: Omit<User, "createdAt" | "updatedAt">[] = [
    {
        id: "1234-bang-jarwo-supriatni-ningrat",
        name: "Bang Jarwo Supriatni Ningrat",
        role: Roles.Seller,
        email: "bangjarwo@gmail.com",
        password: "bangjarwo",
        picturePath: "/users/bang-jarwo.png",
        provider: Providers.Credentials,
    },
    {
        id: "1235-jarjit-ala-bin-mail",
        name: "Jarjit Ala Bin Mail",
        role: Roles.Customer,
        email: "jarjit@gmail.com",
        password: "jarjit",
        picturePath: "/users/jarjit.png",
        provider: Providers.Credentials,
    },
]
