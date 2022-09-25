import CocktailList from "../components/CocktailList";
import { useGlobalContext } from "../context";

const handleSubmit = (e) => {
  e.preventDefault();
};

const Home = () => {
  const { setSearch } = useGlobalContext();
  return (
    <section className='section home'>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor=''>Search for your favorite cocktails</label>
        <input type='text' onChange={(e) => setSearch(e.target.value)} />
      </form>
      <div className='underline'>
        <h2 className='list-header'>Cocktails</h2>
      </div>
      <CocktailList />
    </section>
  );
};

export default Home;
