import { useState } from "react";
import { addProduct } from "../../firebase/products";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AddProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Login required");
      return;
    }

    if (!name || !price || !image) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await addProduct({
        name,
        price,
        image,
        description,
        sellerId: user.uid,
        createdAt: new Date(),
      });

      alert("Product added successfully ✔");

      navigate("/products");

    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>

      <div style={styles.card}>
        <h2 style={styles.title}>➕ Add New Product</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input
            placeholder="Product Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Price *"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Image URL *"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>

        </form>
      </div>

    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    padding: 25,
    borderRadius: 15,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  input: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    outline: "none",
  },

  textarea: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    minHeight: 80,
    outline: "none",
  },

  button: {
    padding: 12,
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AddProduct;