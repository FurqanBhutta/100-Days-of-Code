import Link from "next/link"

const Navbar = () => {
    return (
        <div>
            <nav className="bg-white shadow-md ">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-800">
                        My App
                    </div>
                    <ul className="md:flex space-x-8 text-gray-800 font-medium">
                        <li><Link href="/" className="hover:text-red-500">Home</Link></li>
                        <li><Link href="/about" className="hover:text-red-500">About</Link></li>
                        <li><Link href="/contact" className="hover:text-red-500">Contact</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
