import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

// only ONE import from auth.js
import { googleLogin, resetPassword } from "../../firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔐 EMAIL LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      localStorage.setItem("user", JSON.stringify(user));

      alert("Login Successful ✔");
      navigate("/dashboard");

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      alert(error.message);
    }
  };

  // 🔵 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin();

      localStorage.setItem("user", JSON.stringify(user));

      alert("Google Login Successful ✔");
      navigate("/dashboard");

    } catch (error) {
      console.log("GOOGLE LOGIN ERROR:", error);
      alert(error.message);
    }
  };

  // 🔁 RESET PASSWORD
  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter email first");
      return;
    }

    try {
      await resetPassword(email);
      alert("Password reset email sent ✔");

    } catch (error) {
      console.log("RESET ERROR:", error);
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🔐 Login</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {/* 🔵 GOOGLE LOGIN */}
        <button onClick={handleGoogleLogin} style={styles.googleBtn}>
          Continue with Google
        </button>

        {/* 🔁 RESET PASSWORD */}
        <button onClick={handleResetPassword} style={styles.linkBtn}>
          Forgot Password?
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
    width: 350,
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    background: "#fff",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },

  button: {
    padding: 10,
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },

  googleBtn: {
    marginTop: 10,
    padding: 10,
    background: "red",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    width: "100%",
  },

  linkBtn: {
    marginTop: 10,
    background: "transparent",
    border: "none",
    color: "blue",
    cursor: "pointer",
  },
};

export default Login;