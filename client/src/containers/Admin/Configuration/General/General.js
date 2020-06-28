import React from 'react';
import { connect } from 'react-redux';
import { Container, Typography, Divider } from '@material-ui/core';
import { Control, Form } from 'react-redux-form';
import { DefaultSessionTime } from '../../../../components/Configurations/DefaultSessionTime/DefaultSessionTime';
import { GuestReset } from '../../../../components/Configurations/GuestReset/GuestReset';
import { GuestEditSession } from '../../../../components/Configurations/GuestEditSession/GuestEditSession';
import { RequiredGuestFields } from '../../../../components/Configurations/RequiredGuestFields/RequiredGuestFields';
import { ShuttleTimes } from '../../../../components/Configurations/ShuttleTimes/ShuttleTimes';
import {AlertMessages} from "../../../../components/Configurations/AlertMessages/AlertMessages";
import Permissions from "../../../../components/Configurations/Permissions/Permissions";

const mapStateToProps = state => ({
  sessionTimeDefaultType: state.forms.generalConfig.sessionTimeDefaultType,
  guestReset: state.forms.generalConfig.guestReset,
  shuttleTimes: state.forms.generalConfig.shuttleTimesType,
});

const general = (props) => {
  const { sessionTimeDefaultType, guestReset, shuttleTimes } = props;
  return (
    <Container component="main" maxWidth="xl">
      <Form model="forms.generalConfig">
        <Typography variant="subtitle1">
            Default Session Time
        </Typography>
        <Control.select
          model=".sessionTimeDefaultType"
          value={sessionTimeDefaultType}
        >
          <option value="fixed">Fixed Time</option>
          <option value="duration">Time Duration</option>
        </Control.select>
        <DefaultSessionTime type={sessionTimeDefaultType} />
        <Divider />
        <Typography variant="subtitle1">
          Who Can Reset Guest Verification Code?
        </Typography>
        <Control.select
          model=".guestReset"
          value={guestReset}
        >
          <option value="admin">Admin</option>
          <option value="guest">Guest</option>
        </Control.select>
        <GuestReset type={guestReset} />
        <Divider />
        <GuestEditSession />
        <Divider />
        <RequiredGuestFields />
        <Divider />
        <Control.select
          model=".shuttleTimesType"
          value={guestReset}
        >
          <option value="steps">Every n time</option>
          <option value="fixed">n shuttles a day</option>
          <option value="manual">Set manually</option>
        </Control.select>
        <ShuttleTimes type={shuttleTimes} />
        <AlertMessages />
        <Permissions />
      </Form>
    </Container>
  );
};

export const General = connect(mapStateToProps)(general);
