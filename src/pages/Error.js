import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className='section'>
      <h1 className='error-msg'>Error...Page Not Found</h1>
      <Link to='/' className='btn lrg-btn'>
        Back Home
      </Link>
    </section>
  );
};

export default Error;
