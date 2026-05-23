import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function DashboardLayout() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR (ONLY ONE) */}
      <div style={styles.sidebar}>
        <h3>⚡ Brand Panel</h3>

        <button onClick={() => navigate("/dashboard")}>🏠 Home</button>
        <button onClick={() => navigate("/dashboard/products")}>🛍 Products</button>
        <button onClick={() => navigate("/dashboard/add-product")}>➕ Add Product</button>
        <button onClick={() => navigate("/dashboard/chat")}>💬 Chat</button>

        <button onClick={logout} style={{ marginTop: 20 }}>
          🚪 Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.main}>
        <Outlet />
      </div>

    </div>
  );
}

const styles = {
  wrapper: { display: "flex", height: "100vh" },

  sidebar: {
    width: 220,
    background: "#111",
    color: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  main: {
    flex: 1,
    padding: 20,
    background: "#f5f5f5",
  },
};

export default DashboardLayout;