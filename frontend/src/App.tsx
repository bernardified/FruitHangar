import { useState } from "react"
import { Route, Routes } from "react-router"

import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import InventoryPage from "./pages/InventoryPage"
import OrdersPage from "./pages/OrdersPage"
import type { CartItem, Fruit } from "./types/Fruits"
import toast from "react-hot-toast"


const App = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const addToCart = (fruit: Fruit, quantity: number) => {
    try {
      setCart(prevCart => {
        //update quantity of existing fruit in cart, if not just add the new item
        const existingItem = prevCart.find(item => item._id === fruit._id)
        if (existingItem) {
          return prevCart.map(item => item._id === fruit._id ? {
              ...item,
              quantity: item.quantity + quantity} : item)
        }
        return [...prevCart, {...fruit, quantity}]
      })
      toast.success("Added to cart!")   
    } catch (error) {
        console.log("Error adding to cart", error)
        toast.error("Failed adding to cart")
    }
  }
  console.log(cart)
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage onAddToCart = {addToCart}/>} />
        <Route path="/cart" element={<CartPage cart={cart} />} />
        <Route path="/admin" element={<InventoryPage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
      </Routes>      
    </div>
  )
}

export default App