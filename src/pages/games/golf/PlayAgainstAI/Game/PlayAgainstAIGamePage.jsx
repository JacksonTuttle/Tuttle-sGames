import { useLocation } from "react-router-dom";
import PlayAgainstAIGame from "./PlayAgainstAIGame";

export default function PlayAgainstAIGamePage() {
  const { state } = useLocation();

  return (
    <PlayAgainstAIGame 
      aiCount={state?.aiCount} 
      rounds={state?.rounds}
    />
  );
}
