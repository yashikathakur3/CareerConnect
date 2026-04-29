import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";   // ← make sure this is here

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import AlumniPage from "./pages/AlumniPage.jsx";
import QuestionBank from "./pages/QuestionBank";
import QuestionBankView from "./pages/QuestionBankView";  // ← new import
import Login from "./components/Login";
import Profile from "./pages/Profile";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/alumni" element={<AlumniPage />} />
        <Route path="/questions" element={<QuestionBank />} />
        <Route path="/view" element={<QuestionBankView />} />  {/* ← new route */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

