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

export interface OrderItem {
    fruitId: string
    quantity: number
}

export interface Order {
    customerName: string
    items: OrderItem[]
    totalAmount: number
}