import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";

import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setError("");

      // 🔐 CREATE AUTH USER
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("USER CREATED:", user);

      // 🛢 SAVE USER IN FIRESTORE (CRITICAL FIX FOR CHAT)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid, // 🔥 IMPORTANT FOR CHAT SYSTEM
        name: name || email,
        email: email,
        role: "user",
        createdAt: new Date(),
      });

      console.log("USER SAVED IN FIRESTORE");

      alert("Registration successful ✅");

      navigate("/login");

    } catch (err) {
      console.log("REGISTER ERROR:", err);

      // better error handling
      if (err.code === "auth/email-already-in-use") {
        setError("Email already exists. Please login.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "black",
            color: "white",
          }}
        >
          Register
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}