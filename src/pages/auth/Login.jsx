import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const videoRef = useRef(null);

  useEffect(() => {
  const vid = videoRef.current;
  if (!vid) return;

  const playVideo = () => {
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // iPhone won't play until user interacts → retry on first touch
        const listener = () => {
          vid.play();
          window.removeEventListener("touchstart", listener);
        };
        window.addEventListener("touchstart", listener, { once: true });
      });
    }
  };

  // iPhone fires this event earliest
  vid.addEventListener("loadedmetadata", playVideo);

  return () => vid.removeEventListener("loadedmetadata", playVideo);
}, []);


  return (
    <div className={styles.wrapper}>
      
      <video
        ref={videoRef}
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={`${import.meta.env.BASE_URL}background.mp4`} type="video/mp4" />
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
