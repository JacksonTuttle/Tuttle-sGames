import React from "react";
import { useNavigate } from "react-router-dom";
import GolfHowToPlay from "./GolfHowToPlay";

export default function GolfHowToPlayPage() {
  const navigate = useNavigate();

  return (
    <GolfHowToPlay
      onBack={() => navigate("/home", { state: { openGolf: true } })}
    />
  );
}
