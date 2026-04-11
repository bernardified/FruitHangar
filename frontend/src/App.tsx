import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import InventoryPage from "./pages/InventoryPage"
import OrdersPage from "./pages/OrdersPage"
import toast from "react-hot-toast"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<InventoryPage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
      </Routes>      
    </div>
  )
}

export default App