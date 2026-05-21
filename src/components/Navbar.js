import { Link, useNavigate } from "react-router-dom";
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
          Career Connect
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {user?.role === "alumni" && (
          <li><Link to="/questions">Submit Experience</Link></li>
        )}
        {user && (
          <>
            <li><Link to="/view">Question Bank</Link></li>
            <li><Link to="/alumni">Alumni</Link></li>
          </>
        )}
        <li><Link to="/about">About Us</Link></li>
      </ul>

      <div className="auth-buttons">
        {user ? (
          <div className="user-menu">
            <button
              className="user-avatar"
              onClick={() => navigate("/profile")}
              title="View profile"
              type="button"
            >
              {getInitials(user.fullName)}
            </button>

            <span className="user-name">
              {user.fullName?.split(" ")[0]} ({user.role})
            </span>

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
