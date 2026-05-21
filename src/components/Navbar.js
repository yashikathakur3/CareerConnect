import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <span className="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" role="img">
              <path
                d="M15.2 24.8l-2.1 2.1a6.2 6.2 0 0 1-8.8-8.8l5.1-5.1a6.2 6.2 0 0 1 9.1.4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <path
                d="M24.8 15.2l2.1-2.1a6.2 6.2 0 0 1 8.8 8.8l-5.1 5.1a6.2 6.2 0 0 1-9.1-.4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <path
                d="M15.5 20h9"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
          </span>
          Career Connect
        </Link>
      </div>

      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        {user?.role === "alumni" && (
          <li><NavLink to="/questions">Submit Experience</NavLink></li>
        )}
        {user && (
          <>
            <li><NavLink to="/view">Question Bank</NavLink></li>
            <li><NavLink to="/alumni">Alumni</NavLink></li>
          </>
        )}
        <li><NavLink to="/about">About Us</NavLink></li>
      </ul>

      <div className="auth-buttons">
        {user ? (
          <div className="user-menu">
            <button
              className="user-identity"
              onClick={() => navigate("/profile")}
              type="button"
            >
              <span className="user-avatar">{getInitials(user.fullName)}</span>
              <span className="user-text">
                <span className="user-name">{user.fullName?.split(" ")[0]}</span>
                <span className={`user-role ${user.role}`}>{user.role}</span>
              </span>
            </button>

            <button className="logout-btn" onClick={handleLogout} type="button">
              Logout
            </button>
          </div>
        ) : (
          <>
            <button className="login" onClick={() => navigate("/login")} type="button">
              Login
            </button>

            <button className="register" onClick={() => navigate("/login")} type="button">
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
