import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import styles from "./Login.module.css";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");

  // Live validation logic
  useEffect(() => {
    validatePhone(form.phone);
    validatePassword(form.password);
    validateConfirmPassword(form.password, form.confirmPassword);
  }, [form.phone, form.password, form.confirmPassword]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Only allow numbers, auto-format phone number
    if (name === "phone") {
      value = formatPhoneNumber(value);
    }

    setForm({ ...form, [name]: value });
  };

  const validatePhone = (value) => {
    const raw = value.replace(/\D/g, "");
    if (raw.length < 10) {
      setErrors((prev) => ({ ...prev, phone: "Phone number must be 10 digits." }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validatePassword = (value) => {
    let strength = "";
    let error = "";

    // Password rules
    if (value.length < 8) error = "Password must be at least 8 characters.";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      error = "Password must include one special character.";

    // Strength meter
    if (!value) strength = "";
    else if (value.length < 8) strength = "Weak";
    else if (/[!@#$%^&*]/.test(value)) strength = "Strong";
    else strength = "Medium";

    setPasswordStrength(strength);
    setErrors((prev) => ({ ...prev, password: error }));
  };

  const validateConfirmPassword = (password, confirm) => {
    if (confirm && confirm !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const formatPhoneNumber = (value) => {
    const raw = value.replace(/\D/g, "").slice(0, 10);

    if (raw.length < 4) return raw;
    if (raw.length < 7) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
    return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6)}`;
  };

  const allFieldsFilled =
    form.firstName && form.lastName && form.phone && form.password && form.confirmPassword;

  const noErrors =
    !errors.phone && !errors.password && !errors.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!allFieldsFilled || !noErrors) return;

    // Save account (simple local system for now)
    const userData = {
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone.replace(/\D/g, ""), // raw phone
      password: form.password,
    };

    localStorage.setItem("tuttlesgames_user", JSON.stringify(userData));

    // Redirect to login
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Create Account</h1>

        <form onSubmit={handleSubmit}>

          {/* FIRST NAME */}
          <label className={styles.label}>First Name</label>
          <input
            className={styles.input}
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />

          {/* LAST NAME */}
          <label className={styles.label}>Last Name</label>
          <input
            className={styles.input}
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />

          {/* PHONE NUMBER */}
          <label className={styles.label}>Phone Number</label>
          <input
            className={styles.input}
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
            maxLength={12}
          />
          {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}

          {/* PASSWORD */}
          <label className={styles.label}>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
            />

            {/* Error Message */}
            {errors.password && (
              <p className={styles.errorText}>{errors.password}</p>
            )}

            {/* Strength Bar */}
            {form.password && (
              <div className={styles.strengthContainer}>
                <div
                  className={`${styles.strengthBar} ${
                    passwordStrength === "Weak"
                      ? styles.strengthWeak
                      : passwordStrength === "Medium"
                      ? styles.strengthMedium
                      : passwordStrength === "Strong"
                      ? styles.strengthStrong
                      : ""
                  }`}
                ></div>
              </div>
          )}
          </div>


          {/* CONFIRM PASSWORD */}
          <label className={styles.label}>Confirm Password</label>
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className={styles.errorText}>{errors.confirmPassword}</p>
          )}

          {/* SUBMIT */}
          <button
            className={styles.button}
            type="submit"
            disabled={!allFieldsFilled || !noErrors}
            style={{
              opacity: !allFieldsFilled || !noErrors ? 0.5 : 1,
              cursor: !allFieldsFilled || !noErrors ? "not-allowed" : "pointer",
            }}
          >
            SUBMIT
          </button>
        </form>

        <div className={styles.bottomText}>
          Already have an account? <Link to="/">Sign in</Link>
        </div>
      </div>
    </AuthLayout>
  );
}
