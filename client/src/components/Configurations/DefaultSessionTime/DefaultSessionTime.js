import React from 'react';
import { connect } from 'react-redux';
import { Container, Select, MenuItem } from '@material-ui/core';
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

export const defaultSessionTime = (props) => {
  const {
    type,
    defaultSessionTime,
    setDefaultSessionParamsTime,
    setDefaultSessionParamsRestRelat,
    setDefaultSessionParamsRestValue,
  } = props;
  switch (type) {
    case 'fixed': {
      const hour = [];
      const minute = [];
      for (let i = 0; i < 24; i += 1) hour.push(i);
      for (let j = 0; j < 60; j += 1) minute.push(j);
      return (
        <Container component="main" maxWidth="xl">
          Session expires at: &nbsp;
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
          &nbsp;
          <Select
            value="before"
            onChange={e => setDefaultSessionParamsRestRelat({
              relativity: e.target.value,
            })}
          >
            <MenuItem value="before">Before</MenuItem>
            <MenuItem value="after">After</MenuItem>
          </Select>
          <Select
            value="checkin"
            onChange={e => setDefaultSessionParamsRestValue({
              value: e.target.value,
            })}
          >
            <MenuItem value="checkin">Check-in day</MenuItem>
            <MenuItem value="checkout">Checkout day</MenuItem>
            <MenuItem value="creation">Guest creation time</MenuItem>
            <MenuItem value="creation">Session creation time</MenuItem>
          </Select>
        </Container>
      );
    }
    case 'duration': {
      const hour = [];
      const minute = [];
      for (let i = 0; i < 24; i += 1) hour.push(i);
      for (let j = 0; j < 60; j += 1) minute.push(j);
      return (
        <Container component="main" maxWidth="xl">
          Session expires &nbsp;
          <Select
            label="Hours"
            onChange={e => setDefaultSessionParamsTime({
              type: 'hour',
              value: e.target.value,
            })}
          >
            {hour.map(hourTime => (<MenuItem value={hourTime}>{hourTime}</MenuItem>))}
          </Select>
          &nbsp; : &nbsp;
          <Select
            label="Minutes"
            onChange={e => setDefaultSessionParamsTime({
              type: 'minute',
              value: e.target.value,
            })}
          >
            {minute.map(hourTime => (<MenuItem value={hourTime}>{hourTime}</MenuItem>))}
          </Select>
          &nbsp;
          <Select
            value="before"
            onChange={e => setDefaultSessionParamsRestRelat({
              relativity: e.target.value,
            })}
          >
            <MenuItem value="before">Before</MenuItem>
            <MenuItem value="after">After</MenuItem>
          </Select>
          <Select
            value="checkin"
            onChange={e => setDefaultSessionParamsRestValue({
              value: e.target.value,
            })}
          >
            <MenuItem value="checkin">Check-in day</MenuItem>
            <MenuItem value="checkout">Checkout day</MenuItem>
            <MenuItem value="creation_guest">Guest creation time</MenuItem>
            <MenuItem value="creation_session">Session creation time</MenuItem>
          </Select>
        </Container>
      );
    }
    default:
      return null;
  }
};

export const DefaultSessionTime = connect(mapStateToProps, mapDispatchToProps)(defaultSessionTime);
