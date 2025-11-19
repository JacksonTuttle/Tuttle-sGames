import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../../firebase";
import AuthLayout from "./AuthLayout";
import styles from "./Login.module.css";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [oobCode, setOobCode] = useState("");
  const [validCode, setValidCode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Extract oobCode from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("oobCode");
    setOobCode(code);

    if (!code) {
      setError("Invalid or missing reset link.");
      setLoading(false);
      return;
    }

    // Verify code with Firebase
    verifyPasswordResetCode(auth, code)
      .then(() => {
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

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess("Password successfully reset! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. Please try again.");
    }
  };

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <AuthLayout>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Reset Password</h1>

        {error && <p className={styles.errorText}>{error}</p>}
        {success && <p className={styles.successText}>{success}</p>}

        {validCode && !success && (
          <form onSubmit={handleSubmit}>
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

            <button className={styles.button} type="submit">
              Change Password
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
