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
.map((n) => n[0])
.join("")
.toUpperCase();
};

return ( <nav className="navbar"> <div className="logo">
<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
Career Connect </Link> </div>


  <ul className="nav-links">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/questions">Alumni Form</Link></li>
    <li><Link to="/view">View Questions</Link></li>
    <li><Link to="/alumni">Alumni</Link></li>
    <li><Link to="/about">About Us</Link></li>
  </ul>

  <div className="auth-buttons">
    {user ? (
      <div className="user-menu">

        <div
          className="user-avatar"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        >
          {getInitials(user?.fullName)}
        </div>

        <span className="user-name">
          {user?.fullName?.split(" ")[0]}
        </span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    ) : (
      <>
        <button className="login" onClick={() => navigate("/login")}>
          Login
        </button>

        <button className="register" onClick={() => navigate("/login")}>
          Register
        </button>
      </>
    )}
  </div>
</nav>


);
}

export default Navbar;
