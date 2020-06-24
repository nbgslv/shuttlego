import React from 'react';
import { connect } from 'react-redux';
import { Container, Select, MenuItem } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
  setDefaultSessionParamsTime,
  setDefaultSessionParamsRestRelat,
  setDefaultSessionParamsRestValue,
} from '../../../actions/admin';

const mapDispatchToProps = dispatch => ({
  setDefaultSessionParamsTime:
    defaultSessionTime => dispatch(setDefaultSessionParamsTime(defaultSessionTime)),
  setDefaultSessionParamsRestRelat:
    defaultSessionRestRelat => dispatch(setDefaultSessionParamsRestRelat(defaultSessionRestRelat)),
  setDefaultSessionParamsRestValue:
    defaultSessionRestValue => dispatch(setDefaultSessionParamsRestValue(defaultSessionRestValue)),
});

const mapStateToProps = state => ({
  defaultSessionTime: state.forms.generalConfig.sessionTimeDefaultType,
});

const manualShuttleFields = [];

const ManualShuttleField = () => {
  const hour = [];
  const minute = [];
  for (let i = 0; i < 24; i += 1) hour.push(i);
  for (let j = 0; j < 60; j += 1) minute.push(j);

  return (
    <>
      <Select
        label="Hour"
        onChange={e => setDefaultSessionParamsTime({
          type: 'hour',
          value: e.target.value,
        })}
      >
        {hour.map(hourTime => (<MenuItem value={hourTime}>{hourTime}</MenuItem>))}
      </Select>
      &nbsp; : &nbsp;
      <Select
        label="Minute"
        onChange={e => setDefaultSessionParamsTime({
          type: 'minute',
          value: e.target.value,
        })}
      >
        {minute.map(hourTime => (<MenuItem value={hourTime}>{hourTime}</MenuItem>))}
      </Select>
    </>
  );
};

export const ShuttleTimesFunc = (props) => {
  const [shuttleFields, addShuttleField] = React.useState([]);
  React.useEffect(() => {
    addShuttleField([...shuttleFields, ManualShuttleField]);
  }, []);
  const {
    type,
  } = props;
  switch (type) {
    case 'steps': {
      const hour = [];
      const minute = [];
      for (let i = 0; i < 24; i += 1) hour.push(i);
      for (let j = 0; j < 60; j += 1) minute.push(j);
      return (
        <Container component="main" maxWidth="xl">
          n = &nbsp;
          <Select
            label="Hour"
            onChange={e => setDefaultSessionParamsTime({
              type: 'hour',
              value: e.target.value,
            })}
          >
            {hour.map(hourTime => (<MenuItem value={hourTime}>{hourTime}</MenuItem>))}
          </Select>
          &nbsp; : &nbsp;
          <Select
            label="Minute"
            onChange={e => setDefaultSessionParamsTime({
              type: 'minute',
              value: e.target.value,
            })}
          >
            {minute.map(hourTime => (<MenuItem value={hourTime}>{hourTime}</MenuItem>))}
          </Select>
        </Container>
      );
    }
    case 'fixed': {
      const times = [];
      for (let i = 1; i < 100; i += 1) times.push(i);
      return (
        <Container component="main" maxWidth="xl">
          n = &nbsp;
          <Select
            label="Times"
            onChange={e => setDefaultSessionParamsTime({
              type: 'hour',
              value: e.target.value,
            })}
          >
            {times.map(time => (<MenuItem value={time}>{time}</MenuItem>))}
          </Select>
        </Container>
      );
    }
    case 'manual': {
      return (
        <Container component="main" maxWidth="xl">
          Add shuttle times manually &nbsp;
          {shuttleFields.map(Field => (
            <>
              <Field />
              <Fab color="primary" aria-label="add" onClick={() => addShuttleField([...shuttleFields, ManualShuttleField])}>
                <AddIcon />
              </Fab>
              <br />
            </>
          ))}
        </Container>
      );
    }
    default:
      return null;
  }
};

export const ShuttleTimes = connect(mapStateToProps, mapDispatchToProps)(ShuttleTimesFunc);
