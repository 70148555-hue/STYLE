import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

      <Link className="navbar-brand" to="/">
        StyleHub
      </Link>

      <div>

        <Link className="btn btn-light mx-2" to="/">
          Home
        </Link>

        <Link className="btn btn-light mx-2" to="/products">
          Products
        </Link>

        <Link className="btn btn-warning mx-2" to="/add-product">
          Add Product
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;