import { useEffect, useState } from "react"
import { Route, Routes } from "react-router"
import toast from "react-hot-toast"
import axios from "axios"

import type { CartItem, Fruit, Order, OrderItem } from "./types/Fruits"
import HomePage from "./pages/HomePage"
import OrdersPage from "./pages/OrdersPage"
import NavBar from "./components/NavBar"
import CartDrawer from "./components/CartDrawer"


const App = () => {
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [customerName, setCustomerName] = useState<string>("")

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

  useEffect(() => {
    fetchFruits()
  },[])

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
  const updateCartQuantity = (fruitId: string, difference: number) => {
    try {
      setCart(prevCart => {
        const newCart = prevCart.map(item => {
          if(item._id === fruitId)  {
            return {...item, quantity: Math.min(item.quantity + difference, item.stock)}
          }
          return item
        })
        return newCart.filter(item => item.quantity > 0)})
    } catch (error) {
      console.log("Error updating quantity in cart", error)
    }
  }

  const handleCheckout = async () => {
    if(!customerName.trim()){
      toast.error("Please input your name before submitting order")
      return
    }
    if (cart.length === 0) {
      toast.error("Add a fruit to the basket before checking out!")
      return
    }

    const sanitisedItems: OrderItem[] = cart.map(item => ({
      fruitName: item.name, fruitId: item._id, quantity: item.quantity}))
    const orderData:Order = {
      customerName: customerName,
      items: sanitisedItems,
      totalAmount: totalAmount}
    try {
      await axios.post("http://localhost:5142/api/orders", orderData)
      await fetchFruits() //fetch again to uupdate stock count 

      toast.success(`Order submitted for ${customerName}`)
      setCart([])
      setCustomerName("")
      setIsDrawerOpen(false)
    } catch (error) {
      console.log("Error posting order", error)
      toast.error("Failed to submit order")
    }
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalAmount = cart.reduce((total, item) => total + (item.quantity * item.price),0)

  return (
    <div>
      <CartDrawer 
        cart={cart}
        totalAmount={totalAmount}
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        updateQuantity={updateCartQuantity}
        customerName={customerName}
        setCustomerName={setCustomerName}
        onCheckout={handleCheckout}>
        <NavBar 
          cartCount={totalItems} 
          totalAmount={totalAmount}
          onOpenDrawer={() => setIsDrawerOpen(true)}/>
        <Routes>
          <Route path="/" element={<HomePage 
            onAddToCart = {addToCart}
            fruits={fruits}
            isLoading={isLoading}/>} />
          <Route path="/admin/orders" element={<OrdersPage />} />
        </Routes>  
      </CartDrawer>    
    </div>
  )
}

export default App