import { Providers, Roles } from "@/types";
import { Product, User } from "@prisma/client";

// export const placeholderProducts: Omit<Product, "id" |"createdAt" | "updatedAt" |  >[] = [
//     {

//     }
// ]

export const placeholderUsers: Omit<User, "createdAt" | "updatedAt" | "id" >[] = [
    {   
        name: "Bang Jarwo Supriatni Ningrat",
        role: Roles.Seller,
        email: "bangjarwo@gmail.com",
        password: "bangjarwo",
        picturePath: "/users/bang-jarwo.png",
        provider: Providers.Credentials,
    },
    {   
        name: "Jarjit Ala Bin Mail",
        role: Roles.Seller,
        email: "jarjit@gmail.com",
        password: "jarjit",
        picturePath: "/users/jarjit.jpg",
        provider: Providers.Credentials,
    }
]