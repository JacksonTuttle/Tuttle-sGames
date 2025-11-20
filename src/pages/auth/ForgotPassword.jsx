import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  sendPasswordResetEmail, 
  fetchSignInMethodsForEmail 
} from "firebase/auth";
import { auth } from "../../firebase";
import AuthLayout from "./AuthLayout";
import styles from "./Login.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
  setError("");
  setMessage("");

  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
    setError("Enter a valid email address.");
    return;
  }

  try {
    // 2️⃣ If a provider exists, send reset
    await sendPasswordResetEmail(auth, cleanEmail);
    setMessage("Password reset link sent! Check your inbox.");

  } catch (err) {
    console.error(err);

    if (err.code === "auth/invalid-email") {
      setError("Enter a valid email address.");
    } else {
      setError("Unable to reset password. Try again later.");
    }
  }
};


  return (
    <AuthLayout>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Forgot Password</h1>

        {message && <p className={styles.successText}>{message}</p>}
        {error && <p className={styles.errorText}>{error}</p>}

        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className={styles.button} onClick={handleReset}>
          Send Reset Link
        </button>

        <div className={styles.bottomText}>
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </AuthLayout>
  );
}
