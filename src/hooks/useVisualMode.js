import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode) => {
    setMode(newMode);
    const newHistory = [...history]
    newHistory.push(newMode);
    setHistory(newHistory);
  };

  const back = () => {
    const historyCopy = [...history];
    historyCopy.pop();
    setHistory(historyCopy);

    const previousMode = historyCopy.slice(-1)[0];
    setMode(previousMode);
  };

  return { mode, transition, back };
}
