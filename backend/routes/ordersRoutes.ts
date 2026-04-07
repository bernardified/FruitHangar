import express from "express"

const router = express.Router()

//1. Submit Order (Customer)
router.post('/', async (req, res) => {
    //Logic: accepts the cart data, updates the mongoDB stock, save the order
    res.status(201).json({message: "Order submitted successfully"})
})

//2. Get all orders (Owner)
router.get('/', async (req, res) => {
    //Logic: returns a list of all the orders submitted
    res.status(200).json({message: "Orders recevived successfully"})
})

export default router 