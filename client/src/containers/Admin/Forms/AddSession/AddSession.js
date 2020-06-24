import React from 'react';
import { connect } from 'react-redux';
import {
  DatePicker, DateTimePicker, MuiPickersUtilsProvider, TimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { actions, Control, Form } from 'react-redux-form';
import {
  Button, Checkbox,
  Container, FormControlLabel,
  Grid, Paper, Select,
  TextField, withStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { parse } from 'date-fns';
import Lodash from 'lodash';
import PhoneNumberInput from '../../../../components/PhoneNumberInput/PhoneNumberInput';
import SelectSearch from '../../../../components/SelectSearch/SelectSearch';
import * as apiUtil from '../../../../util/guest';
import { updateSession } from '../../../../util/sessions';
import * as dateUtil from '../../../../util/dates';
import { roomNumbers } from '../../../../constants/roomNumbers';

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

const GuestDetails = ({ guest }) => (
  <Paper elevation="2">
    <Grid container spacing={2}>
      <Grid item xs={2} sm={2}>
          Guest ID:
        {' '}
        {guest.guestId}
      </Grid>
      <Grid item xs={4} sm={4}>
          First Name:
        {' '}
        {guest.firstName}
      </Grid>
      <Grid item xs={4} sm={4}>
          Last Name:
        {' '}
        {guest.lastName}
      </Grid>
      <Grid item xs={2} sm={2}>
          Pax:
        {' '}
        {guest.pax}
      </Grid>
      <Grid item xs={6} sm={6}>
          Checkin Date:
        {' '}
        {guest.checkinDate}
      </Grid>
      <Grid item xs={6} sm={6}>
          Checkout Date:
        {' '}
        {guest.checkoutDate}
      </Grid>
    </Grid>
  </Paper>
);

const mapStateToProps = state => ({
  specialBag: state.forms.addSession.specialBag,
  wakeupCall: state.forms.addSession.wakeupCall,
  bbox: state.forms.addSession.bbox,
  pax: state.forms.addSession.pax,
});

class AddSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: [],
      filteredGuests: [],
      firstNames: [],
      lastNames: [],
      guestFilter: [],
      showGuestDetails: false,
      guestDetails: {},
      checkinDate: null,
      checkoutDate: null,
      roomNumber: null,
      firstName: null,
      lastName: null,
    };
  }

  componentDidMount() {
    this.getGuests();
  }

  async getGuests() {
    try {
      await apiUtil.getGuests((guests) => {
        this.setGuests(guests);
      });
    } catch (e) {
      console.log(e);
    }
  }

  setGuests(guests) {
    this.setState({
      guests,
    }, () => this.mapNames(guests));
  }

  setFilteredGuests(filteredGuests) {
    this.setState({
      filteredGuests,
    }, () => this.mapNames(filteredGuests));
  }

  setGuestDetails(filteredGuests) {
    const { dispatch } = this.props;
    const guest = filteredGuests[0];
    dispatch(actions.change('forms.addSession', guest));
    this.setState({
      showGuestDetails: true,
      guestDetails: guest,
      checkinDate: parse(guest.checkinDate, 'yyyy-mm-dd', new Date()),
      checkoutDate: guest.checkoutDate !== null ? parse(guest.checkoutDate, 'yyyy-mm-dd', new Date()) : null,
      roomNumber: { label: guest.roomNumber, value: guest.roomNumber },
      firstName: { label: guest.firstName, value: guest.guestId },
      lastName: { label: guest.lastName, value: guest.guestId },
    });
  }

  filterGuests() {
    const { guestFilter, guests } = this.state;
    let filteredGuests = guests;
    guestFilter.forEach((filter) => {
      filteredGuests = filteredGuests.filter(guest => guest[filter.name] === filter.value);
    });
    if (filteredGuests.length === 1) this.setGuestDetails(filteredGuests);
    else this.setState({ showGuestDetails: false });
    this.setFilteredGuests(filteredGuests);
  }

  addGuestFilter(newFilter) {
    const { guestFilter } = this.state;
    let changedFilter = false;
    if (newFilter.value === '' || newFilter.value === null) {
      guestFilter.forEach((filter, i) => {
        if (filter.name === newFilter.name) {
          guestFilter.splice(i, 1);
          changedFilter = true;
        }
      });
    } else {
      guestFilter.forEach((filter) => {
        if (filter.name === newFilter.name) {
          filter.value = newFilter.value;
          changedFilter = true;
        }
      });
    }
    if (!changedFilter) guestFilter.push(newFilter);
    this.setState({
      guestFilter,
    }, () => this.filterGuests());
  }

  mapNames(guests) {
    const firstNames = [];
    const lastNames = [];
    guests.map((guest) => {
      if (guest.firstName !== null) {
        firstNames.push({ label: guest.firstName, value: guest.guestId });
      }
      if (guest.lastName !== null) {
        lastNames.push({ label: guest.lastName, value: guest.guestId });
      }
    });
    this.setState({
      firstNames,
      lastNames,
    });
  }

  async handleSubmit(data) {
    try {
      await updateSession(data, (res) => {console.log(res)})
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {
      classes,
      dispatch,
      specialBag,
      wakeupCall,
      bbox,
      pax,
    } = this.props;
    const {
      firstNames,
      lastNames,
      showGuestDetails,
      guestDetails,
      checkinDate,
      checkoutDate,
      roomNumber,
      firstName,
      lastName,
    } = this.state;
    return (
      <Container component="main" maxWidth="xl">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.paper}>
            <Form model="forms.addSession" className={classes.form} noValidate onSubmit={val => this.handleSubmit(val)}>
              <Grid container spacing={2}>
                <Grid item xs={2} sm={2}>
                  <DatePicker
                    clearable
                    name="checkinDate"
                    label="Checkin Date"
                    margin="0"
                    fullwidth
                    format="dd/MM/yyyy"
                    onChange={(e) => {
                      this.setState({
                        checkinDate: e,
                      });
                      this.addGuestFilter({ name: 'checkinDate', value: e !== null ? dateUtil.dateToString(e) : null });
                    }}
                    value={checkinDate}
                    inputVariant="outlined"
                    TextFieldComponent={TextField}
                  />
                </Grid>
                <Grid item xs={2} sm={2}>
                  <DatePicker
                    clearable
                    name="checkoutDate"
                    label="Checkout Date"
                    margin="0"
                    fullwidth
                    format="dd/MM/yyyy"
                    onChange={(e) => {
                      this.setState({
                        checkoutDate: e,
                      });
                      this.addGuestFilter({ name: 'checkoutDate', value: e !== null ? dateUtil.dateToString(e) : null });
                    }}
                    value={checkoutDate}
                    inputVariant="outlined"
                    TextFieldComponent={TextField}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <SelectSearch
                    isClearable
                    margin="normal"
                    id="room-number"
                    placeholder="Room Number"
                    name="roomNumber"
                    options={roomNumbers}
                    onChange={(e) => {
                      this.setState({
                        roomNumber: e,
                      });
                      this.addGuestFilter({ name: 'roomNumber', value: e !== null ? parseInt(e.value, 10) : null });
                    }}
                    value={roomNumber}
                  />
                </Grid>
                <Grid item xs={2} sm={2}>
                  <SelectSearch
                    isClearable
                    margin="normal"
                    id="first-name"
                    placeholder="First Name"
                    name="firstName"
                    options={firstNames}
                    onChange={(e) => {
                      this.setState({
                        firstName: e,
                      });
                      this.addGuestFilter({ name: 'firstName', value: e !== null ? e.label : null });
                    }}
                    openMenuOnClick={false}
                    value={firstName}
                  />
                </Grid>
                <Grid item xs={2} sm={2}>
                  <SelectSearch
                    isClearable
                    margin="normal"
                    id="last-name"
                    placeholder="Last Name"
                    name="lastName"
                    options={lastNames}
                    openMenuOnClick={false}
                    onChange={(e) => {
                      this.setState({
                        lastName: e,
                      });
                      this.addGuestFilter({ name: 'lastName', value: e !== null ? e.label : null });
                    }}
                  />
                </Grid>
                {showGuestDetails ? (
                  <>
                    <Grid item xs={12} sm={12}>
                      <GuestDetails guest={guestDetails} />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                      <Control.text
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
                        model=".shuttleDate"
                        component={DateTimePicker}
                        onChange={date => dispatch(actions.change('forms.addGuest.checkinDate', date))}
                        controlProps={{
                          margin: '0',
                          ampm: false,
                          fullwidth: true,
                          // value: checkinDate,
                          inputVariant: 'outlined',
                          label: 'Shuttle Time',
                          minDate: new Date(),
                          format: 'dd/MM/yyyy HH:mm',
                        }}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <Control.select
                        model=".terminal"
                        component={Select}
                      >
                        <option value="3">3</option>
                        <option value="1">1</option>
                      </Control.select>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Control.text
                        model=".largeBags"
                        component={TextField}
                        variant="outlined"
                        fullWidth
                        id="largeBags"
                        label="Large Bags"
                        name="largeBags"
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Control.text
                        model=".mediumBags"
                        component={TextField}
                        variant="outlined"
                        fullWidth
                        id="mediumBags"
                        label="Medium Bags"
                        name="mediumBags"
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Control.text
                        model=".smallBags"
                        component={TextField}
                        variant="outlined"
                        fullWidth
                        id="smallBags"
                        label="Small Bags"
                        name="smallBags"
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <FormControlLabel
                        control={(
                          <Control.checkbox
                            model=".specialBag"
                            component={Checkbox}
                          />
                        )}
                        label="Special Luggage"
                      />
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      {specialBag ? (
                        <Control.text
                          model=".specialBagDesc"
                          component={TextField}
                          variant="outlined"
                          fullWidth
                          id="specialBagDesc"
                          label="Special Luggage Description"
                          name="specialBagDesc"
                        />
                      ) : null}
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <FormControlLabel
                        control={(
                          <Control.checkbox
                            model=".wakeupCall"
                            component={Checkbox}
                          />
                        )}
                        label="Wakeup Call"
                      />
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      {wakeupCall ? (
                        <Control.custom
                          model=".wakeupDate"
                          component={DateTimePicker}
                          onChange={date => dispatch(actions.change('forms.addSession.wakeupDate', date))}
                          controlProps={{
                            margin: '0',
                            ampm: false,
                            fullwidth: true,
                            // value: checkinDate,
                            inputVariant: 'outlined',
                            minDate: new Date(),
                            format: 'dd/MM/yyyy HH:mm',
                          }}
                        />
                      ) : null}
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <FormControlLabel
                        control={(
                          <Control.checkbox
                            model=".bbox"
                            component={Checkbox}
                          />
                        )}
                        label="BBox"
                      />
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      {bbox ? (
                        <Control.select
                          model=".bboxNumber"
                          component={Select}
                          onChange={date => dispatch(actions.change('forms.addSession.wakeupDate', date))}
                        >
                          {Lodash.range(pax).map(val => (
                            <option value={val + 1}>{val + 1}</option>
                          ))}
                        </Control.select>
                      ) : null}
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Control.select
                        model=".status"
                        component={Select}
                      >
                        <option value="pending">Pending</option>
                        <option value="registered">Registered</option>
                        <option value="denied">Denied</option>
                      </Control.select>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <PhoneNumberInput
                        onChange={(e) => {
                          this.setState({
                            phoneNumber: e,
                          });
                        }}
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
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
                  </>
                ) : null}
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

export default connect(mapStateToProps)(withStyles(useStyle)(AddSession));
