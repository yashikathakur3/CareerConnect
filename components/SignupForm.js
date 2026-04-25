import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import InputField from "./InputFeild";
import RoleSelector from "./RoleSelecter";

function SignupForm({ onSwitch }) {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    year: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    else if (form.fullName.trim().length < 3)
      errs.fullName = "Name must be at least 3 characters";
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email address";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Minimum 6 characters required";
    else if (!/[A-Z]/.test(form.password))
      errs.password = "Must include at least one uppercase letter";
    if (!form.confirmPassword)
      errs.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (!form.year)
      errs.year = form.role === "student"
        ? "Please select your current year"
        : "Please select graduation year";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await signup({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
        year: form.year,
      });
      navigate("/");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const studentYears = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const alumniYears = Array.from({ length: 30 }, (_, i) => `${2024 - i}`);

  return (
    <div className="cc-form-body">
      <h2 className="cc-form-title">Join Career Connect</h2>
      <p className="cc-form-subtitle">Build your professional network today</p>

      {serverError && (
        <div className="cc-error-banner">⚠ {serverError}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <RoleSelector value={form.role} onChange={handleChange} />
        <InputField
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Alex Johnson"
        />
        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@college.edu"
        />
        <div className="cc-row">
          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Min. 6 chars + uppercase"
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Repeat password"
          />
        </div>

        <div className="cc-field">
          <label className="cc-label">
            {form.role === "student" ? "Current Year" : "Graduation Year"}
          </label>
          <select
            className={`cc-input${errors.year ? " error" : ""}`}
            name="year"
            value={form.year}
            onChange={handleChange}
          >
            <option value="">Select year</option>
            {(form.role === "student" ? studentYears : alumniYears).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.year && <p className="cc-error-msg">⚠ {errors.year}</p>}
        </div>

        <button className="cc-btn" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account →"}
        </button>
      </form>

      <div className="cc-switch">
        Already have an account?{" "}
        <button type="button" className="cc-link" onClick={onSwitch}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SignupForm;