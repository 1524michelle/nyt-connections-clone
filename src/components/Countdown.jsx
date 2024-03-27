// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './Countdown.css';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to next midnight
    const difference = midnight - now;

    let timeLeft = {};

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      timeLeft = {
        hours,
        minutes,
        seconds,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      <h2 id='countdown'>{`${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes.toString().padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`}</h2>
    </div>
  );
};

export default CountdownTimer;
