import Loading from "./Loading";
import Cocktail from "./Cocktail";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { loading, cocktails } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }

  if (cocktails.length < 1) {
    return (
      <h2 className='no-cocktails'>Oops, no cocktails match your search</h2>
    );
  }
  return (
    <section className='cocktail-list'>
      {cocktails.map((cocktail) => {
        return <Cocktail key={cocktail.id} {...cocktail} />;
      })}
    </section>
  );
};

export default CocktailList;
