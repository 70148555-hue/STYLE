import { useState } from "react";
import { addProduct } from "../../firebase/products";
import { useNavigate } from "react-router-dom";

// 🔥 IMPORTANT: use your auth context (recommended)
import { useAuth } from "../../context/AuthContext";

function AddProduct() {
  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert("Please fill all required fields!");
      return;
    }

    if (!currentUser) {
      alert("You must be logged in!");
      return;
    }

    try {
      setLoading(true);

      await addProduct({
        name,
        price,
        image,
        description,

        // 🔥 CRITICAL FIX FOR CHAT SYSTEM
        sellerId: currentUser.uid,

        createdAt: new Date(),
      });

      alert("✅ Product Added Successfully!");

      // reset form
      setName("");
      setPrice("");
      setImage("");
      setDescription("");

      navigate("/dashboard/products");

    } catch (error) {
      console.log("🔥 FULL ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>➕ Add New Clothing Product</h2>

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

          <button
            style={styles.button}
            disabled={loading}
            type="submit"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: 350,
    padding: 20,
    borderRadius: 15,
    background: "#fff",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 10,
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
  },

  textarea: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
    minHeight: 80,
  },

  button: {
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default AddProduct;