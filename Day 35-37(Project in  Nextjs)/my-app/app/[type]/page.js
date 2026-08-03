"use client"
import Link from "next/link"
import { use, useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"


export default function Page({ params }) {
  const [myData, setMyData] = useState([])
  const { type } = use(params)
  const heading = decodeURIComponent(type);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // or "auto"
    });
    const getData = async () => {
      if (type === "All") {
        const { data } = await axios.get('https://dummyjson.com/recipes?limit=50')
        setMyData(data.recipes)
        return;
      }
      const { data } = await axios.get(`https://dummyjson.com/recipes/meal-type/${type}`)
      setMyData(data.recipes)
    }
    getData();
  }, [type])

  return (
    <>
      {/* <h2 className="font-bold text-2xl text-center my-5 text-red-500">hlo</h2> */}
      <div className="max-w-7xl mx-auto px-4 py-8  w-full min-h-[50vh]">
        <h2 className="font-bold text-3xl text-center text-red-500">{heading}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 ">
          {myData.map((recipe, index) => (
            <Link key={index} href={`/${type}/${recipe.id}`} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 mt-3 font-semibold ">
              <div className="relative w-full h-48">
                <Image sizes="400" src={recipe.image} alt={recipe.name} fill={true} className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className=" text-lg">{recipe.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
