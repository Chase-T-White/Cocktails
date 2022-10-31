import { useGlobalContext } from "../context";

const Ingredients = ({ location = "" }) => {
  const { ingredients, isIngredientError, selectSearch } = useGlobalContext();

  return (
    <>
      {isIngredientError ? (
        <p>Error loading ingredients</p>
      ) : (
        <select name='' id=''>
          {ingredients.map((ingredient, index) => {
            return (
              <option
                value={ingredient.strIngredient1}
                key={index}
                onClick={(e) => selectSearch(location, e.target.value)}
              >
                {ingredient.strIngredient1}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
};

export default Ingredients;
