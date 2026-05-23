import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs.map(doc => doc.data());
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <h3>Total Users: {users.length}</h3>

      <ul>
        {users.map((u, i) => (
          <li key={i}>
            {u.email} - {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;