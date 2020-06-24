import React from 'react';
import { connect } from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import FlightStatus from './FlightStatus';

const mapStateToProps = state => ({
  flightTerminal: state.register.terminal,
  ddate: state.forms.firstStep.ddate,
  dest: state.register.dest,
  checkinZone: state.register.checkinZone,
  checkinCounters: state.register.checkinCounters,
  flightNumber: state.register.flightNumber,
});

const FlightData = (props) => {
  const {
    flightTerminal,
    ddate,
    dest,
    checkinZone,
    checkinCounters,
    flightNumber,
    fields,
  } = props;
  return (
    <Grid container spacing={4}>
      <Grid item xs={4} sm={1}>
        {fields === undefined || fields.terminal ? (
          <TextField
            hide
            fullWidth
            disabled
            margin="dense"
            value={flightTerminal}
            color="primary"
            id="terminal"
            label="Terminal"
            name="terminal"
          />
        ) : ('')}
      </Grid>
      <Grid item xs={8} sm={4}>
        {fields === undefined || fields.ddate ? (
          <TextField
            value={ddate}
            disabled
            fullWidth
            margin="dense"
            id="departure-date-time"
            label="Departure"
            name="departure-date-time"
          />
        ) : ('')}
      </Grid>
      <Grid item xs={6} sm={4}>
        {fields === undefined || fields.dest ? (
          <TextField
            value={dest}
            disabled
            fullWidth
            margin="dense"
            id="departure"
            label="Flying to"
            name="departure"
          />
        ) : ('')}
      </Grid>
      <Grid item xs={6} sm={3}>
        {fields === undefined || fields.status ? (
          <FlightStatus />
        ) : ('')}
      </Grid>
      <Grid item xs={4} sm={2}>
        {fields === undefined || fields.checkinZone ? (
          <TextField
            value={checkinZone}
            disabled
            fullWidth
            margin="dense"
            id="check-in-zone"
            label="Check-in Zone"
            name="check-in-zone"
          />
        ) : ('')}
      </Grid>
      <Grid item xs={8} sm={6}>
        {fields === undefined || fields.checkinCounters ? (
          <TextField
            value={checkinCounters}
            disabled
            fullWidth
            margin="dense"
            id="check-in-counters"
            label="Counters"
            name="check-in-counters"
          />
        ) : ('')}
      </Grid>
      <Grid item xs={12} sm={4}>
        {fields === undefined || fields.flightNumber ? (
          <TextField
            value={flightNumber}
            disabled
            fullWidth
            margin="dense"
            id="flight-number"
            label="Flight Number"
            name="flignt-number"
          />
        ) : ('')}
      </Grid>
    </Grid>
  );
};

// TODO spread visible components across all container

export default connect(mapStateToProps)(FlightData);
