import { Link } from "react-router-dom";

const Cocktail = ({ id, drink, glass, image, type }) => {
  return (
    <article className='card'>
      <img src={image} alt={drink} className='drink-img' />
      <div className='drink-info'>
        <h3 className='drink-name'>{drink}</h3>
        <p className='glass'>{glass}</p>
        <p className='drink-type'>{type}</p>
        <Link to={`/cocktails/${id}`} className='btn'>
          Details
        </Link>
      </div>
    </article>
  );
};

export default Cocktail;
