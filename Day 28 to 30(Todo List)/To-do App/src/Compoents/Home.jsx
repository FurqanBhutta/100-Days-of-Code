import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import Todos from "./Todos"
import axios from "axios";

const Home = () => {

    const [mydata, setMydata] = useState([]);
    const [selectedList, setSelectedList] = useState("Home");

    const getData = async () => {
        const { data } = await axios.get("http://localhost:3000/lists")
        setMydata(data);
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="bg-gray-400">
            
            <h1 className="font-bold text-2xl p-3 bg-gray-700 text-white shadow-2xl">Todo</h1>
            <div className="navbar absolute">
                <Navbar data={mydata} selectedList={selectedList} onSelectList={setSelectedList}/>
            </div>
            <div className="main flex justify-center">
                <Todos selectedList={selectedList}/>
            </div>
        </div>
    )
}

export default Home
