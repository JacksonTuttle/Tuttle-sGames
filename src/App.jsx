import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount";
import ForgotPassword from "./pages/auth/ForgotPassword";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
