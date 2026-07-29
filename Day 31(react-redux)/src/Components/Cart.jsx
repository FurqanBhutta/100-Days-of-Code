import { useSelector, useDispatch } from 'react-redux'
import {  removeFromCart } from '../cart/cartSlice'
import Navbar from './Navbar'

const Cart = () => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    return (
        <>
            <Navbar />
            <div className=" px-10 md:px-50 mt-5">
                <h1 className='font-bold text-2xl text-center py-5 text-amber-700'>CART</h1>
                {cart.map((item) => (
                    <div key={item.id} className="mb-4 flex shadow-2xl transform transition duration-300 hover:scale-102 cursor-pointer">
                        <div className="img">
                            <img src={item.thumbnail} alt="" />
                        </div>
                        <div className="content p-3">
                            <h1 className="font-bold text-xl">{item.title}</h1>
                            <h1 className=" text-xl">{item.description}</h1>
                            <p>$ {item.price}</p>
                            <button onClick={() => dispatch(removeFromCart(item.id))} className="bg-amber-600 text-white mt-2 px-5 py-1 rounded-2xl cursor-pointer hover:font-bold">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Cart
