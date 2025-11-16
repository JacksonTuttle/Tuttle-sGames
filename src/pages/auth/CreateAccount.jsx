import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import styles from "./Login.module.css";

export default function CreateAccount() {
  return (
    <AuthLayout>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Create Account</h1>

        <label className={styles.label}>First Name</label>
        <input className={styles.input} placeholder="First Name" />

        <label className={styles.label}>Last Name</label>
        <input className={styles.input} placeholder="Last Name" />

        <label className={styles.label}>Phone Number</label>
        <input className={styles.input} placeholder="Phone Number" />

        <label className={styles.label}>Password</label>
        <input className={styles.input} type="password" placeholder="Password" />

        <label className={styles.label}>Confirm Password</label>
        <input className={styles.input} type="password" placeholder="Confirm Password" />

        <button className={styles.button}>SUBMIT</button>

        <div className={styles.bottomText}>
          Already have an account? <Link to="/">Sign in</Link>
        </div>
      </div>
    </AuthLayout>
  );
}
