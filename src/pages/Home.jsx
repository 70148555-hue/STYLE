import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {

  const [search, setSearch] = useState("");

  return (
    <div>

      {/* HERO SECTION */}
      <div
        className="text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "90vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521334884684-d80222895322')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        ></div>

        <div style={{ zIndex: 2 }}>
          <h1 className="display-2 fw-bold">StyleHub</h1>
          <p className="lead mb-4">
            Your Ultimate Fashion Destination
          </p>

          {/* SEARCH BAR */}
          <div className="d-flex justify-content-center mb-3">
            <input
              type="text"
              className="form-control w-75"
              placeholder="Search clothes, shoes, accessories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link to="/products" className="btn btn-warning btn-lg px-4">
            Shop Now
          </Link>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="container text-center my-5">

        <h2 className="fw-bold mb-4">Why Choose StyleHub?</h2>

        <div className="row">

          <div className="col-md-3">
            <div className="p-3 shadow rounded">
              <h4>⚡ Fast UI</h4>
              <p>Lightning fast React SPA</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 shadow rounded">
              <h4>🔒 Secure</h4>
              <p>Firebase protected data</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 shadow rounded">
              <h4>🛍️ Trendy</h4>
              <p>Latest fashion collection</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 shadow rounded">
              <h4>📱 Responsive</h4>
              <p>Mobile-friendly design</p>
            </div>
          </div>

        </div>
      </div>

      {/* PROMO BANNER */}
      <div className="bg-dark text-white text-center py-5">
        <h2>🔥 Big Sale is Live!</h2>
        <p>Up to 50% off on selected items</p>
        <Link to="/products" className="btn btn-warning">
          Explore Deals
        </Link>
      </div>

      {/* CATEGORIES */}
      <div className="container text-center my-5">

        <h2 className="fw-bold">Shop by Category</h2>

        <div className="row mt-4">

          <div className="col-md-3">
            <div className="p-3 border rounded">👗 Women</div>
          </div>

          <div className="col-md-3">
            <div className="p-3 border rounded">👕 Men</div>
          </div>

          <div className="col-md-3">
            <div className="p-3 border rounded">👟 Shoes</div>
          </div>

          <div className="col-md-3">
            <div className="p-3 border rounded">👜 Accessories</div>
          </div>

        </div>
      </div>

      {/* STATS SECTION */}
      <div className="bg-light py-5">

        <div className="container text-center">

          <div className="row">

            <div className="col-md-4">
              <h2>10K+</h2>
              <p>Happy Customers</p>
            </div>

            <div className="col-md-4">
              <h2>500+</h2>
              <p>Products</p>
            </div>

            <div className="col-md-4">
              <h2>50+</h2>
              <p>Brands</p>
            </div>

          </div>

        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="container text-center my-5">

        <h2 className="fw-bold">What Customers Say</h2>

        <div className="row mt-4">

          <div className="col-md-4">
            <div className="p-3 shadow rounded">
              ⭐⭐⭐⭐⭐
              <p>Best shopping experience ever!</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 shadow rounded">
              ⭐⭐⭐⭐⭐
              <p>Very fast and smooth website.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 shadow rounded">
              ⭐⭐⭐⭐⭐
              <p>Love the UI design!</p>
            </div>
          </div>

        </div>

      </div>

      {/* NEWSLETTER */}
      <div className="bg-dark text-white text-center py-5">

        <h3>Subscribe for Updates</h3>

        <input
          type="email"
          placeholder="Enter your email"
          className="form-control w-50 mx-auto my-3"
        />

        <button className="btn btn-warning">
          Subscribe
        </button>

      </div>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-4">

        <h5>StyleHub</h5>
        <p>© 2026 All Rights Reserved</p>
        <p>Built with React + Firebase</p>

      </footer>

    </div>
  );
}

export default Home;