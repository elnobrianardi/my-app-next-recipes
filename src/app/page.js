"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const RECIPES_PER_PAGE = 6;

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRecipes = async () => {
    try {
      const res = await fetch("https://dummyjson.com/recipes");
      const data = await res.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);

  // Get current page's recipes slice
  const currentRecipes = recipes.slice(
    (currentPage - 1) * RECIPES_PER_PAGE,
    currentPage * RECIPES_PER_PAGE
  );

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-8">Recipes</h1>
      {recipes.length === 0 ? (
        <p className="text-center text-gray-500">Loading recipes...</p>
      ) : (
        <>
          <ul className="space-y-6">
            {currentRecipes.map((recipe) => (
              <li
                key={recipe.id}
                className="flex items-center space-x-4 border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {recipe.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>

            <span className="flex items-center">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
