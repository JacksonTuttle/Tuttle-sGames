import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../firebase";
import AuthLayout from "./AuthLayout";
import styles from "./Login.module.css";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [emailInUse, setEmailInUse] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Live validation
  useEffect(() => {
    validateEmail(form.email);
    validatePassword(form.password);
    validateConfirmPassword(form.password, form.confirmPassword);
  }, [form.email, form.password, form.confirmPassword]);

  // Check if email already exists in Firebase
  useEffect(() => {
    if (!form.email.includes("@") || !form.email.includes(".")) {
      setEmailInUse(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setCheckingEmail(true);
      try {
        const methods = await fetchSignInMethodsForEmail(auth, form.email);
        setEmailInUse(methods.length > 0);
      } catch (err) {
        console.error(err);
      }
      setCheckingEmail(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [form.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateEmail = (value) => {
    if (!value.includes("@") || !value.includes(".")) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address." }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validatePassword = (value) => {
    let error = "";
    let strength = "";

    if (value.length < 8) error = "Password must be at least 8 characters.";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      error = "Password must contain one special character.";

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

  const allFieldsFilled =
    form.firstName && form.lastName && form.email && form.password && form.confirmPassword;

  const noErrors = !errors.email && !errors.password && !errors.confirmPassword;

  const handleSubmit = async (e) => {
  e.preventDefault();
  setFirebaseError("");

  if (!allFieldsFilled || !noErrors || emailInUse) return;

  try {
    await createUserWithEmailAndPassword(auth, form.email, form.password);
    navigate("/");
  } catch (err) {
    console.error(err);

    if (err.code === "auth/email-already-in-use") {
      setFirebaseError("This email is already registered. Please use another email.");
    } else {
      setFirebaseError("Failed to create account. Try again.");
    }
  }
};

  return (
    <AuthLayout>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Create Account</h1>

        {firebaseError && <p className={styles.errorText}>{firebaseError}</p>}

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

          {/* EMAIL */}
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          {emailInUse && <p className={styles.errorText}>This email is already registered.</p>}

          {/* PASSWORD */}
          <label className={styles.label}>Password</label>
          <div className={styles.passwordInputContainer}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}

          {/* STRENGTH BAR */}
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

          {/* CONFIRM PASSWORD */}
          <label className={styles.label}>Confirm Password</label>
          <div className={styles.passwordInputContainer}>
            <input
              className={styles.input}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className={styles.errorText}>{errors.confirmPassword}</p>
          )}

          {/* SUBMIT */}
          <button
            className={styles.button}
            type="submit"
            disabled={!allFieldsFilled || !noErrors || emailInUse || checkingEmail}
            style={{
              opacity: !allFieldsFilled || !noErrors || emailInUse || checkingEmail ? 0.5 : 1,
              cursor:
                !allFieldsFilled || !noErrors || emailInUse || checkingEmail
                  ? "not-allowed"
                  : "pointer",
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
