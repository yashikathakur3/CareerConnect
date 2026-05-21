import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import { useAuth } from "./components/AuthContext";
import Login from "./components/Login";
import AboutUs from "./pages/AboutUs";
import AlumniPage from "./pages/AlumniPage.jsx";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import QuestionBank from "./pages/QuestionBank";
import QuestionBankView from "./pages/QuestionBankView";

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="route-status">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="route-status">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/alumni"
          element={
            <ProtectedRoute>
              <AlumniPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <ProtectedRoute roles={["alumni"]}>
              <QuestionBank />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view"
          element={
            <ProtectedRoute>
              <QuestionBankView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
