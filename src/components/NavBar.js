import {Link } from "react-router-dom"

const NavBar = () => {
 
 
  return (
    <nav className="navbar navbar-dark">
      <Link to="/members" className="navbar-brand"> Members</Link>
      <div className="navbar-nav ml-auto">
       <Link to="/books" className="navbar"> Books </Link>
       
      </div>
    </nav>
  );
};

export default NavBar;