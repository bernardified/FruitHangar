import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router"
import toast from "react-hot-toast"

import { type UserRole } from "./types/Fruits"
import HomePage from "./pages/HomePage"
import OrdersPage from "./pages/OrdersPage"
import NavBar from "./components/NavBar"
import CartDrawer from "./components/CartDrawer"
import { useCart } from "./hooks/useCart"
import useFruits from "./hooks/useFruits"
import { useCheckout } from "./hooks/useCheckout"

const App = () => {
  const [role, setRole] = useState<UserRole>('CUSTOMER')
  const {fruits, isLoading, fetchFruits} = useFruits()
  const {cart, setCart, totalItems, totalAmount, customerName, setCustomerName,
    isDrawerOpen, setIsDrawerOpen, addToCart, updateCartQuantity} = useCart()

  useEffect(() => {
    fetchFruits()
  },[])
  
  const toggleRole = () => {
    setRole(prevRole => 
        prevRole === 'CUSTOMER' ? 'OWNER' : 'CUSTOMER'
    )
    toast(`Access Level: ${role === 'CUSTOMER' ? 'OWNER' : 'CUSTOMER'}`)
  }

  const { handleCheckout } = useCheckout({
    cart, customerName, totalAmount, setCart, setCustomerName, setIsDrawerOpen, fetchFruits})

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