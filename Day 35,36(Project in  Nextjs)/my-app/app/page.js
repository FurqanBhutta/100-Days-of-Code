"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('https://dummyjson.com/recipes')
      setMyData(data.recipes)
    }
    getData();
  }, [])
  return (
    <>
      <Navbar />

      <div className=' w-full h-180 bg-red-400 relative '>
        <Image className='mx-auto object-cover' fill={true} src="/assets/heroImage.png" alt="heroImage" style={{ filter: 'brightness(0.7)' }} loading="eager" />
        <div className="absolute flex items-center top-0 left-0 w-full h-full justify-center md:justify-start">
          <div className="content text-white w-full  md:w-1/2 px-5 md:px-15 text-2xl">
            <h1 className="text-6xl font-extrabold ">Cook Something Amazing Today</h1>
            <p className="my-5 leading-relaxed">Explore hundreds of easy, healthy, and mouthwatering recipes for breakfast, lunch, and dinner. Find your next favorite dish with step-by-step instructions and fresh ingredients.</p>
            <button className="bg-white text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300 cursor-pointer">Get Started</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="font-bold text-2xl">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {myData.map((item) => (
            <Link key={item.id} href={`/recipe/${item.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image src={item.image} alt={item.name} fill={true} className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                {item.mealType.map((mealType, index) => (
                  <p key={index} className="text-gray-600 mt-2">{mealType}</p>
                ))
                }
              </div>
            </Link>
          ))}
        </div>
      </div>

    </>
  );
}
