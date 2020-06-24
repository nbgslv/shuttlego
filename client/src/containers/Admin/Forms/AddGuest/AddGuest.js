import React from 'react';
import { connect } from 'react-redux';
import {actions, Control, Form} from 'react-redux-form';
import {
  Container,
  Grid,
  makeStyles,
  withStyles,
  TextField,
  Button,
} from '@material-ui/core';
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';
import { parse } from 'date-fns';
import { format } from 'date-fns-tz';
import { green } from '@material-ui/core/colors';
import DateFnsUtils from '@date-io/date-fns';
import PhoneNumberInput from '../../../../components/PhoneNumberInput/PhoneNumberInput';
import * as apiUtil from '../../../../util/guest';

const useStyle = theme => ({
  paper: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    fontSize: 20,
  },
  icon: {
    fontSize: 20,
  },
  success: {
    backgroundColor: green[600],
    margin: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  checkinDate: state.forms.addGuest.checkinDate,
  checkoutDate: state.forms.addGuest.checkoutDate,
  sessionTime: state.forms.addGuest.sessionTime,
  form: state.forms.addGuest,
});

class AddGuest extends React.Component {
  constructor(props) {
    super(props);
  }

  async handleSubmit(data) {
    try {
      await apiUtil.addGuest(data, (res) => {console.log(res)})
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {
      checkinDate,
      checkoutDate,
      sessionTime,
      form,
      classes,
      dispatch,
    } = this.props;
    return (
      <Container component="main" maxWidth="xl">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.paper}>
            <Form model="forms.addGuest" className={classes.form} noValidate onSubmit={val => this.handleSubmit(val)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Control
                    model=".roomNumber"
                    component={TextField}
                    name="roomNumber"
                    variant="outlined"
                    required
                    fullWidth
                    id="roomNumber"
                    label="Room Number"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Control
                    model=".firstName"
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                  />
                </Grid>
                <Grid item xs={5} sm={5}>
                  <Control
                    model=".lastName"
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <Control
                    model=".pax"
                    component={TextField}
                    name="pax"
                    variant="outlined"
                    required
                    fullWidth
                    id="pax"
                    label="Pax"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Control.custom
                    model=".checkinDate"
                    component={KeyboardDatePicker}
                    onChange={(date) => {
                      return dispatch(actions.change('forms.addGuest.checkinDate', date));
                    }}
                    controlProps={{
                      margin: '0',
                      fullwidth: true,
                      value: checkinDate,
                      minDate: new Date(),
                      format: 'dd/MM/yyyy',
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Control.custom
                    model=".checkoutDate"
                    component={KeyboardDatePicker}
                    onChange={(date) => {
                      dispatch(actions.change('forms.addGuest.checkoutDate', date));
                    }}
                    controlProps={{
                      margin: '0',
                      fullwidth: true,
                      value: checkoutDate,
                      minDate: new Date(),
                      format: 'dd/MM/yyyy',
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Control.custom
                    model=".sessionTime"
                    component={TimePicker}
                    onChange={(date) => {
                      dispatch(actions.change('forms.addGuest.sessionTime', date));
                    }}
                    controlProps={{
                      margin: '0',
                      fullwidth: true,
                      value: sessionTime,
                      minDate: new Date(),
                      format: 'HH:mm',
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <PhoneNumberInput
                    onChange={(e) => {
                      this.setState({
                        phoneNumber: e,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Control
                    model=".email"
                    component={TextField}
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoFocus
                    onChange={(e) => {
                      this.setState({
                        email: e,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </div>
        </MuiPickersUtilsProvider>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(withStyles(useStyle)(AddGuest));
