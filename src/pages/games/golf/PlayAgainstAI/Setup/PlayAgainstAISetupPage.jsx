import React from "react";
import { useNavigate } from "react-router-dom";
import PlayAgainstAISetup from "./PlayAgainstAISetup";

export default function GolfHowToPlayPage() {
  const navigate = useNavigate();

  return (
    <PlayAgainstAISetup
      onBack={() => navigate("/home", { state: { openGolf: true } })}
    />
  );
}
