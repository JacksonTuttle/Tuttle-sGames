import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import styles from "./Login.module.css";

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Forgot Password</h1>

        <label className={styles.label}>Phone Number</label>
        <input className={styles.input} placeholder="Enter your phone number" />

        <button className={styles.button}>Send Text</button>

        <div className={styles.bottomText}>
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </AuthLayout>
  );
}
