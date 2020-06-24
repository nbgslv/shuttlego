import React from 'react';
import { connect } from 'react-redux';
import { Chip } from '@material-ui/core';
import { EventAvailable, EventBusy, Warning } from '@material-ui/icons';

const classes = theme => ({
  chip: {
    margin: theme.spacing(1),
    width: '100%',
    alignItems: 'left',
  },
});

const mapStateToProps = state => ({
  status: state.register.status,
  deldate: state.register.deldate,
});

const FlightStatus = (props) => {
  const { status, deldate } = props;
  switch (status) {
    case 'ON TIME':
      return (
        <Chip
          icon={<EventAvailable color="primary" />}
          label="On Time"
          color="primary"
          variant="outlined"
          className={classes.chip}
        />
      );
    case 'DELAYED':
      return (
        <Chip
          icon={<EventBusy color="secondary" />}
          label={`Delayed to ${deldate}`}
          color="secondary"
          variant="outlined"
          className={classes.chip}
        />
      );
    case 'CANCELED':
      return (
        <Chip
          icon={<Warning color="error" />}
          label="Canceled"
          color="error"
          variant="outlined"
          className={classes.chip}
        />
      );
    default:
      return (
        <Chip
          label="Unknown"
          variant="outlined"
          className={classes.chip}
        />
      );
  }
};

export default connect(mapStateToProps)(FlightStatus);
