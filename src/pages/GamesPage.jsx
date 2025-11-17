import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // optional icons
import "./GamesPage.css";

export default function GamesPage() {
  const [golfOpen, setGolfOpen] = useState(false);

  return (
    <div className="games-page">

      {/* GAME CARD */}
      <div className="game-card">
        <div className="game-header" onClick={() => setGolfOpen(!golfOpen)}>
          <h2>Golf</h2>
          {golfOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>

        {/* EXPAND SECTION */}
        <div
          className="game-expand"
          style={{
            maxHeight: golfOpen ? "300px" : "0px",
            opacity: golfOpen ? 1 : 0,
          }}
        >
          <button className="game-btn">Host Game</button>
          <button className="game-btn">Join Game</button>
          <button className="game-btn">How to Play</button>
          <button className="game-btn">Play Against AI</button>
        </div>
      </div>

    </div>
  );
}
