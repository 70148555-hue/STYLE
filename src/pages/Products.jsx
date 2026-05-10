import { useEffect, useState } from "react";

import { db } from "../firebase/config";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import { Link } from "react-router-dom";

function Products() {

  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {

    try {

      const querySnapshot = await getDocs(collection(db, "products"));

      const data = [];

      querySnapshot.forEach((item) => {
        data.push({
          id: item.id,
          ...item.data()
        });
      });

      setProducts(data);

    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {

    try {

      await deleteDoc(doc(db, "products", id));

      // refresh list after delete
      fetchProducts();

    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (

    <div className="container mt-5">

      <h2 className="text-center mb-4">All Products</h2>

      <div className="row">

        {products.length === 0 ? (
          <p className="text-center">No products found</p>
        ) : (

          products.map((product) => (

            <div className="col-md-4 mb-4" key={product.id}>

              <div className="card shadow-sm h-100">

                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />

                <div className="card-body">

                  <h5 className="card-title">
                    {product.name}
                  </h5>

                  <p className="card-text">
                    <b>Price:</b> {product.price} PKR
                  </p>

                  <p className="card-text">
                    <b>Category:</b> {product.category}
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    View
                  </Link>

                  <Link
                    to={`/edit-product/${product.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Products;