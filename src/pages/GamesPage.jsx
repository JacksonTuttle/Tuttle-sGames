import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./css/GamesPage.css";

export default function GamesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [golfOpen, setGolfOpen] = useState(
    location.state?.openGolf || location.state?.expandGolf || false
  );

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

          <button
            className="game-btn"
            onClick={() => navigate("/games/golf/how-to-play")}
          >
            How to Play
          </button>

          <button
            className="game-btn"
            onClick={() =>
              navigate("/games/golf/play-against-ai-setup", {
                state: { expandGolf: true },
              })
            }
          >
            Play Against AI
          </button>
          
        </div>
      </div>

    </div>
  );
}
