import React from 'react';
import { connect } from 'react-redux';
import {
  actions,
  Control,
  Form,
} from 'react-redux-form';
import {
  withStyles,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  CircularProgress,
  Container,
} from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format, addMinutes } from 'date-fns';
import { withCookies } from 'react-cookie';
import FlightData from '../../../../components/FlightData/FlightData';
import FlightsTable from '../../../../components/Table/FlightsTable';
import {
  setEmail,
  setFirstName,
  setLastName,
  setPhoneNumber,
} from '../../../../actions/user';
import { setDeparture } from '../../../../actions/FlightData';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';

const mapStateToProps = state => ({
  flightDetails: state.register.id,
  flightTerminal: state.register.terminal,
  chosenTerminal: state.forms.firstStep.terminal,
  ddate: state.register.ddate,
  status: state.register.status,
  deldate: state.register.deldate,
  flightDate: state.forms.firstStep.flightDate,
  tableFlightDdate: state.forms.firstStep.tableFlightDdate,
  manualFlightData: state.forms.firstStep.manualFlightData,
  tableHide: state.register.flightsTable.tableHide,
  guestId: state.user.userId,
  firstName: state.forms.completeDetails.firstName,
  lastName: state.forms.completeDetails.lastName,
  phoneNumber: state.forms.completeDetails.phoneNumber,
  email: state.forms.completeDetails.email,
  dialogComplete: state.forms.completeDetails.dialogComplete,
  guestFirstName: state.user.firstName,
  guestLastName: state.user.lastName,
  guestPhoneNumber: state.user.phoneNumber,
  guestEmail: state.user.email,
  lockUpdate: state.user.lockUpdate,
  loadingData: state.user.loadingData,
});

const mapDispatchToProps = dispatch => ({
  setFirstName: e => dispatch(setFirstName(e)),
  setLastName: e => dispatch(setLastName(e)),
  setPhoneNumber: e => dispatch(setPhoneNumber(e)),
  setEmail: e => dispatch(setEmail(e)),
  setDeparture: e => dispatch(setDeparture(e)),
  setManualFlightData: () => dispatch(actions.toggle('forms.firstStep.manualFlightData')),
  toggleDetailsCompletionCookie: () => dispatch(actions.toggle('forms.completeDetails.detailsCompletionCookie')),
  changeDialogComplete: e => dispatch(actions.change('forms.completeDetails.dialogComplete', e)),
  setDetailsCompletionCookie: e => dispatch(actions.change('forms.completeDetails.detailsCompletionCookie', e)),
  dispatch,
});

const useStyles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: 'center',
  },
  progress: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
});

const CompleteDetails = (props) => {
  const classes = useStyles;
  const {
    cookies,
    toggleDetailsCompletionCookie,
  } = props;
  const detailsCompletionCookie = cookies.get('detailsCompletion');

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Form model="forms.completeDetails" className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Control.text
                component={TextField}
                model=".firstName"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Control.text
                component={TextField}
                model=".lastName"
                name="lastName"
                fullWidth
                id="lastName"
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Control.text
                component={TextField}
                model=".phoneNumber"
                name="phoneNumber"
                fullWidth
                id="phoneNumber"
                label="Phone Number"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Control.text
                component={TextField}
                model=".email"
                name="email"
                fullWidth
                id="email"
                label="Email"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Control.checkbox
                component={Checkbox}
                model=".detailsCompletionCookie"
                name="detailsCompletionCookie"
                id="detailsCompletionCookie"
                onChange={(e) => {
                  toggleDetailsCompletionCookie();
                  cookies.set('detailsCompletion', e.target.checked);
                }}
              />
              <FormLabel>
                Don&apos;t ask me again
              </FormLabel>
            </Grid>
          </Grid>
        </Form>
      </div>
    </Container>
  );
};

const ConnectedCompleteDetails = connect(mapStateToProps, mapDispatchToProps)(withCookies(CompleteDetails));

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.correctFlightData = this.correctFlightData.bind(this);
    this.state = {
      isLoading: false,
      flightData: [],
      chosenFlightData: 0,
      showCorrectFlightDataCheck: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.setDirty('forms.firstStep.terminal'));
  }

  componentWillMount() {
    this.getFlightsData();
  }

  componentDidUpdate() {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      detailsCompletionCookie,
      setDetailsCompletionCookie,
      dialogComplete,
      changeDialogComplete,
      guestFirstName,
      guestLastName,
      guestPhoneNumber,
      guestEmail,
      loadingData,
      context,
      cookies,
    } = this.props;
    const detailsCompletionCookieValue = cookies.get('detailsCompletion');
    const detailsCompletionCookieBoolValue = detailsCompletionCookieValue === 'true';
    setDetailsCompletionCookie(detailsCompletionCookieBoolValue);
    if (!loadingData && !context.open && !dialogComplete && !detailsCompletionCookieBoolValue) {
      if (guestFirstName === '' || guestLastName === '' || guestPhoneNumber === null || guestEmail === null) {
        context.changeTitle('Complete Details');
        context.changeContent(<ConnectedCompleteDetails />);
        context.changeActions({
          names: {
            primary: 'Confirm',
            secondary: 'Cancel',
          },
          instances: {
            primary: () => {
              this.handleDetailsCompletion();
              context.changeState(false);
            },
            secondary: () => {
              context.changeState(false);
              changeDialogComplete(true);
            },
          },
        });
        context.changeState(true);
      }
    }
  }

  getFlightsData() {
    const { setManualFlightData } = this.props;
    let records = [];
    this.setState({
      isLoading: true,
    });
    fetch('https://data.gov.il/api/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5')
      .then(res => res.json())
      .then((res) => {
        if (res.result.total) {
          fetch(`https://data.gov.il/api/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${res.result.total}`)
            .then(res => res.json())
            .then((res) => {
              records = Object.values(res.result.records);
              this.setState({
                flightData: records,
                isLoading: false,
              });
            })
            .catch((err) => {
              this.setState(() => ({
                isLoading: false,
                showCorrectFlightDataCheck: false,
              }));
              setManualFlightData();
              console.log(err);
            });
        } else {
          this.setState(() => ({
            isLoading: false,
            correctFlightData: false,
            showCorrectFlightDataCheck: false,
          }));
          throw new Error('No flights to fetch');
        }
      })
      .catch((err) => {
        this.setState(() => ({
          isLoading: false,
          correctFlightData: false,
          showCorrectFlightDataCheck: false,
        }));
        console.log(err);
      });
  }

  handleDetailsCompletion() {
    const {
      guestId,
      firstName,
      lastName,
      phoneNumber,
      email,
    } = this.props;
    const data = {
      data: {
        guest_id: guestId,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
      },
    };
    fetch('http://localhost:3001/api/guests/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((newRow) => {
        setFirstName(newRow.first_name);
        setLastName(newRow.last_name);
        setPhoneNumber(newRow.phone_number);
        setEmail(newRow.email);
      })
      .catch(console.log);
  }

  correctFlightData() {
    const {
      flightTerminal,
      chosenTerminal,
      dispatch,
    } = this.props;
    const { correctFlightData } = this.state;
    let terminal;
    if (chosenTerminal !== flightTerminal) {
      if (correctFlightData) {
        terminal = chosenTerminal;
      } else {
        terminal = flightTerminal;
      }
      dispatch(actions.change('forms.register.terminal', terminal));
    }
    this.setState(prev => ({
      correctFlightData: !prev.correctFlightData,
    }));
  }

  render() {
    const {
      classes,
      setChosenFlightData,
      setTerminal,
      flightDetails,
      tableFlightDdate,
      setDeparture,
      manualFlightData,
      dispatch,
      flightDate,
      tableHide,
    } = this.props;
    const { chosenTerminal } = this.props;
    const {
      isLoading,
      showCorrectFlightDataCheck,
      flightData,
    } = this.state;
    return (
      <div>
        {manualFlightData ? ('')
          : isLoading ? (
            <div className={classes.progressContainer}>
              <CircularProgress className={classes.progress} />
            </div>
          ) : (
            <FlightsTable
              flights={flightData}
              chosenFlightData={setChosenFlightData}
            />
          )}
        <React.Fragment>
          <Form
            model="forms.firstStep"
            className={classes.root}
            autoComplete="off"
          >
            {manualFlightData ? (
              <Grid container spacing={1}>
                <Grid item xs={6} sm={4}>
                  <FormControl
                    className={classes.formControl}
                  >
                    <InputLabel>Terminal</InputLabel>
                    <Control.select
                      model=".terminal"
                      component={Select}
                      name="terminal"
                      id="terminal"
                    >
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                    </Control.select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={8}>
                  <div style={{ marginTop: '16px' }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Control.custom
                        model=".flightDate"
                        component={KeyboardDateTimePicker}
                        onChange={(date) => {
                          dispatch(actions.change('register.flightDate', date));
                          dispatch(actions.change('forms.firstStep.flightDate', date));
                          dispatch(actions.change('forms.firstStep.ddate', format(date, 'dd/MM/yyyy HH:mm')));
                          dispatch(actions.change('forms.secondStep.shuttleDate', date)); // TODO add functionality to show flight time - 3 hours date
                          setDeparture(date);
                        }}
                        controlProps={{
                          clearable: true,
                          margin: 'normal',
                          fullwidth: true,
                          minDate: new Date(),
                          value: flightDate,
                          ampm: false,
                          disablePast: true,
                          strictCompareDates: true,
                          format: 'dd/MM/yy HH:mm',
                          onError: (error) => {
                            dispatch(actions.setErrors('forms.firstStep.flightDate', true));
                            if (error === '') dispatch(actions.setErrors('forms.firstStep.flightDate', false));
                            console.log(error);
                          },
                        }}
                        validators={{
                          required: val => val,
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </Grid>
              </Grid>
            ) : (!flightDetails || tableHide ? ('') : (
              <FlightData />
            ))}
            <Control.checkbox
              model=".manualFlightData"
              component={Checkbox}
              onClick={() => {
                dispatch(actions.change('forms.firstStep.flightDate', tableFlightDdate));
                dispatch(actions.change('forms.firstStep.ddate', format(tableFlightDdate, 'dd/MM/yyyy HH:mm')));
                dispatch(actions.toggle('forms.firstStep.manualFlightData'));
              }}
              label="Enter flight details manually"
            />
          </Form>
        </React.Fragment>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(withCookies(FirstStep)));
