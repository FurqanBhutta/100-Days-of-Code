import { useState, useEffect } from "react";
import axios from "axios";

const Todos = ({ selectedList }) => {
    const [data, setData] = useState({})
    const [item, setItem] = useState("")

    const getData = async () => {
        const { data } = await axios.get("http://localhost:3000/" + selectedList)
        setData(data);
        console.log(data.items)
    }

    const handleSubmit = async (e) => {
        try {
            const response = await axios.post(`http://localhost:3000/${selectedList}`, {item: item});
            setItem("")
            getData();
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            console.log("Hello")
            const response = await axios.post(`http://localhost:3000/deleteItem/${selectedList}/${id}`)
            getData()
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, [selectedList])

    return (
        <div className="h-screen min-w-100 bg-gray-300 mt-5 rounded-2xl ">
            <h1 className="font-bold text-2xl text-center py-5">{data.title}</h1>
            <div className="border-t-2 border-b-2 p-4 border-gray-700 ">
                <h2 className="font-bold ">Add a Todo</h2>
                <input type="text" value={item} onChange={(e) => setItem(e.target.value)} className="w-3/4 bg-white mt-2 rounded-2xl px-3 py-1 focus:outline-hidden focus:border-b-2" />
                <button type="submit" onClick={handleSubmit} className=" bg-gray-700 text-white px-3 py-1 rounded-2xl mt-2 float-right cursor-pointer hover:font-semibold">submit</button>

            </div>

            <div className="p-5">
                <h2 className="font-bold">Your Todos</h2>
                <ul className="list-disc ps-5">
                    {data?.items?.map((item) => (

                        <li key={item._id}>
                            <div className="item flex justify-between py-2">
                                <p className="w-3/4"> {item.name} </p>
                                <input type="checkbox" name="checkbox" value={item._id} className="w-5 h-5" onClick={() => handleDelete(item._id)} />
                            </div>
                        </li>
                    ))}
                </ul>
                <input type="hidden" name="listName" value="<%= listName %>" />
            </div>

        </div>
    )
}

export default Todos
