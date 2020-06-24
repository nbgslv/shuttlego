import React from 'react';
import {
  withStyles,
  makeStyles,
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
  Snackbar,
  SnackbarContent,
  DialogContentText,
} from '@material-ui/core';
import { Launch, CheckCircle, Close } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import {
  KeyboardDatePicker,
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MaterialTable, { MTableToolbar } from 'material-table';
import Lodash from 'lodash';
import DateFnsUtils from '@date-io/date-fns';
import {
  isSameDay,
  parse,
} from 'date-fns';
import { format } from 'date-fns-tz';
import { GuestDialogContext, GuestDialog } from '../../../components/Dialog/Dialog';
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
import * as apiUtil from '../../../util/guest';

const useStyle = makeStyles(theme => ({
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
}));

function AddGuest(props) {
  const { addData } = props;
  function handleDataChange(e) {
    addData({
      [e.target.name]: e.target.value,
    });
  }
  const classes = useStyle;
  const [state, setState] = React.useState({
    checkinDate: new Date(),
  });
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="roomNumber"
                variant="outlined"
                required
                fullWidth
                id="roomNumber"
                label="Room Number"
                autoFocus
                onChange={(e) => {
                  e.persist();
                  setState(stateNow => ({
                    ...stateNow,
                    roomNumber: e.target.value,
                  }));
                  handleDataChange(e);
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                onChange={(e) => {
                  e.persist();
                  setState(stateNow => ({
                    ...stateNow,
                    firstName: e.target.value,
                  }));
                  handleDataChange(e);
                }}
              />
            </Grid>
            <Grid item xs={5} sm={5}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                onChange={(e) => {
                  e.persist();
                  setState(stateNow => ({
                    ...stateNow,
                    lastName: e.target.value,
                  }));
                  handleDataChange(e);
                }}
              />
            </Grid>
            <Grid item xs={3} sm={3}>
              <TextField
                name="pax"
                variant="outlined"
                required
                fullWidth
                id="pax"
                label="Pax"
                autoFocus
                onChange={(e) => {
                  e.persist();
                  setState(stateNow => ({
                    ...stateNow,
                    pax: e.target.value,
                  }));
                  handleDataChange(e);
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <DatePicker
                initialFocusedDate={new Date()}
                value={state.checkinDate}
                format="dd/MM/yy"
                onChange={(e) => {
                  setState(stateNow => ({
                    ...stateNow,
                    checkinDate: parse(format(e, 'dd/MM/yy'), 'dd/MM/yy', new Date()),
                  }));
                  e.target = {
                    value: '',
                    name: '',
                  };
                  e.target.value = parse(format(e, 'dd/MM/yy'), 'dd/MM/yy', new Date());
                  e.target.name = 'checkinDate';
                  handleDataChange(e);
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <DatePicker
                initialFocusedDate={new Date()}
                value={state.checkoutDate}
                format="dd/MM/yy"
                onChange={(e) => {
                  setState(stateNow => ({
                    ...stateNow,
                    checkoutDate: parse(format(e, 'dd/MM/yy'), 'dd/MM/yy', new Date()),
                  }));
                  e.target = {
                    value: '',
                    name: '',
                  };
                  e.target.value = parse(format(e, 'dd/MM/yy'), 'dd/MM/yy', new Date());
                  e.target.name = 'checkoutDate';
                  handleDataChange(e);
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <TimePicker
                ampm={false}
                value={state.sessionTime}
                minutesStep={15}
                format="HH:mm"
                views={['hours', 'minutes']}
                onChange={(e) => {
                  setState(stateNow => ({
                    ...stateNow,
                    sessionTime: parse(format(e, 'HH:mm'), 'HH:mm', new Date()),
                  }));
                  e.target = {
                    value: '',
                    name: '',
                  };
                  e.target.value = parse(format(e, 'HH:mm'), 'HH:mm', new Date());
                  e.target.name = 'sessionTime';
                  handleDataChange(e);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <PhoneNumberInput
                onChange={(e) => {
                  setState(stateNow => ({
                    ...stateNow,
                    phoneNumber: e,
                  }));
                  const phoneNumber = {
                    target: {
                      value: e,
                      name: 'phoneNumber',
                    },
                  };
                  handleDataChange(phoneNumber);
                }}
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const SessionTable = (props) => {
  const { rowData } = props;
  return (
    <MaterialTable
      options={{
        emptyRowsWhenPaging: false,
        grouping: false,
        paging: false,
        search: false,
        toolbar: false,
      }}
      columns={[
        {
          title: 'ID', field: 'sessionId',
        },
        {
          title: 'Check In', field: 'checkinDateStr',
        },
        {
          title: 'Check Out', field: 'checkoutDateStr',
        },
        {
          title: 'Room', field: 'roomNumber',
        },
        {
          title: 'Shuttle', field: 'shuttleDateTime',
        },
        {
          title: 'To Terminal', field: 'terminal',
        },
        {
          title: 'Pax', field: 'pax',
        },
        {
          title: 'Large Bags', field: 'largeBags',
        },
        {
          title: 'Medium Bags', field: 'mediumBags',
        },
        {
          title: 'Small Bags', field: 'smallBags',
        },
        {
          title: 'Special Luggage', field: 'specialBag',
        },
        {
          title: 'Session Time', field: 'sessionTimeStr',
        },
        {
          title: 'Wakeup', field: 'wakeupTime',
        },
        {
          title: 'BBox', field: 'bboxNumber',
        },
        {
          title: 'Status', field: 'status',
        },
      ]}
      data={rowData}
    />
  );
};

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getTableData = this.getTableData.bind(this);
    this.addData = this.addData.bind(this);
    this.state = {
      tableData: [],
      filteredTableData: [],
      dateFilter: new Date('2019-06-01'),
      deleteData: '',
      dialogState: 'add',
      alert: false,
      alertContent: '',
    };
    this.addGuest = {
      checkinDate: new Date(),
    };
  }

  componentDidMount() {
    this.getTableData();
  }

  getTableData() {
    const { dateFilter } = this.state;
    fetch('http://localhost:3001/api/guests')
      .then(res => res.json())
      .then((tableData) => {
        tableData = this.restructTableData(tableData);
        this.setState({
          tableData,
        }, () => this.handleDateChange(dateFilter));
      })
      .catch(err => console.log(err));
  }

  restructTableData(tableData) {
    if (!Array.isArray(tableData)) {
      tableData.checkinDate = parse(tableData.checkinDate, 'yyyy-MM-dd', new Date());
      tableData.checkinDateStr = format(tableData.checkinDate, 'dd/MM/yy');
      if (tableData.checkoutDate !== null) {
        tableData.checkoutDate = parse(tableData.checkoutDate, 'yyyy-MM-dd', new Date());
        tableData.checkoutDateStr = format(tableData.checkoutDate, 'dd/MM/yy');
      }
      tableData.sessionTime = parse(`1992-05-24 ${tableData.sessionHour}:${tableData.sessionMinute}`, 'yyyy-MM-dd HH:mm', new Date());
      tableData.sessionTimeStr = format(tableData.sessionTime, 'HH:mm');
      const guestDetails = {
        email: tableData.email,
        firstName: tableData.firstName,
        guestId: tableData.guestId,
        phoneNumber: tableData.phoneNumber,
        sessions: [],
      };
      guestDetails.sessions.push({
        bbox: tableData.bbox,
        bboxNumber: tableData.bboxNumber,
        checkinDate: tableData.checkinDate,
        checkinDateStr: tableData.checkinDateStr,
        checkoutDate: tableData.checkoutDate,
        checkoutDateStr: tableData.checkoutDateStr || null,
        guestId: tableData.guestId,
        largeBags: tableData.largeBags,
        mediumBags: tableData.mediumBags,
        smallBags: tableData.smallBags,
        pax: tableData.pax,
        roomNumber: tableData.roomNumber,
        sessionId: tableData.sessionId,
        sessionTime: tableData.sessionTime,
        sessionHour: tableData.sessionHour,
        sessionMinute: tableData.sessionMinute,
        sessionTimeStr: tableData.sessionTimeStr,
        shuttleDateTime: tableData.shuttleDateTime,
        specialBag: tableData.specialBag,
        specialBagDesc: tableData.specialBagDesc,
        status: tableData.status,
        terminal: tableData.terminal,
        wakeupCall: tableData.wakeupCall,
        wakeupTime: tableData.wakeupTime,
      });
      return guestDetails;
    }
    tableData.map((row) => {
      row.checkinDate = parse(row.checkinDate, 'yyyy-MM-dd', new Date());
      row.checkinDateStr = format(row.checkinDate, 'dd/MM/yy');
      if (row.checkoutDate !== null) {
        row.checkoutDate = parse(row.checkoutDate, 'yyyy-MM-dd', new Date());
        row.checkoutDateStr = format(row.checkoutDate, 'dd/MM/yy');
      }
      row.sessionTime = parse(`1992-05-24 ${row.sessionHour}:${row.sessionMinute}`, 'yyyy-MM-dd HH:mm', new Date());
      row.sessionTimeStr = format(row.sessionTime, 'HH:mm');
      return row;
    });
    const sessionsByGuest = Lodash.groupBy(tableData, 'guestId');
    const sessionsByGuestObject = Object.values(sessionsByGuest);
    // console.log(sessionsByGuestObject);
    const guestDetails = [];
    const guestDetailsTable = [];
    let j = 0;
    sessionsByGuestObject.map((value) => {
      guestDetails.push({
        email: value[0].email,
        firstName: value[0].firstName,
        guestId: value[0].guestId,
        phoneNumber: value[0].phoneNumber,
        sessions: [],
      });
      for (let i = 0; i < value.length; i += 1) {
        guestDetailsTable.push(value[i]);
        guestDetails[j].sessions.push({
          bbox: value[i].bbox,
          bboxNumber: value[i].bboxNumber,
          checkinDate: value[i].checkinDate,
          checkinDateStr: value[i].checkinDateStr,
          checkoutDate: value[i].checkoutDate,
          checkoutDateStr: value[i].checkoutDateStr || null,
          guestId: value[i].guestId,
          largeBags: value[i].largeBags,
          mediumBags: value[i].mediumBags,
          smallBags: value[i].smallBags,
          pax: value[i].pax,
          roomNumber: value[i].roomNumber,
          sessionId: value[i].sessionId,
          sessionTime: value[i].sessionTime,
          sessionHour: value[i].sessionHour,
          sessionMinute: value[i].sessionMinute,
          sessionTimeStr: value[i].sessionTimeStr,
          shuttleDateTime: value[i].shuttleDateTime,
          specialBag: value[i].specialBag,
          specialBagDesc: value[i].specialBagDesc,
          status: value[i].status,
          terminal: value[i].terminal,
          wakeupCall: value[i].wakeupCall,
          wakeupTime: value[i].wakeupTime,
        });
      }
      j += 1;
    });
    return guestDetails;
  }

  handleDateChange(date) {
    const { tableData } = this.state;
    let filteredTableData;
    if (date !== null) {
      const leftDate = date;
      filteredTableData = tableData.filter((row) => {
        for (let i = 0; i < row.sessions.length; i += 1) {
          const rightDate = row.sessions[i].checkinDate;
          const equal = isSameDay(leftDate, rightDate);
          return equal;
        }
      });
      this.setState({
        dateFilter: date,
      });
    } else {
      filteredTableData = tableData;
    }
    this.setState({
      filteredTableData,
    });
  }

  handleDialogClose(data) {
    const { dialogState } = this.state;
    switch (dialogState) {
      case 'delete':
        this.handleDelete();
        break;
      case 'add':
        console.log(data);
        this.handleAdd(data);
        break;
      default:
        throw new Error('dialogState is undefined');
    }
  }

  handleDelete() {
    const {
      deleteData,
      tableData,
      dateFilter,
    } = this.state;
    const data = { guestId: deleteData.guest_id };
    fetch('http://localhost:3001/api/guests/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        tableData.splice(tableData.findIndex(row => row.guestId === deleteData.guestId), 1);
        this.setState({
          tableData,
          filteredTableData: tableData,
          open: false,
          deleteData: '',
        }, () => this.handleDateChange(dateFilter));
      })
      .catch(err => console.log(err));
  }

  handleEdit(newData, oldData) {
    const { dateFilter } = this.state;
    let { tableData } = this.state;
    const {
      guestId,
      firstName,
      lastName,
      roomNumber,
      pax,
    } = newData;
    let {
      checkinDate,
      checkoutDate,
      sessionTime,
    } = newData;
    checkinDate = this.dateToString(checkinDate);
    if (checkoutDate !== null) checkoutDate = this.dateToString(checkoutDate);
    const { hour, minute } = this.dateToTimeString(sessionTime);
    const data = {
      data: {
        guestId,
        firstName,
        lastName,
        roomNumber,
        checkinDate,
        checkoutDate,
        sessionHour: hour,
        sessionMinute: minute,
        pax,
      },
    };
    fetch('http://localhost:3001/api/guests/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((newRow) => {
        console.log(newRow, 'received after update');
        tableData = tableData.filter((row => row.guestId !== newRow[0].guestId));
        newRow[0] = this.restructTableData(newRow[0]);
        tableData.push(newRow[0]);
        this.setState({
          tableData,
          filteredTableData: tableData,
        }, () => this.handleDateChange(dateFilter));
      });
  }

  async handleAdd(newData) {
    console.log(newData);
    const { dateFilter, tableData } = this.state;
    if (!newData) {
      this.setState({
        open: false,
      });
      return;
    }
    try {
      await apiUtil.addGuest(newData, (res) => {
        this.setState({
          open: false,
          alert: true,
          alertContent: 'Guest was added successfully',
        });
        res = this.restructTableData(res);
        tableData.push(res);
        this.setState({
          tableData,
          filteredTableData: tableData,
        }, () => this.handleDateChange(dateFilter));
      });
    } catch (e) {
      console.log(e);
    }
  }

  addData(data) {
    const key = Object.keys(data);
    const value = Object.values(data);
    this.addGuest[key[0]] = value[0];
  }

  render() {
    const {
      filteredTableData,
      dateFilter,
      alert,
      alertContent,
    } = this.state;
    const { classes } = this.props;
    // TODO snackbar style
    return (
      <React.Fragment>
        <GuestDialogContext.Consumer>
          { context => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <MaterialTable
                columns={[
                  { title: 'ID', field: 'guestId' },
                  { title: 'First Name', field: 'firstName' },
                  { title: 'Last Name', field: 'lastName' },
                  { title: 'E-mail', field: 'email' },
                  { title: 'Phone Number', field: 'phoneNumber' },
                ]}
                data={filteredTableData}
                detailPanel={rowData => <SessionTable rowData={rowData.sessions} />}
                title="Guests"
                editable={{
                  onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                    setTimeout(() => {
                      this.handleEdit(newData, oldData);
                      resolve();
                    }, 1000);
                  }),
                  onRowDelete: oldData => new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const content = (
                        <DialogContentText>
                          Are you sure you want to delete this record?
                        </DialogContentText>
                      );
                      context.changeContent(content);
                      const actions = {
                        names: {
                          primary: 'Cancel',
                          secondary: 'Delete',
                        },
                        instances: {
                          primary: () => context.toggleState(),
                          secondary: () => {
                            this.setState({
                              deleteData: oldData,
                            }, () => {
                              this.handleDelete(oldData);
                              context.toggleState();
                            });
                          },
                        },
                      };
                      context.changeActions(actions);
                      context.changeTitle('Delete guest');
                      context.toggleState();
                      resolve();
                    }, 1000);
                  }),
                }}
                components={{
                  Toolbar: props => (
                    <div>
                      <MTableToolbar {...props} />
                      <div style={{
                        paddingRight: '8px',
                        paddingLeft: '24px',
                        textAlign: 'center',
                        display: 'flex',
                        position: 'relative',
                        alignItems: 'center',
                      }}
                      >
                        <div style={{ flex: '0 0 auto' }}>
                          <KeyboardDatePicker
                            clearable
                            label="Check-in Date"
                            margin="0"
                            fullwidth
                            value={dateFilter}
                            onChange={date => this.handleDateChange(date)}
                            format="dd/MM/yyyy"
                          />
                        </div>
                        <div style={{ flex: '1 1 10%' }} />
                        <div>
                          <Button
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                              const content = (
                                <AddGuest addData={this.addData} />
                              );
                              context.changeContent(content);
                              const actions = {
                                names: {
                                  primary: 'Add Guest',
                                  secondary: 'Cancel',
                                },
                                instances: {
                                  primary: () => {
                                    context.toggleState();
                                    this.handleAdd(this.addGuest);
                                  },
                                  secondary: () => context.toggleState(),
                                },
                              };
                              context.changeActions(actions);
                              context.toggleState();
                              context.changeTitle('Add a guest');
                            }}
                          >
                            Add Guest
                            <Launch className={classes.rightIcon} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ),
                }}
              />
              <GuestDialog
                keepMounted
              />
              <Snackbar
                className={classes.success}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={alert}
                autoHideDuration={6000}
                onClose={() => this.setState({ alert: false })}
              >
                <SnackbarContent
                  className={classes.success}
                  aria-describedby="client-snackbar"
                  message={(
                    <span id="client-snackbar" className={classes.message}>
                      <CheckCircle className={classes.success} />
                      {alertContent}
                    </span>
                  )}
                  action={[
                    <IconButton key="close" aria-label="Close" color="inherit" onClick={() => this.setState({ alert: false })}>
                      <Close className={classes.icon} />
                    </IconButton>,
                  ]}
                />
              </Snackbar>
            </MuiPickersUtilsProvider>
          )}
        </GuestDialogContext.Consumer>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyle)(Guests);
