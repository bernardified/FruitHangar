import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router"
import toast from "react-hot-toast"
import axios from "axios"

import { type UserRole, type Fruit, type Order, type OrderItem } from "./types/Fruits"
import HomePage from "./pages/HomePage"
import OrdersPage from "./pages/OrdersPage"
import NavBar from "./components/NavBar"
import CartDrawer from "./components/CartDrawer"
import { useCart } from "./hooks/useCart"

const App = () => {
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [role, setRole] = useState<UserRole>('CUSTOMER')
  const {cart, setCart, totalItems, totalAmount, customerName, setCustomerName,
    isDrawerOpen, setIsDrawerOpen, addToCart, updateCartQuantity} = useCart()
  

  const toggleRole = () => {
    setRole(prevRole => 
        prevRole === 'CUSTOMER' ? 'OWNER' : 'CUSTOMER'
    )
    toast(`Access Level: ${role === 'CUSTOMER' ? 'OWNER' : 'CUSTOMER'}`)
  }

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
          role = {role}
          onToggleRole = {toggleRole}
          cartCount={totalItems} 
          totalAmount={totalAmount}
          onOpenDrawer={() => setIsDrawerOpen(true)}/>
        <Routes>
          <Route path="/" element={<HomePage 
            role={role}
            onAddToCart = {addToCart}
            fruits={fruits}
            isLoading={isLoading}/>} />
          <Route path="/admin/orders" element={
              (role=== 'OWNER') ? <OrdersPage /> : <Navigate to="/" />} />
        </Routes>  
      </CartDrawer>    
    </div>
  )
}

export default App