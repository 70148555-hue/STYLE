import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { deleteAccount, logoutUser } from "../../firebase/auth";
import { useEffect, useState } from "react";

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 🔐 Load user from Firebase Auth
  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 🚪 LOGOUT
  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("user");

      alert("Logged out successfully ✔");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  // 🗑 DELETE ACCOUNT
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "⚠ Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAccount();

      alert("Account deleted successfully ✔");

      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      console.log("DELETE ERROR:", error);
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>👤 User Dashboard</h2>

        {user && (
          <div style={styles.info}>
            <p><b>Email:</b> {user.email}</p>
            <p><b>UID:</b> {user.uid}</p>
          </div>
        )}

        <button onClick={handleLogout} style={styles.logoutBtn}>
          🚪 Logout
        </button>

        <button onClick={handleDelete} style={styles.deleteBtn}>
          🗑 Delete Account
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },

  card: {
    width: 400,
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    background: "#fff",
    textAlign: "center",
  },

  info: {
    margin: "10px 0",
    textAlign: "left",
  },

  logoutBtn: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },

  deleteBtn: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    background: "red",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};

export default UserDashboard;