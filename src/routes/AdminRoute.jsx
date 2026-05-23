import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", user.uid));

      setIsAdmin(snap.exists() && snap.data().role === "admin");
    };

    checkRole();
  }, [user]);

  if (loading || isAdmin === null) return <h3>Loading...</h3>;

  if (!user) return <Navigate to="/login" />;

  if (!isAdmin) return <Navigate to="/dashboard" />;

  return children;
}