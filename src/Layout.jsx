import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>

      {/* 🔥 SIDEBAR */}
      <div
        style={{
          width: "220px",
          height: "100vh",
          background: "#111",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>STYLEHUB</h2>

        <Link to="/" style={{ color: "white", display: "block", margin: "10px 0" }}>
          🏠 Home
        </Link>

        <Link to="/add-product" style={{ color: "white", display: "block", margin: "10px 0" }}>
          🛍 Add Product
        </Link>

        <Link to="/admin" style={{ color: "white", display: "block", margin: "10px 0" }}>
          📊 Admin
        </Link>

        <Link to="/user" style={{ color: "white", display: "block", margin: "10px 0" }}>
          👤 User
        </Link>

        <Link to="/chat" style={{ color: "white", display: "block", margin: "10px 0" }}>
          💬 Chat
        </Link>

        <Link to="/login" style={{ color: "white", display: "block", margin: "10px 0" }}>
          🔐 Login
        </Link>

        <Link to="/register" style={{ color: "white", display: "block", margin: "10px 0" }}>
          📝 Register
        </Link>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}