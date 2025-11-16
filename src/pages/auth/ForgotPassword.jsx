import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Forgot Password</h1>

      <input className={styles.input} placeholder="Enter your email" />

      <button className={styles.button}>Send Reset Link</button>

      <Link to="/" className={styles.back}>
        Back to Login
      </Link>
    </div>
  );
}
