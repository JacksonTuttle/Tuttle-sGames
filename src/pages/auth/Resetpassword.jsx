import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../../firebase";
import AuthLayout from "./AuthLayout";
import styles from "./Login.module.css";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [oobCode, setOobCode] = useState("");
  const [firebaseEmail, setFirebaseEmail] = useState(""); // email tied to the reset link
  const [loading, setLoading] = useState(true);
  const [validCode, setValidCode] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Extract oobCode from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("oobCode");
    setOobCode(code);

    if (!code) {
      setError("Invalid or missing reset link.");
      setLoading(false);
      return;
    }

    // Verify reset code
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
      setError("Email does not match the account associated with this reset link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess("Password updated successfully! Redirecting to login...");
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

        {/* INVALID LINK */}
        {error && !validCode && (
          <>
            <p className={styles.errorText}>{error}</p>
            <button
              className={styles.button}
              onClick={() => navigate("/forgot-password")}
            >
              Request New Reset Link
            </button>
          </>
        )}

        {/* SUCCESS */}
        {success && <p className={styles.successText}>{success}</p>}

        {/* FORM */}
        {validCode && !success && (
          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* NEW PASSWORD */}
            <label className={styles.label}>New Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* CONFIRM PASSWORD */}
            <label className={styles.label}>Confirm Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className={styles.button} type="submit">
              Update Password
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
