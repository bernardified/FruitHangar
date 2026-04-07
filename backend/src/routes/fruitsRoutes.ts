import express from "express"
import { addFruit, getAllFruits, updateFruit } from "../controllers/fruitsController"

const router = express.Router()

router.get('/', getAllFruits)
router.post('/', addFruit)
router.put('/:id', updateFruit)

export default router