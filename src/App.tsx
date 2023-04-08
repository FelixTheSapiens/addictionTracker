import React, { useState, useEffect } from 'react';
import './css/App.css';
import { getTimePeriod, getTime, saveTime, getHighscore, saveHighscore, getRunning, saveRunning, dropHighscore } from './functions/timeFunctions';


function App() {

  const [isRunning, setRunning] = useState(getRunning());
  const [time, setTime]  = useState(getTime());
  const [highscore, setHighscore] = useState(getHighscore());

  useEffect(() => {

    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
      saveTime(time);
    } else {
      setTime(0);
    }
    saveHighscore(time);
    setHighscore(getHighscore());

    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const runningSwitch = () => {
    setRunning(running => !running);
    saveRunning(!isRunning);
    if(!isRunning) {
      document.body.classList.add('gradient');
    } else {
      document.body.classList.remove('gradient');
    }
    };

  const reset = () => {
    dropHighscore();
    setHighscore(0);
    setTime(0);
    saveTime(0);
    setRunning(false);
    saveRunning(false);
  };

  return (
    <div className="App">
      <button onClick={reset} className='Reset'>
        Reset
      </button>
      <h1 className='Highscore'>
        {getTimePeriod(highscore)}
      </h1>
      <button onClick={runningSwitch} className='Timer'>
        <h1 className='TimerText'>{getTimePeriod(time)}</h1>
      </button>
    </div>
  );
}

export default App;
