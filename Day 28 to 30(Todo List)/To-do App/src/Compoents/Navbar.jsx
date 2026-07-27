import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = ({ data, selectedList, onSelectList }) => {
    const [show, setShow] = useState(false);
    const [list, setList] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        try{
            const response = await axios.get("http://localhost:3000/"+list);
            console.log(response)

        }catch(err){
            console.log(err);
        }
    }
    const handleDelete = async(title)=>{
        try{
            console.log(title)
            const response = await axios.post("http://localhost:3000/delete/"+title)
            navigate('/')
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="w-70 min-h-screen bg-gray-500">
            <h1 className="font-bold text-2xl text-center py-3 text-white">Lists</h1>

            <div className="border-t-2 border-b-2 p-4 border-gray-700 ">
                <button className="w-full font-bold bg-gray-700 text-white py-1 rounded-2xl cursor-pointer hover:font-extrabold" onClick={() => setShow(!show)}>Create List</button>
                {show && (
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={list} onChange={(e)=> setList(e.target.value)} className="w-3/4 bg-white mt-2 rounded-2xl px-3 py-1 focus:outline-hidden focus:border-b-2" target="true"/>
                        <button type="submit" className=" bg-gray-700 text-white px-2 py-1 rounded-2xl mt-2 float-right cursor-pointer hover:font-semibold">Done</button>
                    </form>
                )}
            </div>
            <ul className="p-4">
                <li >
                    {data.map((d) => (
                        <div key={d._id} className="item flex justify-between py-2 text-white font-bold">
                            <button onClick={() => onSelectList(d.title)} className="w-fit cursor-pointer hover:text-slate-700"> {d.title}  </button>
                            <span onClick={() => handleDelete(d.title)} className="material-symbols-outlined cursor-pointer hover:text-red-400">
                                delete
                            </span>
                        </div>
                    ))}
                </li>
            </ul>
            <input type="hidden" name="listName" value="<%= listName %>" />
        </div>
    )
}

export default Navbar
