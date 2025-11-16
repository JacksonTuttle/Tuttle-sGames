import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    const raw = value.replace(/\D/g, "").slice(0, 10);

    if (raw.length < 4) return raw;
    if (raw.length < 7) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
    return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6)}`;
  };

  // Validate phone number
  const validatePhone = (value) => {
    const raw = value.replace(/\D/g, "");
    if (raw.length < 10) {
      setPhoneError("Phone number must be 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const rawPhone = phone.replace(/\D/g, "");

    // Block login on invalid phone number
    if (phoneError || rawPhone.length < 10) {
      setError("Invalid phone number.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("tuttlesgames_users")) || [];

    const foundUser = users.find(
      (u) => u.phone === rawPhone && u.password === password
    );

    if (!foundUser) {
      setError("Invalid phone number or password.");
      return;
    }

    // Success → redirect to test page
    navigate("/test");
  };

  return (
    <AuthLayout>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Tuttle's Games</h1>

        {error && <p className={styles.errorText}>{error}</p>}

        {/* PHONE NUMBER */}
        <label className={styles.label}>Phone Number</label>
        <input
          className={styles.input}
          placeholder="123-456-7890"
          value={phone}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            setPhone(formatted);
            validatePhone(formatted);
          }}
        />
        {phoneError && <p className={styles.errorText}>{phoneError}</p>}

        {/* PASSWORD */}
        <label className={styles.label}>Password</label>
        <div className={styles.passwordInputContainer}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* SIGN IN BUTTON */}
        <button className={styles.button} onClick={handleLogin}>
          SIGN IN
        </button>

        <Link to="/forgot-password" className={styles.forgot}>
          Forgot Password?
        </Link>

        <div className={styles.bottomText}>
          Don't have an account? <Link to="/create-account">Sign up</Link>
        </div>
      </div>
    </AuthLayout>
  );
}
