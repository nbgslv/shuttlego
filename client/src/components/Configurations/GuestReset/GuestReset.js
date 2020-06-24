import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import Select from 'react-select';
import {
  setGuestReset,
  setGuestResetParams,
} from '../../../actions/admin';
import { requiredGuestFields } from '../../../constants/guestFields';

const mapDispatchToProps = dispatch => ({
  setGuestReset: guestReset => dispatch(setGuestReset(guestReset)),
  setGuestResetParams: guestResetParams => dispatch(setGuestResetParams(guestResetParams)),
});

const mapStateToProps = state => ({
});

export const guestReset = (props) => {
  const {
    type,
    setGuestReset,
    setGuestResetParams,
  } = props;
  switch (type) {
    case 'admin': {
      return (
        <Container component="main" maxWidth="xl">
          <FormControlLabel
            control={(
              <Checkbox
                value="guestResetPermission"
                onChange={e => setGuestResetParams({
                  permission: e.currentTarget.checked,
                })}
              />
            )}
            label="Needs Special Permission"
          />
        </Container>
      );
    }
    case 'guest': {
      return (
        <Container component="main" maxWidth="xl">
          <Select
            isMulti
            closeMenuOnSelect={false}
            options={requiredGuestFields}
            onChange={e => setGuestResetParams({
              requiredFields: e,
            })}
          />
        </Container>
      );
    }
    default:
      return null;
  }
};

export const GuestReset = connect(mapStateToProps, mapDispatchToProps)(guestReset);

// TODO check if required fields for reset are set as required fields!
