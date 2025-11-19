import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./PlayAgainstAISetup.css";

export default function PlayAgainstAISetup() {
  const navigate = useNavigate();

  const [aiCount, setAiCount] = useState("");
  const [rounds, setRounds] = useState("");

  const handleStart = () => {
    navigate("/games/golf/play-against-ai", {
      state: {
        aiCount,
        rounds,
        expandGolf: true
      },
    });
  };

  return (
    <div className="ai-setup-wrapper">

      {/* BACK BUTTON */}
      <div className="howto-header">
        <button 
          onClick={() =>
            navigate("/home", { state: { expandGolf: true } })
          } 
          className="howto-back-btn"
        >
          <ArrowLeft size={22} />
        </button>
      </div>
      
      <h1 className="ai-setup-title">Play Against AI</h1>

      {/* AI COUNT */}
      <div className="ai-setup-card">
        <label>Number of AI Opponents</label>
        <select
          value={aiCount}
          onChange={(e) => setAiCount(Number(e.target.value))}
          required
        >
          <option value="" disabled>Select AI Count...</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>

      {/* ROUNDS */}
      <div className="ai-setup-card">
        <label>Number of Rounds</label>
        <select
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
          required
        >
          <option value="" disabled>Select Rounds...</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} Rounds
            </option>
          ))}
        </select>
      </div>

      {/* START BUTTON */}
      <button 
        className="ai-start-btn" 
        onClick={handleStart}
        disabled={!aiCount || !rounds}
      >
        Start Game
      </button>
    </div>
  );
}
