import type { Request, Response} from 'express'
import Fruit from '../models/Fruits'

//1. Get all fruits (Customer and Owner)
export async function getAllFruits (req: Request, res: Response) {
    try {
        const fruits = await Fruit.find() 
        res.status(200).json(fruits)
    } catch (error) {
        console.log("Error getting all fruits", error)
        res.status(500).json({message: "Internal server error"})
    } 
}

//2. (Optional) Add a  new fruit (Owner)
export async function addFruit (req: Request, res:Response) {
    try {
        const {name, price, stock, image} = req.body
        const fruit = new Fruit({name, price, stock, image})
        const savedFruit = await fruit.save()
        res.status(201).json({message: "New fruit added successfully", savedFruit})
    } catch (error) {
        console.log("Error adding fruit", error)
        res.status(500).json({message: "Internal server error"})       
    }
}


//3. (Optional) Update a fruit stock (Owner)
export async  function updateFruit (req: Request, res:Response) {
    try {
        const updateData = req.body
        const updatedFruit = await Fruit.findByIdAndUpdate(
            req.params.id,{$set: updateData},
            {returnDocument:'after', runValidators:true})
        if (!updatedFruit) {
            return res.status(404).json({message: "Fruit not found"})    
        }
        res.status(200).json({message: "Fruit inventory updated successfully", updatedFruit})       
    } catch (error) {
        console.log("Error updated fruit", error)
        res.status(500).json({message: "Internal server error"})          
    }

}