import React, { useState, useEffect } from 'react';
import './css/App.css';
import { getTimePeriod, getTime, saveTime, getHighscore, saveHighscore, getSober, saveSober, dropHighscore } from './functions/timeFunctions';


function App() {

  const [isSober, setSober] = useState(getSober());
  const [time, setTime]  = useState(getTime());
  const [highscore, setHighscore] = useState(getHighscore());

  useEffect(() => {

    let intervalId: NodeJS.Timeout;

    if (isSober) {
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
  }, [isSober, time]);

  const soberSwitch = () => {setSober(sober => !sober); saveSober(isSober)};
  const reset = () => {
    dropHighscore();
    setHighscore(0);
    setTime(0);
    saveTime(0);
    setSober(false);
    saveSober(false);
  };

  return (
    <div className="App">
      <button onClick={reset}>Reset</button>
      <h1>{getTimePeriod(highscore)}</h1>
      <button onClick={soberSwitch}>
        <h1>{getTimePeriod(time)}</h1>
      </button>
    </div>
  );
}

export default App;
