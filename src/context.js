import React, { useState, useEffect, useContext, useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${search}`);
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
  }, [search]);

  useEffect(() => {
    fetchDrinks();
  }, [search, fetchDrinks]);

  return (
    <AppContext.Provider value={{ loading, setSearch, cocktails, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
