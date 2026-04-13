import { useState } from 'react'
import type { Fruit } from "../types/Fruits"

interface FruitCardProps {
    fruit: Fruit
    onAddToCart: (fruit: Fruit, quantity: number) => void
}

const FruitCard = ({ fruit, onAddToCart }: FruitCardProps) => {
    const [quantity, setQuantity] = useState<number>(1)

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value))};

    const handleAddCart = () => {
        onAddToCart(fruit, quantity)
        setQuantity(1)
    }
    return (
        <div className="card bg-base-200 shadow-xl border-2 border-base-300 transition-all">
            <figure className="px-4 pt-4">
            <img 
                src={fruit.image} 
                alt={fruit.name} 
                className="rounded-xl h-48 w-full object-cover"
            />
            </figure>

            <div className="card-body">
            <h2 className="card-title justify-between">
                {fruit.name}
                <div className="badge badge-secondary">${fruit.price.toFixed(2)}</div>
            </h2>

            <div className="form-control mt-4">
                <label className="label py-1">
                    <span className="label-text font-mono font-semibold">In Stock: {fruit.stock}</span>
                    <span className="label-text font-mono">Choose Quantity</span>
                </label>
                <div className="flex gap-2">
                 <input 
                    type="number" 
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={fruit.stock}
                    disabled={fruit.stock === 0}
                    className="input input-bordered input-sm w-full font-mono" 
                    />
                </div>
            </div>

            <div className="card-actions justify-end mt-4">
                <button 
                    className="btn btn-primary btn-sm"
                    disabled={fruit.stock === 0}
                    onClick={() => handleAddCart()}>
                    {fruit.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
            </div>
        </div>
        );
    };

    export default FruitCard
