import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className='section'>
      <h1>Contact</h1>
      <Link to={`/`} className='btn page-btn'>
        Back
      </Link>
    </section>
  );
};

export default Contact;
