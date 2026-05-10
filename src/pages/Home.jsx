import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {

  const [search, setSearch] = useState("");

  return (
    <div>

      {/* HERO SECTION WITH BACKGROUND */}
      <div
        className="text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "90vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1521334884684-d80222895322')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >

        {/* dark overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)"
        }}></div>

        {/* content */}
        <div style={{ zIndex: 2 }}>

          <h1 className="display-2 fw-bold">StyleHub</h1>

          <p className="lead mb-4">
            Discover Fashion That Defines You
          </p>

          {/* SEARCH BAR */}
          <div className="d-flex justify-content-center mb-4">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search for clothes, shoes, accessories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link to="/products" className="btn btn-warning btn-lg px-4">
            Shop Now
          </Link>

        </div>
      </div>

      {/* FEATURES */}
      <div className="container text-center my-5">

        <h2 className="fw-bold">Why StyleHub?</h2>

        <div className="row mt-4">

          <div className="col-md-4">
            <div className="p-3 shadow rounded">
              <h4>👕 Fashion Items</h4>
              <p>Latest trendy clothing collection</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 shadow rounded">
              <h4>⚡ Fast UI</h4>
              <p>Smooth React SPA experience</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 shadow rounded">
              <h4>🔒 Secure Firebase</h4>
              <p>Data stored in Firestore</p>
            </div>
          </div>

        </div>

      </div>

      {/* CATEGORY SECTION */}
      <div className="bg-light py-5">

        <div className="container text-center">

          <h2 className="fw-bold">Categories</h2>

          <div className="row mt-4">

            <div className="col-md-3">👗 Women</div>
            <div className="col-md-3">👕 Men</div>
            <div className="col-md-3">👟 Shoes</div>
            <div className="col-md-3">👜 Accessories</div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-4 mt-5">

        <h5>StyleHub</h5>

        <p>© 2026 All Rights Reserved</p>

        <p>Built with React + Firebase</p>

      </footer>

    </div>
  );
}

export default Home;