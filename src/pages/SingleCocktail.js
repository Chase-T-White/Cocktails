import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";

const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchCocktail = async () => {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        const { drinks } = data;
        if (drinks) {
          const {
            strDrink: name,
            strAlcoholic: type,
            strDrinkThumb: image,
            strGlass: glass,
            strInstructions: instructions,
          } = drinks[0];

          // Filtering out null ingredients
          let ingredientList = [];
          let measurementList = [];
          let available = true;
          let i = 1;
          while (available) {
            let jsonIngredient = `strIngredient${i}`;
            let jsonMeasurement = `strMeasure${i}`;
            if (drinks[0][jsonIngredient] !== null) {
              const ingredient = drinks[0][jsonIngredient];
              const measurement = drinks[0][jsonMeasurement];
              ingredientList.push(ingredient);
              measurementList.push(measurement);
              i++;
            } else {
              available = false;
            }
          }
          setCocktail([
            {
              name,
              type,
              image,
              glass,
              instructions,
              ingredients: ingredientList,
              measurements: measurementList,
            },
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCocktail();
  }, [id]);

  if (loading) {
    return (
      <section className='section'>
        <Loading />;
      </section>
    );
  }

  if (!cocktail) {
    return (
      <section className='section'>
        <h1 className='error-msg'>Oops! Drink does not exist...</h1>
        <Link to='/' className='btn lrg-btn'>
          Back Home
        </Link>
      </section>
    );
  }

  return (
    <section className='cocktail'>
      <article className='cocktail-info'>
        <img
          src={cocktail[0].image}
          alt={cocktail[0].name}
          className='drink-img page-img'
        />
        <div className='info-container'>
          <div className='underline-drink-page'>
            <h2 className='list-header'>{cocktail[0].name}</h2>
          </div>
          <h3 className='glass page-glass'>{cocktail[0].glass}</h3>
          <h5 className='drink-type page-drink-type'>{cocktail[0].type}</h5>
          <div className='ingredients-list'>
            <div className='ingredients'>
              {cocktail[0].ingredients.map((ingredient, index) => {
                return (
                  <h5 key={index} className='ingredient'>
                    {ingredient}
                  </h5>
                );
              })}
            </div>
            <div className='measurements'>
              {cocktail[0].measurements.map((measurement, index) => {
                if (measurement === null) {
                  return;
                }
                return (
                  <h5 key={index} className='measurement'>
                    {measurement}
                  </h5>
                );
              })}
            </div>
          </div>
          <div className='wrapper'>
            <h5 className='instruction-header'>Instructions:</h5>
            <p className='instructions'>{cocktail[0].instructions}</p>
          </div>
          <Link to={`/`} className='btn page-btn'>
            Back
          </Link>
        </div>
      </article>
    </section>
  );
};

export default SingleCocktail;
