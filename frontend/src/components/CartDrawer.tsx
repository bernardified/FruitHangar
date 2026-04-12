import React, { type ReactNode } from 'react'
import type { CartItem } from '../types/Fruits'

interface CartDrawerProps {
    children: ReactNode
    cart: CartItem[]
    totalAmount: number
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

const CartDrawer = ({children, cart, totalAmount, isOpen, setIsOpen }: CartDrawerProps) => {
  return (
    <div className="drawer drawer-end">
      <input 
        id="cart-drawer" 
        type="checkbox" 
        className="drawer-toggle" 
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
   
      <div className="drawer-content flex flex-col">
        {children}
      </div>

      <div className="drawer-side z-[60]">
        <label className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content border-l-2 border-accent">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black uppercase tracking-wide">Shopping Basket</h2>
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setIsOpen(false)}>X</button>
            </div>
        
            <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
            <div className="text-center mt-10 opacity-40">
                <p className="text-4xl mb-2">🧺</p>
                <p className="italic">Basket is empty</p>
            </div>
            ) : (
            cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center mb-4 bg-base-100 p-3 rounded-lg border border-base-300 shadow-sm">
                <div className="flex flex-col">
                    <span className="font-black text-sm">{item.name}</span>
                    <span className="font-bold text-xs opacity-60">{item.quantity} x ${item.price.toFixed(2)}</span>
                </div>
                <span className="font-black text-primary">${(item.quantity * item.price).toFixed(2)}</span>
                </div>
            ))
            )}
        </div>

        <div className="divider"></div>
            <div className="bg-base-300 p-4 rounded-xl">
                <div className="flex justify-between font-black text-neutral">
                    <span>EST. TOTAL:</span>
                    <span className="text-accent">${totalAmount.toFixed(2)}</span>
                </div>
                <button className="btn btn-accent w-full mt-4 shadow-lg uppercase">Checkout</button>
            </div>
        </div>
    </div>
    </div>
  );
};

export default CartDrawer;