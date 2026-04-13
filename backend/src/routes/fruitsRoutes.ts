import express from "express"
import { addFruit, getAllFruits, updateFruit } from "../controllers/fruitsController.js"

const router = express.Router()

//customer
router.get('/', getAllFruits)

//owner
router.post('/', addFruit)
router.put('/:id', updateFruit)

export default router