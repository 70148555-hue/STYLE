import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import SingleProduct from "./pages/SingleProduct";
import EditProduct from "./pages/EditProduct";

function App() {

  return (

    <div>

      {/* Navbar */}

      <Navbar />

      {/* Routes */}

      <Routes>

        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* All Products Route */}
        <Route path="/products" element={<Products />} />

        {/* Add Product Route */}
        <Route path="/add-product" element={<AddProduct />} />

        {/* Dynamic Route for Single Product */}
        <Route path="/product/:id" element={<SingleProduct />} />

        {/* Dynamic Route for Edit Product */}
        <Route path="/edit-product/:id" element={<EditProduct />} />

      </Routes>

    </div>
  );
}

export default App;