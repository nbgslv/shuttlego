import React from 'react';
import { connect, useStore } from 'react-redux';
import watch from 'redux-watch';
import {
  Typography,
  withStyles,
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  MobileStepper,
  Snackbar,
  SnackbarContent,
  Button,
  IconButton,
} from '@material-ui/core';
import {
  parse,
  parseISO,
  isAfter,
  isBefore,
} from 'date-fns';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import { actions } from 'react-redux-form';
import FirstStep from './Steps/FirstStep';
import SecondStep from './Steps/SecondStep';
import ThirdStep from './Steps/ThirdStep';
import FourthStep from './Steps/FourthStep';
import FifthStep from './Steps/FifthStep';
import { GuestDialogContext, GuestDialog } from '../../../components/Dialog/Dialog';
import SessionWelcome from '../../../components/SessionWelcome/SessionWelcome';
import { setTerminal } from '../../../actions/FlightData';
import {
  setLoadingData,
  setSessionId,
  setShuttleEdit,
  setUserSession,
} from '../../../actions/user';

const useStyles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: 'center',
  },
  chip: {
    margin: theme.spacing(1),
    width: '100%',
    alignItems: 'left',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  snackMessage: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
    backgroundColor: theme.palette.error.dark,
    marginRight: '4px',
  },
});

const mapStateToProps = state => ({
  terminal: state.forms.firstStep.terminal,
  flightDate: state.forms.firstStep.flightDate,
  manualFlightData: state.forms.firstStep.manualFlightData,
  shuttleHour: state.forms.secondStep.shuttleHour,
  shuttleMinute: state.forms.secondStep.shuttleMinute,
  shuttleDate: state.forms.secondStep.shuttleDate,
  smallBags: state.forms.thirdStep.smallBags,
  mediumBags: state.forms.thirdStep.mediumBags,
  largeBags: state.forms.thirdStep.largeBags,
  specialBags: state.forms.thirdStep.specialBag,
  specialBagsDesc: state.forms.thirdStep.specialBagDesc,
  wakeupCall: state.forms.fourthStep.wakeupCall,
  wakeupTime: state.forms.fourthStep.wakeupTime,
  bbox: state.forms.fourthStep.bbox,
  bboxNumber: state.forms.fourthStep.bboxNumber,
  ddate: state.register.ddate,
  selectedRowId: state.register.flightsTable.selectedRowId,
  firstStepValidation: state.forms.forms.firstStep.$form.valid,
  secondStepValidation: state.forms.forms.secondStep.$form.valid,
  thirdStepValidation: state.forms.forms.thirdStep.$form.valid,
  fourthStepValidation: state.forms.forms.fourthStep.$form.valid,
  user: state.user,
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  phoneNumber: state.user.phoneNumber,
  email: state.user.email,
  guestId: state.user.userId,
  editShuttle: state.user.editShuttle,
  loadingData: state.user.loadingData,
  status: state.user.status,
  state,
});

const mapDispatchToProps = dispatch => ({
  setTerminal: e => dispatch(setTerminal(e)),
  setLoadingData: e => dispatch(setLoadingData(e)),
  setSessionId: e => dispatch(setSessionId(e)),
  setUserSession: e => dispatch(setUserSession(e)),
  dispatch,
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseSnackbar = this.onCloseSnackbar.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.state = {
      step: 0,
      snackbarOpen: false,
      message: '',
    };
  }

  setSessionData(session) {
    const { dispatch, setSessionId, setTerminal } = this.props;
    setSessionId(session.sessionId);
    setTerminal(session.terminal);
    dispatch(actions.load('forms.firstStep', {
      terminal: session.terminal,
    }));
    dispatch(actions.load('forms.secondStep', {
      shuttleDate: parse(session.shuttleDate, 'yyyy-MM-dd', new Date()),
      shuttleHour: session.shuttleTimeHour,
      shuttleMinute: session.shuttleTimeMinute,
    }));
    dispatch(actions.load('forms.thirdStep', {
      largeBags: session.largeBags.toString(),
      mediumBags: session.mediumBags.toString(),
      smallBags: session.smallBags.toString(),
      specialBags: session.specialBag,
      specialBagsDesc: session.specialBagDesc,
    }));
    dispatch(actions.load('forms.fourthStep', {
      wakeupCall: session.wakeupCall,
      wakeupTime: parse(`${session.wakeupTimeDate} ${session.wakeupTimeHour}:${session.wakeupTimeMinute}`, 'yyyy-MM-dd H:m', new Date()),
      bbox: session.bbox,
      bboxNumber: session.bboxNumber,
    }));
    setLoadingData(true);
  }

  componentDidUpdate(prevProps) {
    const {
      editShuttle,
      location,
      guestId,
      loadingData,
      setTerminal,
      setLoadingData,
      dispatch,
      state,
    } = this.props;
    if (location.pathname === '/users/shuttle/edit') {
      dispatch(setShuttleEdit(true));
    }
    if (editShuttle && !loadingData) {
      fetch('http://localhost:3001/api/sessions/guest', {
        method: 'POST',
        body: JSON.stringify({ guestId }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((res) => {
          this.setSessionData(res[0]);
        })
        .catch(err => console.log(err, 'err'));
    }
  }

  onCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      snackbarOpen: false,
    });
  }

  getStepContent(step) {
    const { flightDate } = this.state;
    const { editShuttle } = this.props;
    switch (step) {
      case 0: {
        if (editShuttle) return this.handleNext();
        return (
          <GuestDialogContext.Consumer>
            {context => (
              <FirstStep
                context={context}
              />
            )}
          </GuestDialogContext.Consumer>
        );
      }
      case 1: {
        return (
          <SecondStep
            flightDate={flightDate}
          />
        );
      }
      case 2: {
        return (
          <ThirdStep />
        );
      }
      case 3: {
        return (
          <FourthStep />
        );
      }
      case 4: {
        return (
          <FifthStep />
        );
      }
      case 5: {
        this.handleAdd();
        break;
      }
      default:
        return 'Unknown step';
    }
  }

  snackBarError(valid) {
    if (!valid) {
      this.setState({
        snackbarOpen: true,
        message: 'Please correct the errors',
      });
    }
    return valid;
  }

  checkValidation(step) {
    const {
      firstStepValidation,
      terminal,
      flightDate,
      ddate,
      manualFlightData,
      selectedRowId,
      secondStepValidation,
      thirdStepValidation,
      fourthStepValidation,
      dispatch,
    } = this.props;
    switch (step) {
      case 0:
        if (manualFlightData) {
          return (flightDate && terminal && !isBefore(flightDate, new Date()));
        } if (!selectedRowId) {
          this.setState({
            snackbarOpen: true,
            message: 'Please select a flight',
          });
        }
        return (selectedRowId && !isBefore(parse(ddate, 'dd/MM/yyyy HH:mm', new Date()), new Date()));
      case 1:
        return this.snackBarError(secondStepValidation);
      case 2:
        if (!thirdStepValidation) {
          dispatch(actions.setDirty('forms.thirdStep'));
        }
        return this.snackBarError(thirdStepValidation);
      case 3:
        return this.snackBarError(fourthStepValidation);
      default:
        return true;
    }
  }

  dateToString(date) {
    if (typeof date !== 'object') {
      date = parseISO(date, 'yyyy-MM-dd', new Date());
    }
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}-${month + 1}-${day}`;
  }

  dateToTimeString(date) {
    if (typeof date !== 'object') {
      date = parseISO(date);
    }
    const dateStr = date.toString();
    const i = dateStr.indexOf(':');
    const hour = dateStr.substring(i, i - 2);
    const minute = dateStr.substring(i + 1, i + 3);
    return {
      hour,
      minute,
    };
  }

  handleAdd() {
    const {
      terminal,
      shuttleHour,
      shuttleMinute,
      shuttleDate,
      smallBags,
      mediumBags,
      largeBags,
      specialBags,
      specialBagsDesc,
      wakeupCall,
      wakeupTime,
      bbox,
      bboxNumber,
      guestId,
    } = this.props;
    const data = {
      terminal,
      shuttleHour,
      shuttleMinute,
      shuttleDate,
      smallBags,
      mediumBags,
      largeBags,
      specialBags,
      specialBagsDesc,
      wakeupCall,
      bbox,
      bboxNumber,
      guestId,
    };
    console.log(data, 'before submition');
    data.shuttleDate = this.dateToString(data.shuttleDate);
    data.wakeupHour = null;
    data.wakeupMinute = null;
    data.wakeupDate = null;
    if (wakeupTime !== undefined) {
      const {
        hour,
        minute,
      } = this.dateToTimeString(wakeupTime);
      data.wakeupHour = hour;
      data.wakeupMinute = minute;
      data.wakeupDate = this.dateToString(wakeupTime);
    }
    fetch('http://localhost:3001/api/sessions/guest', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch(err => console.log(err, 'err'));
  }

  handleNext() {
    const { editShuttle } = this.props;
    const { step } = this.state;
    if (step === 0 && editShuttle) {
      this.setState({
        step: step + 1,
      });
    } else if (this.checkValidation(step)) {
      this.setState({
        step: step + 1,
      });
    }
  }

  handleBack() {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  }

  render() {
    const {
      classes,
      smallBags,
      mediumBags,
      largeBags,
      user,
      status,
      editShuttle,
      location,
    } = this.props;
    const steps = [
      'Select flight details',
      'Select departure time',
      'Set carry ons number',
      'Choose extra services',
      'Confirm reservation details',
    ];
    const {
      step,
      snackbarOpen,
      message,
    } = this.state;
    console.log(editShuttle);
    return (
      <div className={classes.root}>
        {status !== 'pending' && !(location.pathname === '/users/shuttle/edit') ? ('Unable to register') : (
          <GuestDialogContext.Consumer>
            {context => (
              <Container maxWidth="md">
                <SessionWelcome guest={user} />
                <div className={classes.paper}>
                  <Typography component="h1" variant="h5">
                    Register To Your Shuttle
                  </Typography>
                  <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.onCloseSnackbar}
                  >
                    <SnackbarContent
                      className={classes.error}
                      aria-describedby="client-snackbar"
                      message={(
                        <span id="client-snackbar" className={classes.snackMessage}>
                          <ErrorIcon className={classes.icon} />
                          {message}
                        </span>
                      )}
                      action={[
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.onCloseSnackbar}>
                          <CloseIcon className={classes.icon} />
                        </IconButton>,
                      ]}
                    />
                  </Snackbar>
                  <div
                    style={{
                      marginBottom: '24px',
                      width: '100%',
                    }}
                  >
                    {this.getStepContent(step)}
                  </div>
                  <Box display={{
                    xs: 'none',
                    sm: 'none',
                    md: 'block',
                  }}
                  >
                    <Stepper activeStep={step}>
                      {steps.map((label) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                          <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Box>
                  <Box display={{
                    xs: 'block',
                    sm: 'block',
                    md: 'none',
                  }}
                  >
                    <MobileStepper
                      activeStep={step}
                      variant="dots"
                      steps={steps.length}
                    >
                      {steps.map((label) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                          <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </MobileStepper>
                  </Box>
                  <div>
                    {step === steps.length ? (
                      <div>
                        <Typography className={classes.instructions}>
                          All steps completed - you&apos;re finished
                        </Typography>
                      </div>
                    ) : (
                      <div>
                        <Button
                          disabled={step === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            if (step === 2) {
                              if (smallBags === '' && mediumBags === '' && largeBags === '') {
                                context.changeTitle('Going Hands Free?');
                                context.changeContent('Are you sure you have no luggage to take with you?\nIt is important for us to know the exact number of luggage you have to get for you the right luggage size');
                                context.changeActions({
                                  names: {
                                    primary: 'I\'m sure',
                                    secondary: 'Let me correct that',
                                  },
                                  instances: {
                                    primary: () => {
                                      context.toggleState();
                                      this.handleNext();
                                    },
                                    secondary: () => context.toggleState(),
                                  },
                                });
                                context.toggleState();
                              } else {
                                this.handleNext();
                              }
                            } else {
                              this.handleNext();
                            }
                          }}
                          className={classes.button}
                        >
                          {this.state.step === steps.length - 1 ? 'Confirm' : 'Next'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <GuestDialog
                  KeepMounted
                />
              </Container>
            )}
          </GuestDialogContext.Consumer>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Register));
