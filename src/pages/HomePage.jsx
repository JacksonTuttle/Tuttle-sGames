import { useState } from "react";
import GamesPage from "./GamesPage";
import SettingsPage from "./SettingsPage";
import "./css/HomePage.css";

export default function HomePage() {
  const [tab, setTab] = useState("games");

  return (
    <div className="home-container">
      <div className="page-content">
        {tab === "games" && <GamesPage />}
        {tab === "settings" && <SettingsPage />}
      </div>

      {/* Bottom Banner */}
      <div className="bottom-nav">
        <button 
          className={tab === "games" ? "nav-btn active" : "nav-btn"}
          onClick={() => setTab("games")}
        >
          🎮 Games
        </button>

        <button 
          className={tab === "settings" ? "nav-btn active" : "nav-btn"}
          onClick={() => setTab("settings")}
        >
          ⚙️ Settings
        </button>
      </div>
    </div>
  );
}
