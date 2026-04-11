import { Link } from "react-router"

const NavBar = () => {
  return (
    <header>
        <div className="navbar bg-secondary text-primary-content shadow-lg px-4 lg:px-20">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost">
                    <h1 className="text-2xl font-black tracking-tighter">FRUIT HANGAR</h1>
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
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
 