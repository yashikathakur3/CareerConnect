import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import InputField from "./InputFeild";
import RoleSelector from "./RoleSelecter";

function LoginForm({ onSwitch }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email address";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Minimum 6 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cc-form-body">
      <h2 className="cc-form-title">Welcome back</h2>
      <p className="cc-form-subtitle">Sign in to your Career Connect account</p>

      {serverError && (
        <div className="cc-error-banner">⚠ {serverError}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <RoleSelector value={form.role} onChange={handleChange} />
        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
        />
        <div className="cc-checkbox-row">
          <label className="cc-checkbox-label">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            Remember me
          </label>
          <button type="button" className="cc-link">Forgot password?</button>
        </div>
        <button className="cc-btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In →"}
        </button>
      </form>

      <div className="cc-switch">
        Don't have an account?{" "}
        <button type="button" className="cc-link" onClick={onSwitch}>
          Create one
        </button>
      </div>
    </div>
  );
}

export default LoginForm;