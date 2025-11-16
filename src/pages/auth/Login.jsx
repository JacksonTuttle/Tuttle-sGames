import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.wrapper}>

      {/* VIDEO BACKGROUND */}
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY FOR READABILITY */}
      <div className={styles.overlay}></div>

      {/* LOGIN BOX */}
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Tuttle's Games</h1>

        <label className={styles.label}>User Name</label>
        <input className={styles.input} placeholder="Enter Username" />

        <label className={styles.label}>Password</label>
        <input className={styles.input} type="password" placeholder="Enter Password" />

        <button className={styles.button}>SIGN IN</button>

        <Link to="/forgot-password" className={styles.forgot}>
          Forgot Password?
        </Link>

        <div className={styles.bottomText}>
          Don't have an account? <Link to="/create-account">Sign up</Link>
        </div>
      </div>

    </div>
  );
}
