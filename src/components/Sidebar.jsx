import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div style={styles.sidebar}>

      <h3>StyleHub</h3>

      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/products")}>Products</button>
      <button onClick={() => navigate("/add-product")}>Add Product</button>
      <button onClick={() => navigate("/chat")}>Chat</button>

    </div>
  );
}

const styles = {
  sidebar: {
    width: 200,
    height: "100vh",
    background: "#111",
    color: "white",
    padding: 15,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
};

export default Sidebar;