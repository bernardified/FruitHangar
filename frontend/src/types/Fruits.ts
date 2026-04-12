export interface Fruit {
    _id: string
    name: string
    price: number
    stock: number
    image: string
}

export interface CartItem extends Fruit {
    quantity: number
}

//item in the order
export interface OrderItem {
    fruitName: string
    fruitId: string
    quantity: number
}

//order to be submitted to server
export interface Order {
    customerName: string
    items: OrderItem[]
    totalAmount: number
}

//order retrieved from the server
export interface OrderRecord {
    _id: string
    customerName: string
    items: OrderItem[]
    totalAmount: number
    status: string
    createdAt: string
}

export type UserRole = 'CUSTOMER' | 'OWNER'