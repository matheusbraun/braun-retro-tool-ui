import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(5);

  const [stopTimer, setStopTimer] = useState(true);

  const updateTime = () => {
    if (!stopTimer) {
      if (minutes === 0 && seconds === 0) {
        setStopTimer(true);
        setSeconds(0);
        setMinutes(5);
      } else {
        if (seconds === 0) {
          setMinutes(minutes => minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds => seconds - 1);
        }
      }
    }
  };

  useEffect(() => {
    const token = setTimeout(updateTime, 1000);

    return () => {
      clearTimeout(token);
    };
  });

  return (
    <>
      <p>
        time: {String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </p>
      <button onClick={() => setStopTimer(stopTimer => !stopTimer)}>
        Dale
      </button>
    </>
  );
};

export default Timer;
