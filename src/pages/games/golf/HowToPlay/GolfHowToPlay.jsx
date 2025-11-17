import React from "react";
import { ArrowLeft } from "lucide-react";
import "./GolfHowToPlay.css";

export default function GolfHowToPlay({ onBack }) {
  return (
    <div className="howto-wrapper">

      {/* HEADER */}
      <div className="howto-header">
        <button onClick={onBack} className="howto-back-btn">
          <ArrowLeft size={22} />
        </button>
        <h1 className="howto-title" style={{ fontSize: "2rem" }}>
          How to Play Golf
        </h1>
      </div>

      {/* MAIN CARD */}
      <div className="howto-card">

        {/* The Goal */}
        <div>
          <h2 className="howto-title">The Goal</h2>
          <p className="howto-text">
            Finish each round with the lowest score. Players swap cards, reveal
            cards, and use strategy to create the best layout.
          </p>
        </div>

        {/* Card Layout */}
        <div>
          <h2 className="howto-title">📇 Card Layout</h2>
          <ul className="howto-list">
            <li>You have 6 cards arranged in a 3×2 grid.</li>
            <li>All cards start face-down.</li>
            <li>You reveal and swap cards during your turns.</li>
          </ul>
        </div>

        {/* Objective */}
        <div>
          <h2 className="howto-title">🎯 Objective</h2>
          <p className="howto-text">
            Build the lowest scoring grid by choosing which cards to keep and
            which to swap.
          </p>
        </div>

        {/* Card Values */}
        <div>
          <h2 className="howto-title">🃏 Card Values</h2>
          <ul className="howto-list">
            <li>Aces = 1 point</li>
            <li>Numbered cards = their face value (2–10)</li>
            <li>Jacks = 10</li>
            <li>Kings = 10</li>
            <li>Queens (Big Bitch Queen) = 13</li>
            <li>No jokers in this version</li>
            <li>Matching pairs in a column cancel out (0 points)</li>
          </ul>
        </div>

        {/* Turn Flow */}
        <div>
          <h2 className="howto-title">⛳ Turn Flow</h2>
          <ul className="howto-list">
            <li>Draw from the deck or discard pile.</li>
            <li>Swap the drawn card with one of your cards — OR discard it.</li>
            <li>If swapped, your replaced card goes face-up into the discard pile.</li>
            <li>Once all 6 cards are face-up, your round is locked.</li>
          </ul>
        </div>

        {/* Ending the Round */}
        <div>
          <h2 className="howto-title">🏁 Ending the Round</h2>
          <p className="howto-text">
            When a player flips all their cards face-up, everyone else gets one
            final turn before scoring.
          </p>
        </div>

        {/* Penalty */}
        <div>
          <h2 className="howto-title">⚠️ The Curt Rule</h2>
          <p className="howto-text">
            If the first player to go out ends with a higher score than someone
            else, they get a <strong>+10 point penalty</strong>.  
            Ties do not apply the penalty.
          </p>
        </div>

      </div>
    </div>
  );
}
