import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();

  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [admins, setAdmins] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userSnap = await getDocs(collection(db, "users"));
      const productSnap = await getDocs(collection(db, "products"));

      setUsers(userSnap.size);
      setProducts(productSnap.size);

      // 🔥 COUNT ADMINS
      const adminCount = userSnap.docs.filter(
        (doc) => doc.data().role === "admin"
      ).length;

      setAdmins(adminCount);
    };

    fetchData();
  }, []);

  return (
    <div style={styles.wrapper}>

      <h2>⚡ Admin Dashboard</h2>

      <div style={styles.card}>
        <p><b>Admin:</b> {user?.email}</p>
      </div>

      <div style={styles.grid}>

        <div style={styles.box}>
          <h3>👥 Users</h3>
          <p>{users}</p>
        </div>

        <div style={styles.box}>
          <h3>🛍 Products</h3>
          <p>{products}</p>
        </div>

        <div style={styles.box}>
          <h3>👑 Admins</h3>
          <p>{admins}</p>
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
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 15,
  },

  box: {
    background: "#e9ecef",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
  },
};

export default AdminDashboard;