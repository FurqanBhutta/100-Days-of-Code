import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-red-500 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold text-white">
            🍽️ RecipeHub
          </h2>

          <p className="mt-4 text-sm leading-7">
            Discover delicious recipes from around the world.
            Browse by category, find your next favorite meal,
            and start cooking today.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-orange-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-orange-400 transition">
                About
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-orange-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories & Social */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 mb-6">
            <a
              href="https://facebook.com"
              target="_blank"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaGithub />
            </a>
          </div>

          <p className="text-sm">
            Made with ❤️ using Next.js & Tailwind CSS
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 py-5 text-center text-sm">
        © {new Date().getFullYear()} RecipeHub. All rights reserved.
      </div>
    </footer>
  );
}