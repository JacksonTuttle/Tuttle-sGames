import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/CreateAccount";
import ForgotPassword from "./pages/auth/ForgotPassword";
import HomePage from "./pages/HomePage";

import GolfHowToPlayPage from "./pages/games/golf/HowToPlay/GolfHowToPlayPage";
import PlayAgainstAISetupPage from "./pages/games/golf/PlayAgainstAI/Setup/PlayAgainstAISetupPage";
import PlayAgainstAIGamePage from "./pages/games/golf/PlayAgainstAI/Game/PlayAgainstAIGamePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<HomePage />} />

        {/* How to Play */}
        <Route 
          path="/games/golf/how-to-play" 
          element={<GolfHowToPlayPage />} 
        />

        {/* Setup */}
        <Route
          path="/games/golf/play-against-ai-setup"
          element={<PlayAgainstAISetupPage />}
        />

        {/* THE REAL GAME ROUTE */}
        <Route
          path="/games/golf/play-against-ai"
          element={<PlayAgainstAIGamePage />}
        />
      </Routes>
    </Router>
  );
}
