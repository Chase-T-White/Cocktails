import React, { useState, useEffect, useContext, useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/";
// s= search by name
// i= search by ingredient
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("a");
  const [cocktails, setCocktails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isIngredientError, setIsIngredientError] = useState(false);
  const [singleIngredient, setSingleIngredient] = useState([]);
  const [isIngredientInfoError, setIsIngredientInfoError] = useState(false);
  const [searchTab, setSearchTab] = useState("cocktail");

  const fetchDrinks = useCallback(
    async (type) => {
      setIsIngredientError(false);
      setLoading(true);
      try {
        const response = await fetch(`${url}${type}${search}`);
        const data = await response.json();
        const { drinks } = data;
        if (drinks) {
          const newCocktails = drinks.map((drink) => {
            const {
              idDrink,
              strAlcoholic,
              strDrink,
              strDrinkThumb,
              strGlass,
              strInstructions,
            } = drink;
            return {
              id: idDrink,
              type: strAlcoholic,
              drink: strDrink,
              image: strDrinkThumb,
              glass: strGlass,
              instructions: strInstructions,
            };
          });
          setCocktails(newCocktails);
        } else {
          setCocktails([]);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [search]
  );

  useEffect(() => {
    let typeSearch;
    if (searchTab === "cocktail") {
      typeSearch = "search.php?s=";
    } else {
      typeSearch = "filter.php?i=";
    }
    fetchDrinks(typeSearch);
  }, [search, fetchDrinks]);

  const fetchIngredients = async () => {
    setIsIngredientError(false);
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
      );
      const data = await response.json();
      setIngredients(
        data.drinks.sort((a, b) => {
          return a.strIngredient1.localeCompare(b.strIngredient1);
        })
      );
    } catch (error) {
      setIsIngredientError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchSingleIngredient = async (value = "7-up") => {
    setIsIngredientInfoError(false);
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${value}`
      );
      const data = await response.json();
      setSingleIngredient(data.ingredients);
    } catch (error) {
      setIsIngredientInfoError(true);
      console.error();
    }
  };

  useEffect(() => {
    fetchSingleIngredient();
  }, []);

  const selectSearch = (location, value) => {
    if (location) {
      fetchSingleIngredient(value);
    } else {
      setSearch(value);
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectSearch,
        setSearch,
        setLoading,
        setSearchTab,
        loading,
        cocktails,
        ingredients,
        isIngredientError,
        searchTab,
        isIngredientInfoError,
        singleIngredient,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
