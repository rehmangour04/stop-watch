/** @format */

import { useRef, useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);
  const [rendered, setRendered] = useState(false); // Track if the component has rendered

  useEffect(() => {
    // Set rendered to true when component mounts
    setRendered(true);
  }, []);

  function handleStart() {
    const currentTime = Date.now();
    setStartTime(currentTime);
    setNow(currentTime);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setStartTime(null);
    setNow(null);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  console.log("Component rendered:", rendered); // Log if the component rendered
  return (
    <>
      {/* Render the header only if component has rendered */}
      {rendered && <h1>Stop Watch</h1>}
      <h2>Time: {formatTime(secondsPassed)}</h2>
      <div className="btn">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  );
};

export default App;
