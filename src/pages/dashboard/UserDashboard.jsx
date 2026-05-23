import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

function UserDashboard() {
  const { user } = useAuth();

  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // 🟢 PRODUCTS COUNT
      const productsSnap = await getDocs(collection(db, "products"));
      setProductCount(productsSnap.size);

      // 🟢 USERS COUNT
      const usersSnap = await getDocs(collection(db, "users"));
      setUserCount(usersSnap.size);
    };

    fetchData();
  }, []);

  return (
    <div style={styles.wrapper}>

      <h2>👤 User Dashboard</h2>

      <div style={styles.card}>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>UID:</b> {user?.uid}</p>
      </div>

      <div style={styles.grid}>

        <div style={styles.box}>
          <h3>🛍 Products</h3>
          <p>{productCount}</p>
        </div>

        <div style={styles.box}>
          <h3>👥 Users</h3>
          <p>{userCount}</p>
        </div>

      </div>

    </div>
  );
}

const styles = {
  wrapper: {
    padding: 20,
  },

  card: {
    background: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 15,
  },

  box: {
    background: "#f8f9fa",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
  },
};

export default UserDashboard;