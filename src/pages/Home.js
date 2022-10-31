import CocktailList from "../components/CocktailList";
import Ingredients from "../components/Ingredients";
import { useGlobalContext } from "../context";

const handleSubmit = (e) => {
  e.preventDefault();
};

const Home = () => {
  const { setSearch, searchTab, setSearchTab } = useGlobalContext();
  return (
    <section className='section home'>
      <div className='searchTabs-container'>
        <h2>Search By</h2>
        <div className='searchTabs'>
          <button
            type='button'
            className={`${
              searchTab === "cocktail" ? "tab-btn active" : "tab-btn"
            }`}
            onClick={() => setSearchTab("cocktail")}
          >
            Cocktail
          </button>
          <button
            type='button'
            className={`${
              searchTab === "ingredient" ? "tab-btn active" : "tab-btn"
            }`}
            onClick={() => setSearchTab("ingredient")}
          >
            Ingredient
          </button>
        </div>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        {searchTab === "cocktail" ? (
          <div className='form-control'>
            <label htmlFor=''>Search for your favorite cocktails</label>
            <input
              type='text'
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        ) : (
          <div className='form-control'>
            <label htmlFor=''>Search by ingredient</label>
            <Ingredients />
          </div>
        )}
      </form>
      <div className='underline'>
        <h2 className='list-header'>Cocktails</h2>
      </div>
      <CocktailList />
    </section>
  );
};

export default Home;
