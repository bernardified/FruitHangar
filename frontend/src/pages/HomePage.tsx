import { useState, useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import type { Fruit } from '../types/Fruits'
import FruitCard from '../components/FruitCard'

interface HomePageProps {
  onAddToCart: (fruit: Fruit, quantity: number) => void
}

const HomePage = ({onAddToCart}: HomePageProps) => {
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
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
    fetchFruits()
  },[])

  return (
    <div className='min-h-screen'>
      <header className="py-10 px-4 text-center">
        <h1 className="text-5xl font-bold mb-2">Available Stock</h1>
        <p className="text-lg opacity-70">Fresh Daily. Farm to Table</p>
      </header>

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {isLoading ? 
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-rocket loading-lg text-primary"></span>
          </div>: null}
        
        {fruits.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {fruits.map(fruit => (
              <FruitCard 
                key={fruit._id}
                fruit={fruit}
                onAddToCart={onAddToCart}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
