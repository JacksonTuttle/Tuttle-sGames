export default function Card({ card, faceUp }) {
  return (
    <div className="card-container">
      {faceUp ? (
        <div className="card-face">
          <div className="card-label">{card.label}</div>
          <div className="card-suit">{card.suit}</div>
        </div>
      ) : (
        <div className="card-back"></div>
      )}
    </div>
  );
}
