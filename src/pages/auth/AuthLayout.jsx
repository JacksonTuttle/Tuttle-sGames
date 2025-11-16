import { useRef, useEffect } from "react";
import styles from "./Login.module.css";

export default function AuthLayout({ children }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const playVideo = () => {
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const listener = () => {
            vid.play();
            window.removeEventListener("touchstart", listener);
          };
          window.addEventListener("touchstart", listener, { once: true });
        });
      }
    };

    vid.addEventListener("loadedmetadata", playVideo);
    return () => vid.removeEventListener("loadedmetadata", playVideo);
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Background Video */}
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

      {/* Dark overlay */}
      <div className={styles.overlay}></div>

      {/* Page Content (login box, fields, etc.) */}
      {children}
    </div>
  );
}
