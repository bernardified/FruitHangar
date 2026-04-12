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