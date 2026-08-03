"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [myData, setMyData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryImage, setCategoryImage] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const getData = async () => {
      const { data } = await axios.get('https://dummyjson.com/recipes')
      setMyData(data.recipes)

      // Extract unique categories
      const uniqueCategories = [...new Set(data.recipes.flatMap(recipe => recipe.mealType))];
      uniqueCategories.unshift('All');
      setCategories(uniqueCategories);

      // Extract unique category images
      const usedImages = new Set();
      const uniqueCategoryImages = uniqueCategories.map(category => {
        if (category === "All") return "https://tse2.mm.bing.net/th/id/OIP.JbVAZqFO8WuERibMcPidvQHaEJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";

        const recipesInCategory = data.recipes.filter(recipe =>
          recipe.mealType.includes(category)
        );

        const recipe = recipesInCategory.find(recipe => {
          if (!usedImages.has(recipe.image)) {
            usedImages.add(recipe.image);
            return true;
          }
          return false;
        });

        return recipe ? recipe.image : recipesInCategory[0]?.image || "";
      });
      setCategoryImage(uniqueCategoryImages);
    }
    getData();
  }, [])

  return (
    <>
      <div className=' w-full h-180 bg-red-400 relative '>
        <Image className='mx-auto object-cover' fill={true} src="/assets/heroImage.png" alt="heroImage" style={{ filter: 'brightness(0.7)' }} loading="eager" />
        <div className="absolute flex categorys-center top-0 left-0 w-full h-full  items-center md:justify-start">
          <div className="content text-white w-full  md:w-1/2 px-5 md:px-15 text-2xl">
            <h1 className="text-6xl font-extrabold ">Cook Something Amazing Today</h1>
            <p className="my-5 leading-relaxed">Explore hundreds of easy, healthy, and mouthwatering recipes for breakfast, lunch, and dinner. Find your next favorite dish with step-by-step instructions and fresh ingredients.</p>
            <button onClick={() =>
              document.getElementById("categories")?.scrollIntoView({
                behavior: "smooth",
              })
            } className="bg-white text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300 cursor-pointer">Get Started</button>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-15  w-full" id="categories">
        <h2 className="font-bold text-3xl text-center text-red-500">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 ">
          {categories.map((category, e) => (
            <Link key={e} href={`/${category}`} scroll={true} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 mt-3 font-semibold hover:font-bold ">
              <div className="relative w-full h-60">
                <Image
                  sizes="400"
                  src={categoryImage[e]} alt={category} fill={true} className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg md:text-2xl">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </>
  );
}
