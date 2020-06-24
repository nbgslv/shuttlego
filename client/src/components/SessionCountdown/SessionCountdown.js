import React from 'react';
import Countdown from 'react-countdown-now';
import { fromUnixTime } from 'date-fns';

const SessionCountdown = ({ sessionEnd }) => {
  const end = fromUnixTime(sessionEnd);
  return (
    <Countdown date={end} />
  );
};

export default SessionCountdown;
