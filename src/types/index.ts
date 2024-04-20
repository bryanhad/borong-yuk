export enum Roles {
    Customer = "CUSTOMER",
    Seller = "SELLER",
    Admin = "ADMIN",
}

export enum Providers {
    Credentials = "CREDENTIALS",
    Google = "GOOGLE",
    Github = "GITHUB",
}

export enum OrderStatus {
    WaitingForApproval = "WAITING_FOR_APPROVAL",
    OnProcess = "ON_PROCESS",
    OnDelivery = "ON_DELIVERY",
    ArrivedOnCustomer = "ARRIVED_ON_CUSTOMER",
    Canceled = "CANCELED"
}