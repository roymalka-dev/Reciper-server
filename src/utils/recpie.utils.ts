export const formatRecipeApiData = (recipe: any) => {
  const parts = recipe.uri.split("_");
  let recipeId = parts[parts.length - 1];

  return {
    _id: recipeId,
    name: recipe.label,
    description: `This recipe for ${recipe.label} comes from ${
      recipe.source
    }. It is suitable for those following a ${recipe.dietLabels?.join(
      ", "
    )} diet.`,
    performingUser: "Online",
    instructions: recipe.ingredientLines,
    image: recipe.image,
  };
};
