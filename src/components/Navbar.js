import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h2 className='logo'>Cocktails</h2>
      <div className='nav-links'>
        <Link to='/' className='link'>
          Home
        </Link>
        <Link to='/about' className='link'>
          About
        </Link>
        <Link to='/ingredients' className='link'>
          Ingredients
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
