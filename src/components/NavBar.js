import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <img src="https://i.ibb.co/hHZgsgH/logo.png" className="logo" />
      <p className="brand">
        مكتبة فلاح وبدوي
        <br />
        الجنة للبدو والكتب إلك{' '}
      </p>

      {/* <div class="collapse navbar-collapse" id="navbarNav"> */}
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <Link to="/" class="nav-link">
            Home <span class="sr-only">(current)</span>
          </Link>
        </li>
        <li class="nav-item">
          <Link to="/books" class="nav-link">
            Books
          </Link>
        </li>
        <li class="nav-item">
          <Link to="/members" class="nav-link">
            Members
          </Link>
        </li>
      </ul>
      {/* </div> */}
    </nav>
  );
};

export default NavBar;
