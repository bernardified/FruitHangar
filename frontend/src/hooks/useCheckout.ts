import toast from "react-hot-toast"
import type { CartItem, Order, OrderItem } from "../types/Fruits"
import axios from "axios"

interface CheckoutProps {
    cart: CartItem[]
    setCart: (cart: CartItem[]) => void
    customerName: string
    setCustomerName: (name: string) => void
    totalAmount: number
    setIsDrawerOpen: (isOpen: boolean) => void
    fetchFruits: () => Promise<void> //refresh inventory after checkout
}

export const useCheckout = (props:CheckoutProps) => {
    const handleCheckout = async () => {
        if(!props.customerName.trim()){
            toast.error("Please input your name before submitting order")
            return
        }
        if (props.cart.length === 0) {
            toast.error("Add a fruit to the basket before checking out!")
            return
        }

        const sanitisedItems: OrderItem[] = props.cart.map(item => ({
            fruitName: item.name, fruitId: item._id, quantity: item.quantity}))
        const orderData:Order = {
            customerName: props.customerName,
            items: sanitisedItems,
            totalAmount: props.totalAmount}
        try {
            await axios.post("http://localhost:5142/api/orders", orderData)
            await props.fetchFruits() //fetch again to uupdate stock count 

            toast.success(`Order submitted for ${props.customerName}`)
            props.setCart([])
            props.setCustomerName("")
            props.setIsDrawerOpen(false)
        } catch (error) {
            console.log("Error posting order", error)
            toast.error("Failed to submit order")
        }
    }
    return { handleCheckout }
}
