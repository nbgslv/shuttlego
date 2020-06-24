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
  Grid,
  Box,
  Select,
  MenuItem,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  parse,
  addMinutes,
  differenceInMinutes,
  differenceInCalendarDays,
  addDays,
  getDate,
  isWithinInterval,
  startOfDay,
  set,
} from 'date-fns';
import Lodash from 'lodash';
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

const mapStateToProps = state => ({
  wakeupCall: state.forms.fourthStep.wakeupCall,
  bbox: state.forms.fourthStep.bbox,
  bboxNumber: state.forms.fourthStep.bboxNumber,
  wakeupTime: state.forms.fourthStep.wakeupTime,
  wakeupTimeValidation: state.forms.forms.fourthStep.wakeupTime.valid,
  wakeupTimePristine: state.forms.forms.fourthStep.wakeupTime.pristine,
  shuttleDate: state.forms.secondStep.shuttleDate,
  shuttleHour: state.forms.secondStep.shuttleHour,
  shuttleMinute: state.forms.secondStep.shuttleMinute,
  pax: state.user.pax,
});


const useStyles = theme => ({
  paper: {
    textAlign: 'center',
  },
  form: {
    marginTop: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: 'center',
  },
  input: {
    maxWidth: '33.33%',
  },
  icon: {
    width: '48px',
    height: 'auto',
  },
  alignCenter: {
    textAlign: 'center',
  },
});

// TODO add bboxnumber to choose from number of guests entered by admin

class FourthStep extends React.Component {
  constructor(props) {
    super(props);
    this.handleWakeUpChange = this.handleWakeUpChange.bind(this);
    this.handleWakeUpTimeChange = this.handleWakeUpTimeChange.bind(this);
    this.handleBboxChange = this.handleBboxChange.bind(this);
    this.state = {
      wakeUpCall: 0,
      wakeUpTime: addMinutes(new Date(), 15),
      bbox: 0,
      bboxNumber: 0,
    };
    this.data = {
      step: 4,
      wakeUpCall: 0,
      wakeUpTime: 0,
      bbox: 0,
      bboxNumber: 0,
    };
  }

  handleWakeUpChange() {
    let { updateWakeupTime } = this.props;
    updateWakeupTime(addMinutes(new Date(), 15));
  }

  handleWakeUpTimeChange(date) {
    this.data.wakeUpTime = date;
    this.props.handleStepResponse(this.data);
    this.setState({
      wakeUpTime: date,
    });
  }

  handleBboxChange() {
    const { bbox } = this.state;
    this.data.bbox = !bbox;
    this.props.handleStepResponse(this.data);
    this.setState(prev => ({
      bbox: !prev.bbox,
    }));
  }

  selectBBoxNumber() {
    const { pax, bboxNumber, dispatch } = this.props;
    const menuItem = [];
    for (let i = 1; i < pax + 1; i += 1) {
      menuItem.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return (
      <Control.select
        model=".bboxNumber"
        component={Select}
        onChange={e => dispatch(actions.change('forms.fourthStep.bboxNumber', e))}
        value={bboxNumber}
      >
        {menuItem.map(item => item)}
      </Control.select>
    );
  }

  render() {
    const {
      classes,
      dispatch,
      wakeupCall,
      wakeupTime,
      shuttleDate,
      shuttleHour,
      shuttleMinute,
      wakeupTimeValidation,
      wakeupTimePristine,
      bbox,
    } = this.props;
    return (
      <div>
        <Form model="forms.fourthStep">
          <Box textAlign="center">
            <Typography className={classes.instructions}>
              Please choose any special service needed
            </Typography>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={7} md={7}>
              <FormControlLabel
                control={(
                  <Control.checkbox
                    model=".wakeupCall"
                    component={Checkbox}
                    onChange={() => {
                      dispatch(actions.toggle('forms.fourthStep.wakeupCall'));
                      dispatch(actions.change('forms.fourthStep.wakeupTime', addMinutes(new Date(), 16)));
                    }}
                  />
                )}
                label="I would like to have a wake-up call"
              />
            </Grid>
            <Grid item xs={5} md={5} style={{ marginTop: '10.5px' }}>
              {wakeupCall ? (
                <React.Fragment>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Control.custom
                      model=".wakeupTime"
                      component={KeyboardDateTimePicker}
                      onChange={date => dispatch(actions.change('forms.fourthStep.wakeupTime', date))}
                      error={!wakeupTimeValidation && !wakeupTimePristine}
                      controlProps={{
                        format: "dd/MM/yy HH:mm",
                        clearable: true,
                        margin: '0',
                        fullwidth: true,
                        ampm: false,
                        value: wakeupTime,
                      }}
                      validators={{
                        wakeupBefore: (time) => {
                          console.log(time, 'time');
                          const now = new Date();
                          const startInter = addMinutes(now, 15);
                          const endInter = set(shuttleDate, {
                            hours: shuttleHour,
                            minutes: shuttleMinute,
                          });
                          return isWithinInterval(
                            time,
                            {
                              start: startInter,
                              end: endInter,
                            },
                          );
                        },
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <FormHelperText error={!wakeupTimeValidation}>
                    <ErrorMessage
                      modelName="forms.fourthStep.wakeupTime"
                      messages={{
                        wakeupBefore: 'Wakeup call time must be at least 15 minutes ahead and before scheduled shuttle',
                      }}
                    />
                  </FormHelperText>
                </React.Fragment>
              ) : ('')}
            </Grid>
            <Grid item xs={7} md={7}>
              <FormControlLabel
                control={(
                  <Control.checkbox
                    model=".bbox"
                    component={Checkbox}
                  />
                )}
                label="I would like to take a packed breakfast with me"
              />
            </Grid>
            <Grid item xs={5} md={5} style={{ marginTop: '10.5px' }}>
              {bbox ? (
                this.selectBBoxNumber()
              ) : ('')}
            </Grid>
          </Grid>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(FourthStep));
