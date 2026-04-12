import { Link } from "react-router"
import { ShoppingBasket } from "lucide-react"

interface NavBarProps {
    cartCount: number
    totalAmount: number
    onOpenDrawer: () => void
}

const NavBar = ({cartCount, totalAmount, onOpenDrawer}:NavBarProps) => {
  return (
    <header>
        <div className="navbar bg-secondary text-primary-content shadow-lg px-4 lg:px-20 flex items-center gap-1">
            {/* Logo container */}
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost">
                    <h1 className="text-2xl font-black tracking-tighter">FRUIT HANGAR</h1>
                </Link>
            </div>
            <div className="flex-none gap-2">
                
            </div>
            {cartCount > 0 && (
                <div className="flex flex-col items-end animate-fade-in">
                    <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest leading-none">
                    Total Cost
                    </span>
                    <span className="text-sm font-black font-mono leading-none mt-1">
                    ${totalAmount.toFixed(2)}
                    </span>
                </div>
            )}

            {/* Actions container */}
            <div className="flex-none gap-4 justify-end">
                {/* Cart Icon */}
                <div className="dropdown dropdown-end">
                    <div className="btn btn-ghost btn-circle" onClick={onOpenDrawer}>
                        <div className="indicator">
                            <ShoppingBasket className="size-8" />
                            {cartCount > 0 && (<span className="badge badge-sm badge-primary indicator-item">{cartCount}</span>)}
                        </div>
                    </div>
                </div>
                
                {/*Profile icon*/}
                <div className="dropdown dropdown-end">
                    <div className="btn btn-ghost btn-circle avatar size-8">
                        <div className="w-10 rounded-full">
                            <img alt="User" src="https://api.dicebear.com/7.x/bottts/svg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </header>
  )
}

export default NavBar
 