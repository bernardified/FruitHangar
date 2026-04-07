import type { Request, Response} from 'express'


//1. Submit Order (Customer). Accepts the cart data, updates the mongoDB stock, save the order
export function submitOrder(req: Request, res: Response) {
    try {
        res.status(201).json({message: "Order submitted successfully"})      
    } catch (error) {
        console.log("Error submitting order", error)
        res.status(500).json({message: "Internal server error"})        
    }
}

//2. Get all orders (Owner)
export function getAllOrders(req: Request, res: Response) {
    try {
        res.status(200).json({message: "Orders recevived successfully"}) 
    } catch (error) {
        console.log("Error getting all orders", error)
        res.status(500).json({message: "Internal server error"})           
    }
}