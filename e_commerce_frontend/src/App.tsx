import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/auth/Login";
import Registration from "./features/auth/Registration";
import Home from "./features/home/Home";
import OtpVerification from "./features/auth/OtpVerification";
import LoginScreen from "./features/auth/LoginScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/loginScreen" />} />
        <Route path="/loginScreen" element={<LoginScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
      </Routes>
    </Router>
  );
}

export default App;
