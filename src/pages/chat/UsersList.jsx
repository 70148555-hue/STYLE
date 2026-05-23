import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function UsersList({ onSelectUser, currentUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, "users"));

      const list = snap.docs
        .map((doc) => doc.data())
        .filter((u) => u.uid !== currentUser?.uid); // remove self

      setUsers(list);
    };

    fetchUsers();
  }, [currentUser]);

  return (
    <div>
      <h3>👥 Users</h3>

      {users.map((u) => (
        <div
          key={u.uid}
          onClick={() => onSelectUser(u)}
          style={styles.user}
        >
          {u.name} ({u.role})
        </div>
      ))}
    </div>
  );
}

const styles = {
  user: {
    padding: 10,
    border: "1px solid #ddd",
    margin: 5,
    cursor: "pointer",
  },
};

export default UsersList;