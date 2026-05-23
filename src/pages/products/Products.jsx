import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../firebase/products";
import { useAuth } from "../../context/AuthContext";

function Products() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  // 🗑 DELETE PRODUCT (SECURE)
  const handleDelete = async (product) => {
    if (!user) return;

    const isOwner = product.sellerId === user.uid;
    const isAdmin = user.email === "admin@gmail.com";

    if (!isOwner && !isAdmin) {
      alert("Not allowed");
      return;
    }

    await deleteProduct(product.id);
    loadData();
  };

  return (
    <div style={styles.container}>

      {/* 🔥 HEADER */}
      <div style={styles.header}>
        <h2>🛍 Products</h2>

        <button
          style={styles.addBtn}
          onClick={() => navigate("/add-product")}
        >
          ➕ Add Product
        </button>
      </div>

      {/* 🔥 PRODUCTS GRID */}
      <div style={styles.grid}>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((p) => (
            <div key={p.id} style={styles.card}>

              <img src={p.image} alt="" style={styles.img} />

              <h3>{p.name}</h3>
              <p>💰 {p.price}</p>
              <p>{p.description}</p>

              {/* 🔥 DELETE ONLY OWNER OR ADMIN */}
              {(p.sellerId === user?.uid ||
                user?.email === "admin@gmail.com") && (
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(p)}
                >
                  Delete
                </button>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: 20,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addBtn: {
    padding: "10px 15px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 15,
    marginTop: 20,
  },

  card: {
    border: "1px solid #ddd",
    padding: 10,
    borderRadius: 10,
    background: "#fff",
  },

  img: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderRadius: 8,
  },

  deleteBtn: {
    marginTop: 10,
    background: "red",
    color: "white",
    border: "none",
    padding: 8,
    cursor: "pointer",
  },
};

export default Products;