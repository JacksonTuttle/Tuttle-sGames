import { Link } from "react-router-dom";
import styles from "./CreateAccount.module.css";

export default function CreateAccount() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Account</h1>

      <input className={styles.input} placeholder="Email" />
      <input className={styles.input} placeholder="Username" />
      <input className={styles.input} type="password" placeholder="Password" />

      <button className={styles.button}>Create Account</button>

      <Link to="/" className={styles.back}>
        Back to Login
      </Link>
    </div>
  );
}
