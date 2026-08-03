"use client";

import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function RecipePage({ params }) {
  const { id } = use(params);

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/recipes/${id}`
        );

        setRecipe(data);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (err) {
        console.log(err);
      }
    };

    getRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
  <div className="flex flex-col lg:flex-row gap-10">

    <div className="lg:w-1/2 order-2 lg:order-1">
      <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full">
        {recipe.cuisine}
      </span>

      <h1 className="text-4xl lg:text-5xl font-bold mt-4">
        {recipe.name}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-gray-500">Difficulty</p>
          <h3 className="font-semibold">{recipe.difficulty}</h3>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-gray-500">Prep Time</p>
          <h3>{recipe.prepTimeMinutes} mins</h3>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-gray-500">Cook Time</p>
          <h3>{recipe.cookTimeMinutes} mins</h3>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-gray-500">Servings</p>
          <h3>{recipe.servings}</h3>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-gray-500">Calories</p>
          <h3>{recipe.caloriesPerServing}</h3>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-gray-500">Rating</p>
          <h3>⭐ {recipe.rating}</h3>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Ingredients
        </h2>

        <ul className="space-y-3">
          {recipe.ingredients.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-orange-500">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-5">
          Instructions
        </h2>

        
      </div>
    </div>

    <div className="lg:w-1/2 h-180 order-1 lg:order-2 flex justify-right relative">
        <Image
          loading="eager"
          src={recipe.image}
          alt={recipe.name}
          width={500}
          height={700}
          className="w-full object-cover rounded-2xl shadow-2xl"
        />
    </div>

  </div>
  <div className="space-y-5">
          {recipe.instructions.map((step, index) => (
            <div
              key={index}
              className="flex gap-4"
            >
              <div className="bg-orange-500 text-white w-9 h-9 rounded-full flex justify-center items-center font-bold">
                {index + 1}
              </div>

              <p>{step}</p>
            </div>
          ))}
        </div>
</div>
  );
}