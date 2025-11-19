import { useEffect, useState } from "react";
import "../../components/styles/Card.css";
import "../../components/styles/PlayerHand.css";
import "../../components/styles/GameBoard.css";
import "./PlayAgainstAIGame.css";

import Card from "../../components/Card";

export default function PlayAgainstAIGame({ aiCount, rounds }) {
  // ------------------------------
  // 🔹 GAME STATE
  // ------------------------------
  const [deck, setDeck] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);

  const [playerGrid, setPlayerGrid] = useState([]);
  const [aiGrids, setAiGrids] = useState([]);

  const [phase, setPhase] = useState("initial-flip"); // initial-flip → player-turn → ai-turn
  const [flippedCount, setFlippedCount] = useState(0);

  const [drawnCard, setDrawnCard] = useState(null);

  // ------------------------------
  // 🔹 CREATE A STANDARD DECK
  // ------------------------------
  const createDeck = () => {
    const suits = ["♠", "♥", "♦", "♣"];
    const ranks = [
      { label: "A", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
      { label: "6", value: 6 },
      { label: "7", value: 7 },
      { label: "8", value: 8 },
      { label: "9", value: 9 },
      { label: "10", value: 10 },
      { label: "J", value: 10 },
      { label: "Q", value: 13 }, // Big Bitch Queen
      { label: "K", value: 10 }
    ];

    let fullDeck = [];
    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        fullDeck.push({
          id: crypto.randomUUID(),
          suit,
          label: rank.label,
          value: rank.value,
          faceUp: false
        });
      });
    });

    return fullDeck;
  };

  // ------------------------------
  // 🔹 SHUFFLE
  // ------------------------------
  const shuffle = (array) => {
    const arr = [...array];
    let m = arr.length,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };

  // ------------------------------
  // 🔹 INITIAL DEAL
  // ------------------------------
  const dealGame = () => {
    let fullDeck = shuffle(createDeck());

    // Deal 6 to player
    const player = fullDeck.splice(0, 6).map((c) => ({ ...c }));

    // Deal 6 to each AI
    const ais = [];
    for (let i = 0; i < aiCount; i++) {
      const grid = fullDeck.splice(0, 6).map((c) => ({ ...c }));
      ais.push(grid);
    }

    // Place first card face-up into discard pile
    const firstDiscard = fullDeck.splice(0, 1)[0];
    firstDiscard.faceUp = true;

    setPlayerGrid(player);
    setAiGrids(ais);
    setDeck(fullDeck);
    setDiscardPile([firstDiscard]);
  };

  // ------------------------------
  // 🔹 START GAME
  // ------------------------------
  useEffect(() => {
    dealGame();
  }, []);

  // ------------------------------
  // 🔹 PLAYER FLIPS 2 CARDS
  // ------------------------------
  const handleInitialFlip = (index) => {
    if (phase !== "initial-flip") return;

    const updated = [...playerGrid];
    if (!updated[index].faceUp) {
      updated[index].faceUp = true;
      setPlayerGrid(updated);
      setFlippedCount(flippedCount + 1);

      if (flippedCount + 1 === 2) {
        // Flip 2 random cards for each AI
        const updatedAIs = aiGrids.map((grid) => {
          const indices = [0, 1, 2, 3, 4, 5];
          const a = indices.sort(() => 0.5 - Math.random()).slice(0, 2);

          const newGrid = grid.map((c, i) => ({
            ...c,
            faceUp: a.includes(i) ? true : false
          }));

          return newGrid;
        });

        setAiGrids(updatedAIs);
        setPhase("player-turn");
      }
    }
  };

  // ------------------------------
  // 🔹 DRAW FROM DECK
  // ------------------------------
  const drawFromDeck = () => {
    if (phase !== "player-turn") return;
    const top = deck[0];
    setDrawnCard(top);
    setDeck(deck.slice(1));
  };

  // ------------------------------
  // 🔹 DRAW FROM DISCARD
  // ------------------------------
  const drawFromDiscard = () => {
    if (phase !== "player-turn") return;
    const top = discardPile[discardPile.length - 1];
    setDrawnCard(top);
    setDiscardPile(discardPile.slice(0, -1));
  };

  // ------------------------------
  // 🔹 SWAP CARD INTO GRID
  // ------------------------------
  const handleSwap = (index) => {
    if (!drawnCard || phase !== "player-turn") return;

    const updated = [...playerGrid];
    const replacedCard = updated[index];

    // New card goes into grid face-up
    updated[index] = { ...drawnCard, faceUp: true };

    // Old card goes to discard face-up
    const newDiscard = [...discardPile, { ...replacedCard, faceUp: true }];

    setPlayerGrid(updated);
    setDiscardPile(newDiscard);
    setDrawnCard(null);

    // TODO → End turn → AI turn next
  };

  // ------------------------------
  // 🔹 DISCARD DRAWN CARD
  // ------------------------------
  const discardDrawn = () => {
    if (!drawnCard) return;

    setDiscardPile([...discardPile, { ...drawnCard, faceUp: true }]);
    setDrawnCard(null);

    // TODO → End turn → AI turn next
  };

  // ------------------------------
  // 🔹 UI RENDER
  // ------------------------------
  return (
  <div className="table">

    {/* AI TOP (always AI #1) */}
    {aiGrids[0] && (
      <div className="ai-top player-area">
        <div className="player-label">AI 1</div>
        <div className="grid-3x2">
          {aiGrids[0].map((card) => (
            <Card key={card.id} card={card} faceUp={card.faceUp} />
          ))}
        </div>
      </div>
    )}

{/* AI LEFT (AI #2) */}
{aiGrids[1] && (
  <div className="player-area ai-left">
    <div className="player-label">AI 2</div>
    <div className="grid-3x2">
      {aiGrids[1].map((card) => (
        <Card key={card.id} card={card} faceUp={card.faceUp} />
      ))}
    </div>
  </div>
)}

{/* AI RIGHT (AI #3) */}
{aiGrids[2] && (
  <div className="player-area ai-right">
    <div className="player-label">AI 3</div>
    <div className="grid-3x2">
      {aiGrids[2].map((card) => (
        <Card key={card.id} card={card} faceUp={card.faceUp} />
      ))}
    </div>
  </div>
)}

    {/* CENTER AREA (deck + discard + drawn card) */}
    <div className="center-area">
      <div className="pile-container" onClick={drawFromDeck}>
        <div className="pile-label">Deck</div>
        <div className="deck-card card-back"></div>
      </div>

      <div className="pile-container" onClick={drawFromDiscard}>
        <div className="pile-label">Discard</div>
        {discardPile.length > 0 ? (
          <Card card={discardPile[discardPile.length - 1]} faceUp={true} />
        ) : (
          <div className="deck-card card-back"></div>
        )}
      </div>

      {drawnCard && (
        <div className="drawn-card">
          <Card card={drawnCard} faceUp={true} />
        </div>
      )}
    </div>

    {/* PLAYER BOTTOM (YOU) */}
    <div className="player-bottom player-area">
      <div className="player-label">You</div>
      <div className="grid-3x2">
        {playerGrid.map((card, i) => (
          <div
            key={card.id}
            className="grid-slot"
            onClick={() =>
              phase === "initial-flip" ? handleInitialFlip(i) : handleSwap(i)
            }
          >
            <Card card={card} faceUp={card.faceUp} />
          </div>
        ))}
      </div>
    </div>

  </div>
);
}
