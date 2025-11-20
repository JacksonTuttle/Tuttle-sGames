import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../../firebase";
import AuthLayout from "./AuthLayout";
import styles from "./Login.module.css";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [oobCode, setOobCode] = useState("");
  const [firebaseEmail, setFirebaseEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [validCode, setValidCode] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Extract oobCode from hash URL (HashRouter)
  useEffect(() => {
    let params;

    // URL looks like:  /#/reset-password?oobCode=XXX&mode=resetPassword&apiKey=...
    if (window.location.hash.includes("?")) {
      const hashPart = window.location.hash.split("?")[1];
      params = new URLSearchParams(hashPart);
    } 
    // (Failsafe: BrowserRouter)
    else {
      params = new URLSearchParams(window.location.search);
    }

    const code = params.get("oobCode");
    setOobCode(code);

    if (!code) {
      setError("Invalid or missing reset link.");
      setLoading(false);
      return;
    }

    verifyPasswordResetCode(auth, code)
      .then((emailFromFirebase) => {
        setFirebaseEmail(emailFromFirebase);
        setValidCode(true);
      })
      .catch(() => {
        setError("Reset link is invalid or has expired.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (email.trim().toLowerCase() !== firebaseEmail.toLowerCase()) {
      setError("Email does not match this reset request.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess("Password updated! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      setError("Password reset failed. Try again.");
    }
  };

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <AuthLayout>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Reset Password</h1>

        {error && !validCode && (
          <>
            <p className={styles.errorText}>{error}</p>
            <button className={styles.button} onClick={() => navigate("/forgot-password")}>
              Request New Reset Link
            </button>
          </>
        )}

        {success && <p className={styles.successText}>{success}</p>}

        {validCode && !success && (
          <form onSubmit={handleSubmit}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />

            <label className={styles.label}>New Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />

            <label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />

            <button type="submit" className={styles.button}>
              Update Password
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
