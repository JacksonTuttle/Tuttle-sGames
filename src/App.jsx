import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount";
import ForgotPassword from "./pages/auth/ForgotPassword";
import HomePage from "./pages/HomePage";
import GolfHowToPlayPage from "./pages/golf/GolfHowToPlayPage";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/golf/how-to-play" element={<GolfHowToPlayPage />} />
      </Routes>
    </Router>
  );
}
