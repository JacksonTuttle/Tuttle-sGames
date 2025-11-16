import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; 
import AuthLayout from "./AuthLayout";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@") || !email.includes(".")) {
      setError("Enter a valid email.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // or your actual homepage
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <AuthLayout>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Tuttle's Games</h1>

        {error && <p className={styles.errorText}>{error}</p>}

        {/* EMAIL */}
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <label className={styles.label}>Password</label>
        <div className={styles.passwordInputContainer}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* LOGIN BUTTON */}
        <button className={styles.button} onClick={handleLogin}>
          SIGN IN
        </button>

        <Link to="/forgot-password" className={styles.forgot}>
          Forgot Password?
        </Link>

        <div className={styles.bottomText}>
          Don't have an account? <Link to="/create-account">Sign up</Link>
        </div>
      </div>
    </AuthLayout>
  );
}
