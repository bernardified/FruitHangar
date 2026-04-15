import { Link } from "react-router"
import { ShoppingBasket, User, UserCog } from "lucide-react"
import type { UserRole } from "../types/Fruits"

interface NavBarProps {
    role: UserRole
    onToggleRole: () => void
    cartCount: number
    totalAmount: number
    onOpenDrawer: () => void
}

const NavBar = (nav:NavBarProps) => {
  return (
    <div className="navbar bg-secondary text-primary-content shadow-lg px-4 lg:px-20 flex items-center gap-1 sticky top-0 z-[100] backdrop-blur-lg">
        {/* Logo container */}
        <div className="flex-1">
            <Link to={"/"} className="btn btn-ghost">
                <h1 className="text-2xl font-black tracking-tighter">FRUIT HANGAR</h1>
            </Link>
        </div>
        

        {nav.cartCount > 0 && (
            <div className="flex flex-col items-end animate-fade-in">
                <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest leading-none">
                Total Cost
                </span>
                <span className="text-sm font-black font-mono leading-none mt-1">
                ${nav.totalAmount.toFixed(2)}
                </span>
            </div>
        )}

        {/* Actions container */}
        <div className="flex-none gap-4 justify-end">
            {/* Admin dashboard. Hidden if userRole === 'CUSTOMER'*/}    
            {nav.role === 'OWNER' && (
                <Link to="/admin/orders" className="btn btn-ghost btn-sm font-black text-sm">
                    ADMIN DASHBOARD
                </Link>)}

            {/* Cart Icon. Hidden if userRole === 'OWNER'*/}
            {nav.role === 'CUSTOMER' && <div className="dropdown dropdown-end">
                <div className="btn btn-ghost btn-circle" onClick={nav.onOpenDrawer}>
                    <div className="indicator">
                        <ShoppingBasket className="size-8" />
                        {nav.cartCount > 0 && (<span className="badge badge-sm badge-primary indicator-item">{nav.cartCount}</span>)}
                    </div>
                </div>
            </div>}
            
            {/*Profile icon*/}
            <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar size-8">
                    <div className="w-10 rounded-full">
                        {nav.role === 'CUSTOMER' ? <User className="size-8"/> : <UserCog className="size-8"/>}
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-300">
                    <li className="menu-title opacity-80 uppercase text-[10px]">Current: {nav.role}</li>
                    <li><button onClick={nav.onToggleRole} className="font-bold">Switch Role</button></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default NavBar
 