import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../../firebase/products";

export default function Products() {

  // ✅ ALWAYS start with empty array
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getProducts();

        // ✅ safety check
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }

      } catch (error) {

        console.log("Error:", error);

        setProducts([]);
      }
    };

    fetchProducts();

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1>🛍 Clothing Products</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >

        {products.length > 0 ? (

          products.map((p) => (

            <Link
              key={p.id}
              to={`/product/${p.id}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >

              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  width: "220px",
                  borderRadius: "10px",
                }}
              >

                <img
                  src={p.image}
                  alt={p.name}
                  width="200"
                  height="200"
                  style={{ objectFit: "cover" }}
                />

                <h3>{p.name}</h3>

                <p>Rs {p.price}</p>

              </div>

            </Link>
          ))

        ) : (

          <p>No products found</p>

        )}

      </div>

    </div>
  );
}