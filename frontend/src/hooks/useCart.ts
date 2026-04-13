import { useState } from 'react'
import type { CartItem, Fruit } from '../types/Fruits'
import toast from 'react-hot-toast'

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [customerName, setCustomerName] = useState<string>("")

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

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalAmount = cart.reduce((total, item) => total + (item.quantity * item.price),0)
  return {
    cart, setCart, totalItems, totalAmount, 
    customerName, setCustomerName, 
    isDrawerOpen, setIsDrawerOpen,
    addToCart, updateCartQuantity
  }
}
