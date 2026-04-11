import type { Request, Response} from 'express'
import Order from '../models/Orders'
import Fruit from '../models/Fruits'

//1. Submit Order (Customer). Accepts the cart data, updates the mongoDB stock, save the order
export async function submitOrder(req: Request, res: Response) {
    try {
        const {customerName, items, totalAmount} = req.body
        const newOrder = new Order({
            customerName,
            items,
            totalAmount,
            status: "Pending"
        })
        const savedOrder = await newOrder.save()

        //update inventory numbers at the same time
        const inventoryUpdates = items.map((item:any) => {
            return Fruit.findByIdAndUpdate(
                item.fruitId, 
                {$inc: {stock : -item.quantity}},
                {returnDocument:'after', runValidators:true}
            )
        })
        await Promise.all(inventoryUpdates)
        res.status(201).json({message: "Order submitted and stock updated successfully", savedOrder})      
    } catch (error) {
        console.log("Error submitting order", error)
        res.status(500).json({message: "Internal server error"})        
    }
}

//2. Get all orders (Owner)
export async function getAllOrders(req: Request, res: Response) {
    try {
        const orders = await Order.find()
        res.status(200).json(orders) 
    } catch (error) {   
        console.log("Error getting all orders", error)
        res.status(500).json({message: "Internal server error"})           
    }
}