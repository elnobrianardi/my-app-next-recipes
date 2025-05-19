// app/recipes/[id]/page.jsx
import React from "react";

async function getRecipe(id) {
  const res = await fetch(`https://dummyjson.com/recipes/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch recipe");
  }
  return res.json();
}

const RecipePage = async ({ params }) => {
  const { id } = params;
  const recipe = await getRecipe(id);

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-bold mb-4 text-center text-white">{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="mx-auto rounded-lg mb-6 max-w-xs shadow-md"
      />

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2 text-white">Ingredients</h3>
        <ul className="list-disc list-inside space-y-1 text-white">
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2 text-white-800">Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-white-700">
          {recipe.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="grid grid-cols-2 gap-4 text-white-700 mb-6">
        <p><strong>Prep time:</strong> {recipe.prepTimeMinutes} min</p>
        <p><strong>Cook time:</strong> {recipe.cookTimeMinutes} min</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Calories per serving:</strong> {recipe.caloriesPerServing}</p>
      </section>

      <p className="text-yellow-600 font-semibold">
        <strong>Rating:</strong> {recipe.rating} ⭐ ({recipe.reviewCount} reviews)
      </p>
    </div>
  );
};

export default RecipePage;
