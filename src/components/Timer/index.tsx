import React, { useEffect, useState, memo } from 'react';

import { faPause, faPlay, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css';

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

  const resetTime = () => {
    setStopTimer(true);
    setMinutes(5);
    setSeconds(0);
  };

  useEffect(() => {
    const token = setTimeout(updateTime, 1000);

    return () => {
      clearTimeout(token);
    };
  });

  const TimerButton = () => {
    if (stopTimer) {
      return (
        <FontAwesomeIcon
          icon={faPlay}
          onClick={() => setStopTimer(false)}
          title="Play"
          color="#006C67"
        />
      );
    }

    return (
      <FontAwesomeIcon
        icon={faPause}
        onClick={() => setStopTimer(true)}
        title="Pause"
        color="#6369D1"
      />
    );
  };

  return (
    <div className="timer">
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <TimerButton />
      <FontAwesomeIcon
        icon={faUndo}
        title="Restart"
        color="#E3B505"
        onClick={resetTime}
      />
    </div>
  );
};

export default memo(Timer);
