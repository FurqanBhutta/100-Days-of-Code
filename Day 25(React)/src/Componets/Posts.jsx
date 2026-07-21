import { useEffect, useState } from "react"
import Card from "./Card"

const Users = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const data = await response.json();
                setData(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    return (
        <div>

            <nav className=" bg-gray-100 p-5 flex justify-between shadow-lg sticky top-0 z-100">
                <p className="font-extrabold">POSTS</p>
                <ul className="flex gap-4 font-bold">
                    <li className="hover:cursor-pointer hover:text-blue-800">Home</li>
                    <li className="hover:cursor-pointer hover:text-blue-800">About</li>
                    <li className="hover:cursor-pointer hover:text-blue-800">Contant Us</li>
                </ul>
            </nav>

            <section className="container mx-auto px-5 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.map((item, index) => (
                        <Card key={index} item={item} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Users
