import { type ReactNode } from 'react'
import type { CartItem } from '../types/Fruits'
import { ShoppingBag, ShoppingBasket, ShoppingBasketIcon } from 'lucide-react'

interface CartDrawerProps {
    children: ReactNode
    cart: CartItem[]
    totalAmount: number
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    updateQuantity: (id: string, difference: number) => void
    customerName: string
    setCustomerName: (name:string) => void
    onCheckout: () => void
}

const CartDrawer = ( cartProps: CartDrawerProps) => {
  return (
    <div className="drawer drawer-end z-[1000]">
      <input 
        id="cart-drawer" 
        type="checkbox" 
        className="drawer-toggle" 
        checked={cartProps.isOpen}
        onChange={(e) => cartProps.setIsOpen(e.target.checked)}
      />
   
      <div className="drawer-content flex flex-col">
        {cartProps.children}
      </div>

      <div className="drawer-side z-[1001]">
        <label className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content border-l-2 border-accent">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black uppercase tracking-wide">Shopping Basket</h2>
                <button className="btn btn-sm btn-circle btn-ghost" onClick={() => cartProps.setIsOpen(false)}>X</button>
            </div>
        
            <div className="flex-1 overflow-y-auto">
            {cartProps.cart.length === 0 ? (
            <div className=" flex flex-col text-center mt-10 opacity-40 items-center justify-center">
                <ShoppingBasket className='size-10'/>
                <p className="italic">Basket is empty</p>
            </div>
            ) : (
            cartProps.cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center mb-4 bg-base-100 p-3 rounded-lg border border-base-300 shadow-sm">
                <div className="flex flex-col">
                    <span className="font-black text-sm">{item.name}</span>
                    <span className="font-bold text-xs opacity-60">${item.price.toFixed(2)} / unit</span>
                </div>

                <div className='flex items-center gap-3'>
                    <div className="join border border-base-300">
                        <button className='join-item btn btn-sx-btn-ghost' 
                            onClick={() => cartProps.updateQuantity(item._id, -1)}>-</button>
                        <button className='join-item btn btn-sx-btn-ghost' 
                            onClick={() => cartProps.updateQuantity(item._id, 1)} 
                            disabled={item.quantity >= item.stock}>+</button>
                    </div> 
                </div>

                <span className="font-black text-primary">${(item.quantity * item.price).toFixed(2)}</span>
                </div>)) 
            )}
        </div>

        <div className="divider"></div>
            <div className='form-control w-full pb-4' >
                <label className='label py-1'>
                    <span className='label-text-alt font-bold uppercase-widest'>
                        Customer Name
                    </span>
                </label>
                <input 
                    type="text"
                    placeholder="Enter your name"
                    className='input input-bordered input-sm w-full font-sans'
                    value={cartProps.customerName}
                    onChange={event => cartProps.setCustomerName(event.target.value)}/>
            </div>
            <div className="bg-base-300 p-4 rounded-xl">
                <div className="flex justify-between font-black text-neutral">
                    <span>TOTAL COST:</span>
                    <span className="text-accent">${cartProps.totalAmount.toFixed(2)}</span>
                </div>
                <button className="btn btn-accent w-full mt-4 shadow-lg uppercase"
                    onClick={cartProps.onCheckout}>Checkout</button>
            </div>
        </div>
    </div>
    </div>
  );
};

export default CartDrawer;