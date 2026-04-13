import express from "express"
import { getAllOrders, submitOrder } from "../controllers/ordersController.js"

const router = express.Router()

//customer
router.post('/', submitOrder)

//owner
router.get('/', getAllOrders)

export default router 