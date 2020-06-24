import React from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import SessionCountdown from '../SessionCountdown/SessionCountdown';

const SessionWelcome = ({ guest }) =>
  // TODO add checkin-out dates and session ID
  // eslint-disable-next-line implicit-arrow-linebreak
  (
    <Paper>
      <Typography variant="h5">Welcome</Typography>
      <Typography variant="h6">
        {guest.firstName}
        {' '}
        {guest.lastName}
      </Typography>
      <br />
      <Typography variant="subtitle1">Room Number: </Typography>
      <Typography variant="subtitle2">{guest.roomNumber}</Typography>
      <br />
      <SessionCountdown sessionEnd={guest.sessionEnd} />
    </Paper>
  );

export default SessionWelcome;
