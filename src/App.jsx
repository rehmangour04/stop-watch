/** @format */

import { useRef, useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setNow(Date.now());
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function handleStart() {
    const currentTime = Date.now();
    setStartTime(currentTime);
    setNow(currentTime);
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setStartTime(null);
    setNow(null);
  }

  let timeElapsed = 0;
  if (startTime != null && now != null) {
    timeElapsed = Math.floor((now - startTime) / 1000);
  }

  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  const formatTime = (time) => {
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      {rendered && <h1>Stopwatch</h1>}
      <h2>Time: {formatTime(timeElapsed)}</h2>
      <div className="btn">
        {isRunning ? (
          <button onClick={handleStop}>Stop</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  );
};

export default App;
