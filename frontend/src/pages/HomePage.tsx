import type { Fruit, UserRole } from '../types/Fruits'
import FruitCard from '../components/FruitCard'

interface HomePageProps {
  role:UserRole
  fruits:Fruit[]
  isLoading: boolean
  onAddToCart: (fruit: Fruit, quantity: number) => void
}

const HomePage = (homeProps: HomePageProps) => {

  return (
    <div className='min-h-screen'>
      <header className="pt-10 px-4 text-center">
        <h1 className="text-5xl font-bold mb-2">Available Stock</h1>
        <p className="text-lg opacity-70">Fresh Daily. Farm to Table</p>
      </header>

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {homeProps.isLoading ? 
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-rocket loading-lg text-primary"></span>
          </div>: null}
        
        {homeProps.fruits.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {homeProps.fruits.map(fruit => (
              <FruitCard 
                key={fruit._id}
                fruit={fruit}
                onAddToCart={homeProps.onAddToCart}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
