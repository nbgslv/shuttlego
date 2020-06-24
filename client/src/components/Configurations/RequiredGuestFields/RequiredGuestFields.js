import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
} from '@material-ui/core';
import Select from 'react-select';
import {
  setGuestRequiredFields,
} from '../../../actions/admin';
import { requiredGuestFields as requiredFields } from '../../../constants/guestFields';

const mapDispatchToProps = dispatch => ({
  setGuestRequiredFields:
      guestRequiredFields => dispatch(setGuestRequiredFields(guestRequiredFields)),
});

const mapStateToProps = state => ({
});

export const requiredGuestFields = (props) => {
  const {
    setGuestRequiredFields,
  } = props;
  return (
    <Container component="main" maxWidth="xl">
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={requiredFields}
        onChange={e => setGuestRequiredFields(e)}
      />
    </Container>
  );
};

export const RequiredGuestFields = connect(mapStateToProps, mapDispatchToProps)(requiredGuestFields);
