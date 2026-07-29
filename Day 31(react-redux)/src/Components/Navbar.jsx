import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const cart = useSelector((state) => state.cart)
  return (
    <div>
      <nav className="py-5 px-10 md:px-50 bg-amber-600 text-white font-bold flex justify-between sticky top-0">
        <ul className="flex gap-3">
            <Link to={'/'} className='cursor-pointer hover:font-extrabold'>Home</Link>
            <li className='cursor-pointer hover:font-extrabold'>About</li>
            <li className='cursor-pointer hover:font-extrabold'>Contact</li>
        </ul>
        <button className=" cursor-pointer hover:font-extrabold">
            <Link to={'/cart'}>Cart</Link>
            <span className=" text-white bg-red-400 px-1 rounded-4xl ms-1">{cart.length}</span>
        </button>
      </nav>
    </div>
  )
}

export default Navbar
