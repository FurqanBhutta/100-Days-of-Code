import { Link } from "react-router-dom"


const Navbar = () => {
    return (
        <div>
            <nav className=" bg-gray-100 p-5 flex justify-between shadow-lg sticky top-0 z-100">
                <p className="font-extrabold">Title</p>
                <ul className="flex gap-4 font-bold">
                    <Link to={'/'} className="hover:cursor-pointer hover:text-blue-800">Home</Link>
                    <Link to={'/about'} className="hover:cursor-pointer hover:text-blue-800">About</Link>
                    <Link to={'/contact'} className="hover:cursor-pointer hover:text-blue-800">Contant Us</Link>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
