import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import type { Fruit } from "../types/Fruits"


export const useFruits = () => {
    const [fruits, setFruits] = useState<Fruit[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchFruits = async() => {
        try {
        const res = await axios.get("http://localhost:5142/api/fruits")
        setFruits(res.data)
        } catch (error) {
        toast.error("Failed to retrieve fruits inventory")
        console.log("Error fetching fruits: ", error)
        } finally {
        setIsLoading(false)
        }
    }
    
    return {fruits, isLoading, fetchFruits}
}

export default useFruits
