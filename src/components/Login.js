import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Login() {
  const [tab, setTab] = useState("login");

  return (
    <div className="cc-root">

      {/* BRAND */}
      <div className="cc-brand">
        <div className="cc-brand-logo">
          <div className="cc-brand-icon">🔗</div>
          <h1>Career<span>Connect</span></h1>
        </div>
        <p>Bridging students &amp; alumni for a brighter future</p>
      </div>

      {/* CARD — this is the narrow centered white box */}
      <div className="cc-card">

        {/* TABS */}
        <div className="cc-tabs">
          <button
            className={`cc-tab${tab === "login" ? " active" : ""}`}
            onClick={() => setTab("login")}
          >
            Sign In
          </button>
          <button
            className={`cc-tab${tab === "signup" ? " active" : ""}`}
            onClick={() => setTab("signup")}
          >
            Create Account
          </button>
        </div>

        {/* FORM CONTENT */}
        {tab === "login"
          ? <LoginForm onSwitch={() => setTab("signup")} />
          : <SignupForm onSwitch={() => setTab("login")} />
        }

      </div>

      {/* FOOTER */}
      <div className="cc-footer">
         Secure &amp; private &nbsp;·&nbsp; <span>Career Connect</span> &nbsp;·&nbsp; For students &amp; alumni
      </div>

    </div>
  );
}

export default Login;








