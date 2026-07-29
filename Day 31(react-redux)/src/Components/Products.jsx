import { useEffect, useState } from "react";
import axios from "axios"
import { useDispatch } from 'react-redux'
import { addToCart, } from '../cart/cartSlice'
import Navbar from "./Navbar";

const Products = () => {

    const dispatch = useDispatch()

    const [myData, setMyData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('https://dummyjson.com/products')
            setMyData(data.products)
        }
        getData();
    }, [])
    return (
        <>
            <Navbar />
            <div className="grid grid-cols-3 gap-4 px-10 md:px-50 mt-5">

                {myData.map((item) => (
                    <div key={item.id} className="shadow-2xl transform transition duration-300 hover:scale-105 cursor-pointer">
                        <div className="img">
                            <img src={item.thumbnail} alt="" />
                        </div>
                        <div className="content p-3">
                            <h1 className="font-bold text-xl">{item.title}</h1>
                            <p>$ {item.price}</p>
                            <button onClick={() => dispatch(addToCart(item))} className="bg-amber-600 text-white w-full py-1 rounded-2xl cursor-pointer hover:font-bold">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Products
