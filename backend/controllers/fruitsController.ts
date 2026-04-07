import type { Request, Response} from 'express'

//1. Get all fruits (Customer and Owner)
export function getAllFruits (req: Request, res: Response) {
    try {
        res.status(200).json({message: "Fruits inventory received "})
    } catch (error) {
        console.log("Error getting all fruits", error)
        res.status(500).json({message: "Internal server error"})
    }
}

//2. (Optional) Add a  new fruit (Owner)
export function addFruit (req: Request, res:Response) {
    try {
        res.status(201).json({message: "New fruit added successfully"})
    } catch (error) {
        console.log("Error adding fruit", error)
        res.status(500).json({message: "Internal server error"})       
    }
}


//3. (Optional) Update a fruit stock (Owner)
export function updateFruit (req: Request, res:Response) {
    try {
        res.status(200).json({message: "Fruit inventory updated successfully"})       
    } catch (error) {
        console.log("Error updated fruit", error)
        res.status(500).json({message: "Internal server error"})          
    }

}