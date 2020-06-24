import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import Select from 'react-select';
import {
  setGuestEditSession
} from '../../../actions/admin';

const mapDispatchToProps = dispatch => ({
  setGuestEditSession: guestEditSession => dispatch(setGuestEditSession(guestEditSession)),
});

const mapStateToProps = state => ({
});

export const guestEditSession = (props) => {
  const { setGuestEditSession } = props;
  return (
    <Container component="main" maxWidth="xl">
      <FormControlLabel
        control={(
          <Checkbox
            value="guestEditSession"
            onChange={e => setGuestEditSession(e.currentTarget.checked)}
          />
        )}
        label="Allow guests to edit their shuttles"
      />
    </Container>
  );
};

export const GuestEditSession = connect(mapStateToProps, mapDispatchToProps)(guestEditSession);
