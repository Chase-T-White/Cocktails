import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className='section'>
      <p className='about-text'>
        The CocktailDB was built in 2015 to provide a free data source api for
        drinks online in the hope that developers would build applications and
        cool projects on top of it.
      </p>
      <Link to={`/`} className='btn page-btn'>
        Back
      </Link>
    </section>
  );
};

export default About;
