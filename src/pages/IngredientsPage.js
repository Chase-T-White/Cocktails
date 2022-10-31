import { useGlobalContext } from "../context";
import Ingredients from "../components/Ingredients";

const handleSubmit = (e) => {
  e.preventDefault();
};

const IngredientsPage = () => {
  const { singleIngredient } = useGlobalContext();
  const url = window.location.href.split("/");
  // const {
  //   strIngredient: name,
  //   strDescription: description,
  //   strAlcohol: alcohol,
  //   strType: type,
  // } = singleIngredient[0];

  return (
    <section className='section'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor=''>Search by ingredient</label>
          <Ingredients location={url[url.length - 1]} />
        </div>
      </form>
      <article className='ingredients-info'>
        <div className='underline'>
          <h2 className='list-header'>
            {singleIngredient[0]
              ? singleIngredient[0].strIngredient
              : "Ingredients"}
          </h2>
        </div>
        <div className='wrapper'>
          <h5 className='description-header'>Description:</h5>
          <p className='description-text'>
            {singleIngredient[0].strDescription === null
              ? "Sorry, no information available"
              : singleIngredient[0].strDescription}
          </p>
        </div>
      </article>
    </section>
  );
};

export default IngredientsPage;
