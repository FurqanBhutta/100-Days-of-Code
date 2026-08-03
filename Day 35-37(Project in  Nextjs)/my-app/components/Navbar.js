import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-black-900">
                    Recipe<span className="text-red-500">Hub</span>
                </div>
                <ul className="hidden md:flex space-x-8 text-gray-800 font-medium">
                    <li><Link href="/" className="hover:text-red-500">Home</Link></li>
                    <li><Link href="/about" className="hover:text-red-500">About</Link></li>
                    <li><Link href="/contact" className="hover:text-red-500">Contact</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
