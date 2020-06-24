import React from 'react';
import { connect } from 'react-redux';
import {
  actions,
  Form,
  Control,
  Errors,
} from 'react-redux-form';
import {
  withStyles,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Select,
  MenuItem,
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  differenceInHours,
  differenceInMinutes,
  subHours,
  startOfHour,
  parse,
  parseISO,
  format,
  set,
} from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import FlightData from '../../../../components/FlightData/FlightData';
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  shuttleDate: state.forms.secondStep.shuttleDate,
  shuttleHour: state.forms.secondStep.shuttleHour,
  shuttleMinute: state.forms.secondStep.shuttleMinute,
  editShuttle: state.user.editShuttle,
  flightDepartue: state.register.ddate,
  flightDate: state.forms.firstStep.flightDate,
  shuttleHourError: state.forms.forms.secondStep.shuttleHour.valid,
  shuttleMinuteError: state.forms.forms.secondStep.shuttleMinute.valid,
});

class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shuttleHour: '',
      shuttleDate: 0,
    };
    this.data = {
      step: 2,
      shuttleHour: '',
      shuttleDate: 0,
    };
  }

  componentDidMount() {
    const { editShuttle } = this.props;
    if (!editShuttle) this.setRecommendedShuttleHour();
  }

  setRecommendedShuttleHour() {
    const { flightDate, dispatch } = this.props;
    const setShuttleHour = format(startOfHour(subHours(flightDate, 3)), 'H');
    dispatch(actions.change('forms.secondStep.shuttleHour', setShuttleHour));
    const setShuttleMinute = format(startOfHour(subHours(flightDate, 3)), 'm');
    dispatch(actions.change('forms.secondStep.shuttleMinute', setShuttleMinute));
  }

  validateShuttleHour(hour, minute, date) {
    const {
      editShuttle,
      shuttleHour,
      shuttleMinute,
    } = this.props;
    const now = new Date();
    let shuttleTime;
    if (date !== null) {
      shuttleTime = parse(`${format(date, 'dd/MM/yy')} ${hour || shuttleHour || 0}:${minute || shuttleMinute || 0}`, 'dd/MM/yy H:m', new Date());
    }
    console.log(differenceInMinutes(startOfHour(now), shuttleTime || now));
    if (!editShuttle) return differenceInMinutes(startOfHour(now), shuttleTime || now) < -60;
    return true;
  }

  validateShuttleBefore(hour, minute) {
    const {
      shuttleDate,
      shuttleHour,
      shuttleMinute,
      flightDate,
      editShuttle,
    } = this.props;
    const shuttleDateTime = set(
      shuttleDate, { hours: hour || shuttleHour || 0, minutes: minute || shuttleMinute || 0 },
    );
    console.log(differenceInMinutes(flightDate, shuttleDateTime));
    if (!editShuttle) return differenceInMinutes(flightDate, shuttleDateTime) >= 120;
    return true;
  }

  render() {
    const {
      classes,
      shuttleDate,
      shuttleHour,
      shuttleMinute,
      editShuttle,
      shuttleHourError,
      shuttleMinuteError,
      dispatch,
    } = this.props;
    const optionsHours = [];
    for (let i = 0; i < 24; i += 1) {
      optionsHours.push({
        label: i.toString().length < 2 ? `0${i}` : `${i}`,
        value: `${i}`,
      });
    }
    const optionsMinutes = [];
    for (let i = 0; i < 60; i += 1) {
      optionsMinutes.push({
        label: i.toString().length < 2 ? `0${i}` : `${i}`,
        value: `${i}`,
      });
    }
    let fields = {
      ddate: true,
    };
    if (editShuttle) {
      fields = {
        terminal: true,
      };
    }

    return (
      <div>
        <Form model="forms.secondStep">
          <Box>
            <FlightData fields={fields} />
          </Box>
          <Box textAlign="center">
            <Typography className={classes.instructions}>
            Choose your shuttle time
              <br />
            for the date&nbsp;
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Control.custom
                  model=".shuttleDate"
                  component={KeyboardDatePicker}
                  onChange={(date) => {
                    dispatch(actions.change('forms.secondStep.shuttleDate', date));
                    this.setRecommendedShuttleHour();
                    dispatch(actions.setValidity('forms.register.shuttleHour', {
                      hourBefore: this.validateShuttleHour(shuttleHour, shuttleMinute, date),
                    }));
                  }}
                  controlProps={{
                    margin: '0',
                    fullwidth: true,
                    value: shuttleDate,
                    minDate: new Date(),
                    format: 'dd/MM/yyyy',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Typography>
          </Box>
          <Control.custom
            required
            model=".shuttleHour"
            component={Select}
            error={!shuttleHourError}
            onChange={(hour) => {
              dispatch(actions.change('forms.secondStep.shuttleHour', hour));
            }}
            validators={{
              hourBefore: hour => this.validateShuttleHour(
                hour,
                null,
                shuttleDate,
              ),
              beforeFlight: hour => this.validateShuttleBefore(hour, null),
            }}
            controlProps={{
              name: 'shuttle-time',
              placeholder: 'Shuttle time...',
              fullwidth: true,
              value: shuttleHour,
            }}
          >
            {
              optionsHours.map(option => (<MenuItem value={option.value}>{option.label}</MenuItem>))
            }
          </Control.custom>
          :
          <Control.custom
            required
            model=".shuttleMinute"
            component={Select}
            onChange={(minute) => {
              dispatch(actions.change('forms.secondStep.shuttleMinute', minute));
            }}
            controlProps={{
              fullwidth: true,
              value: shuttleMinute,
            }}
            validators={{
              hourBefore: minute => this.validateShuttleHour(
                null,
                minute,
                shuttleDate,
              ),
              beforeFlight: minute => this.validateShuttleBefore(null, minute),
            }}
          >
            {
              optionsMinutes.map(option => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
              ))
            }
          </Control.custom>
          <FormHelperText error={!shuttleHourError || !shuttleMinuteError}>
            <ErrorMessage
              modelName="forms.secondStep.shuttleHour"
              messages={{
                hourBefore: 'Shuttle time must be at least 1 hour from now',
                beforeFlight: 'Shuttle time must be at least 2 hours before flight time',
              }}
            />
            <ErrorMessage
              modelName="forms.secondStep.shuttleMinute"
              messages={{
                hourBefore: 'Shuttle time must be at least 1 hour from now',
                beforeFlight: 'Shuttle time must be at least 2 hours before flight time',
              }}
            />
          </FormHelperText>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(SecondStep));
