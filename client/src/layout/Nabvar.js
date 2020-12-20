import "../styles/Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>kitchen stories</h1>
      </Link>
      <ul>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
