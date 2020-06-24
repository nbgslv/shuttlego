import React from 'react';
import {
  Button, Container,
  DialogContentText,
  IconButton,
  makeStyles,
  Paper,
  Select,
  MenuItem,
  Snackbar,
  SnackbarContent,
  Typography,
  withStyles, TextField, Grid,
} from '@material-ui/core';
import {
  CheckCircle,
  Close,
  Launch,
  ThumbUp,
  Clear,
} from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import {
  DatePicker,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider, TimePicker,
} from '@material-ui/pickers';
import MaterialTable, { MTableToolbar } from 'material-table';
import DateFnsUtils from '@date-io/date-fns';
import { isSameDay, parse, parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { GuestDialog, GuestDialogContext } from '../../../components/Dialog/Dialog';
import SelectSearch from '../../../components/SelectSearch/SelectSearch';
import { roomNumbers } from '../../../constants/roomNumbers';

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
  button: {
    margin: theme.spacing(1),
  },
}));

function AddSession(props) {
  const { addData, rowData } = props;
  function handleDataChange(e) {
    addData({
      [e.target.name]: e.target.value,
    });
  }
  const event = {
    target: {
      name: 'guestId',
      value: rowData.guestId,
    },
  };
  handleDataChange(event);
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
              <Typography variant="subtitle1">
                Guest:
                {' '}
                {rowData.firstName}
                {' '}
                {rowData.lastName}
                {' '}
                <span style={{ float: 'right' }}>
                  ID:
                  {' '}
                  {rowData.guestId}
                </span>
              </Typography>
            </Grid>
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
            <Grid item xs={3} sm={3}>
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
            <Grid item xs={3} sm={3}>
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
            <Grid item xs={3} sm={3}>
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
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const SessionForm = ({ data, newStatus }) => {
  const handleClick = (event) => {
    const dataStatus = {
      sessionId: data.sessionId,
      status: event,
    };
    fetch('http://localhost:3001/api/sessions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataStatus),
    })
      .then(res => res.json())
      .then((newRow) => {
        newStatus(newRow);
      })
      .catch(console.log);
  };

  return (
    <Container>
      <Paper>
        <Typography variant="h5" component="h3">
          Guest Name
        </Typography>
        <Typography component="p">
          {data.lastName}
          {' '}
          {data.firstName}
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="h5" component="h3">
          Room Number
        </Typography>
        <Typography component="p">
          {data.roomNumber}
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="h5" component="h3">
          Pax
        </Typography>
        <Typography component="p">
          {data.pax}
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="h5" component="h3">
          Stay Period
        </Typography>
        <Typography component="p">
          {data.checkinDate !== null ? data.checkinDate.toString() : null}
          -
          {data.checkoutDate !== null ? data.checkoutDate.toString() : null}
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="h5" component="h3">
          Suttle Time
        </Typography>
        <Typography component="p">
          {data.shuttleDate !== null ? data.shuttleDate : null}
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="h5" component="h3">
          To Terminal
        </Typography>
        <Typography component="p">
          {data.terminal}
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="h5" component="h3">
          Luggage
        </Typography>
        <Typography component="p">
          {data.largeBags}
          {' '}
          {data.mediumBags}
          {' '}
          {data.smallBags}
          {data.specialBagsDesc}
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="h5" component="h3">
          Wakeup
        </Typography>
        <Typography component="p">
          {data.wakeupTime.toString()}
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="h5" component="h3">
          BBox
        </Typography>
        <Typography component="p">
          {data.bboxNumber}
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="h5" component="h3">
          Status
        </Typography>
        <Typography component="p">
          { data.status !== 'pending' ? (
            <React.Fragment>
              <Button
                value="approve"
                onClick={() => handleClick('approved')}
                variant="contained"
                className={useStyle.button}
                disabled={data.status === 'approved'}
                color={data.status !== 'approved' ? 'primary' : 'secondary'}
                endIcon={<ThumbUp />}
              >
                Approve
              </Button>
              <Button
                value="deny"
                onClick={() => handleClick('denied')}
                variant="contained"
                className={useStyle.button}
                disabled={data.status === 'denied'}
                color={data.status === 'deinied' ? 'primary' : 'secondary'}
                endIcon={<Clear />}
              >
                Deny
              </Button>
            </React.Fragment>
          ) : (
            <Button
              value="pending"
              variant="contained"
              className={useStyle.button}
              disabled
            >
              Pending
            </Button>
          )}
        </Typography>
      </Paper>
    </Container>
  );
};

class Sessions extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewStatus = this.handleNewStatus.bind(this);
    this.addData = this.addData.bind(this);
    this.state = {
      tableData: [],
      filteredTableData: [],
      dateFilter: new Date(),
      deleteData: '',
      dialogState: 'add',
      alert: false,
      alertContent: '',
    };
    this.addSession = {};
  }

  componentDidMount() {
    this.getTableData();
  }

  getTableData() {
    const { dateFilter } = this.state;
    fetch('http://localhost:3001/api/sessions')
      .then(res => res.json())
      .then((tableData) => {
        tableData = this.restructTableData(tableData);
        this.setState({
          tableData,
        }, () => this.handleDateChange(dateFilter));
      })
      .catch(err => console.log(err));
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

  addData(data) {
    const key = Object.keys(data);
    const value = Object.values(data);
    this.addSession[key[0]] = value[0];
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

  handleDateChange(date) {
    const { tableData } = this.state;
    let filteredTableData;
    if (date !== null) {
      const leftDate = date;
      filteredTableData = tableData.filter((row) => {
        const rightDate = row.shuttleDateTime;
        if (rightDate === null) return false;
        return isSameDay(leftDate, rightDate);
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

  restructTableData(tableData) {
    if (!Array.isArray(tableData)) {
      if (
        tableData.shuttleDate !== null
        && tableData.shuttleTimeHour !== null
        && tableData.shuttleTimeMinute !== null
      ) {
        tableData.shuttleDateTime = parse(`${tableData.shuttleDate} ${tableData.shuttleTimeHour}:${tableData.shuttleTimeMinute}`, 'yyyy-MM-dd H:mm', new Date());
        tableData.shuttleDateTimeStr = format(tableData.shuttleDateTime, 'dd/MM/yy HH:mm');
      }
      if (tableData.sessionHour !== null && tableData.sessionMinute !== null) {
        tableData.sessionTime = parse(`1992-05-24 ${tableData.sessionHour}:${tableData.sessionMinute}`, 'yyyy-MM-dd HH:mm', new Date());
        tableData.sessionTimeStr = format(tableData.sessionTime, 'HH:mm');
      }
      if (
        tableData.wakeupTimeDate !== null
        && tableData.wakeupTimeHour !== null
        && tableData.wakeupTimeMinute !== null
      ) {
        tableData.wakeupTime = parse(`${tableData.wakeupTimeDate} ${tableData.wakeupTimeHour}:${tableData.wakeupTimeHour}`, 'yyyy-MM-dd H:mm', new Date());
        tableData.wakeupTimeStr = format(tableData.wakeupTime, 'dd/MM/yy HH:mm');
      }
      return tableData;
    }
    tableData.map((row) => {
      if (
        row.shuttleDate !== null
        && row.shuttleTimeHour !== null
        && row.shuttleTimeMinute !== null
      ) {
        row.shuttleDateTime = parse(`${row.shuttleDate} ${row.shuttleTimeHour}:${row.shuttleTimeMinute}`, 'yyyy-MM-dd H:mm', new Date());
        row.shuttleDateTimeStr = format(row.shuttleDateTime, 'dd/MM/yy HH:mm');
      }
      if (row.sessionHour !== null && row.sessionMinute !== null) {
        row.sessionTime = parse(`1992-05-24 ${row.sessionHour}:${row.sessionMinute}`, 'yyyy-MM-dd HH:mm', new Date());
        row.sessionTimeStr = format(row.sessionTime, 'HH:mm');
      }
      if (
        row.wakeupTimeDate !== null
        && row.wakeupTimeHour !== null
        && row.wakeupTimeMinute !== null
      ) {
        row.wakeupTime = parse(`${row.wakeupTimeDate} ${row.wakeupTimeHour}:${row.wakeupTimeHour}`, 'yyyy-MM-dd H:mm', new Date());
        row.wakeupTimeStr = format(row.wakeupTime, 'dd/MM/yy HH:mm');
      }
      return row;
    });
    return tableData;
  }

  handleNewStatus(newRow) {
    let { dateFilter, tableData } = this.state;
    tableData = tableData.filter((row => row.sessionId !== newRow[0].sessionId));
    newRow[0] = this.restructTableData(newRow[0]);
    tableData.push(newRow[0]);
    this.setState({
      tableData,
      filteredTableData: tableData,
    }, () => this.handleDateChange(dateFilter));
  }

  handleAdd(newData) {
    const { dateFilter } = this.state;
    let { tableData } = this.state;
    if (!newData) {
      this.setState({
        open: false,
      });
      return;
    }
    const data = {};
    const fields = Object.entries(newData);
    fields.forEach((entry) => {
      data[entry[0]] = entry[1];
    });
    const date = new Date();
    if (Object.prototype.hasOwnProperty.call(data, 'submit')) {
      delete data.submit;
    }
    if (!Object.prototype.hasOwnProperty.call(data, 'checkinDate')) {
      data.checkinDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    } else {
      data.checkinDate = this.dateToString(data.checkinDate);
      delete data.checkinDateStr;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'checkoutDate')) {
      data.checkoutDate = `${data.checkoutDate.getFullYear()}-${data.checkoutDate.getMonth() + 1}-${data.checkoutDate.getDate()}`;
      delete data.checkoutDateStr;
    }
    if (!Object.prototype.hasOwnProperty.call(data, 'sessionTime')) {
      data.sessionHour = 2;
      data.sessionMinute = 0;
    } else {
      const { hour, minute } = this.dateToTimeString(data.sessionTime);
      data.sessionHour = hour;
      data.sessionMinute = minute;
      delete data.sessionTime;
      delete data.sessionTimeStr;
    }
    fetch('http://localhost:3001/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        this.setState({
          open: false,
          alert: true,
          alertContent: 'Session was added successfully',
        });
        res[0] = this.restructTableData(res[0]);
        tableData.push(res[0]);
        this.setState({
          tableData,
          filteredTableData: tableData,
        }, () => this.handleDateChange(dateFilter));
      })
      .catch(err => console.log(err, 'err'));
  }

  handleEdit(newData, oldData) {
    const { dateFilter } = this.state;
    let { tableData } = this.state;
    console.log(newData);
    const {
      sessionId,
      bbox,
      bboxNumber,
      largeBags,
      mediumBags,
      smallBags,
      specialBag,
      specialBagDesc,
      shuttleDateTime,
      sessionTime,
      pax,
      roomNumber,
      terminal,
      wakeupTime,
      status,
    } = newData;
    let {
      checkinDate,
      checkoutDate,
    } = newData;
    checkinDate = this.dateToString(checkinDate);
    if (checkoutDate !== null) checkoutDate = this.dateToString(checkoutDate);
    let shuttleHour = null;
    let shuttleMinute = null;
    let shuttleDate = null;
    if (shuttleDateTime !== null) {
      const {
        hour,
        minute,
      } = this.dateToTimeString(shuttleDateTime);
      shuttleHour = hour;
      shuttleMinute = minute;
      shuttleDate = this.dateToString(shuttleDateTime);
    }
    let wakeupHour = null;
    let wakeupMinute = null;
    let wakeupDate = null;
    if (wakeupTime !== undefined) {
      const {
        hour,
        minute,
      } = this.dateToTimeString(wakeupTime);
      wakeupHour = hour;
      wakeupMinute = minute;
      wakeupDate = this.dateToString(wakeupTime);
    }
    const {
      hour: sessionHour,
      minute: sessionMinute,
    } = this.dateToTimeString(sessionTime);
    const data = {
      data: {
        sessionId,
        bbox,
        bboxNumber,
        checkinDate,
        checkoutDate,
        largeBags,
        mediumBags,
        smallBags,
        specialBag,
        specialBagDesc,
        pax,
        roomNumber,
        sessionHour,
        sessionMinute,
        shuttleHour,
        shuttleMinute,
        shuttleDate,
        terminal,
        wakeupHour,
        wakeupMinute,
        wakeupDate,
        status,
      },
    };
    fetch('http://localhost:3001/api/sessions/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((newRow) => {
        console.log(newRow, 'received after update');
        tableData = tableData.filter((row => row.sessionId !== newRow[0].sessionId));
        newRow[0] = this.restructTableData(newRow[0]);
        tableData.push(newRow[0]);
        this.setState({
          tableData,
          filteredTableData: tableData,
        }, () => this.handleDateChange(dateFilter));
      });
  }

  render() {

    const {
      filteredTableData,
      dateFilter,
      alert,
      alertContent,
    } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <GuestDialogContext.Consumer>
          { context => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <MaterialTable
                columns={[
                  {
                    title: 'ID',
                    field: 'sessionId',
                    editComponent: props => (
                      <TextField
                        disabled
                        value={props.value}
                      />
                    ),
                  },
                  {
                    title: 'Room',
                    field: 'roomNumber',
                    editComponent: props => (
                      <SelectSearch
                        isClearable
                        margin="normal"
                        required
                        fullWidth
                        id="room-number"
                        placeholder="Room Number"
                        name="roomNumber"
                        autoComplete="room-number"
                        options={roomNumbers}
                        value={{ value: props.value, label: props.value }}
                        onChangeFunctionName={e => props.onChange(e.target.value)}
                      />
                    ),
                  },
                  { title: 'Last Name', field: 'lastName' },
                  {
                    title: 'Shuttle',
                    field: 'shuttleDateTimeStr',
                    editComponent: props => (
                      <KeyboardDateTimePicker
                        ampm={false}
                        format="dd/MM/yy HH:mm"
                        value={props.rowData.shuttleDateTime}
                        onChange={(e) => {
                          props.rowData.shuttleDateTime = e;
                          props.onChange(e);
                        }}
                      />
                    ),
                  },
                  { title: 'Pax', field: 'pax' },
                  { title: 'Large Bags', field: 'largeBags' },
                  { title: 'Medium Bags', field: 'mediumBags' },
                  { title: 'Small Bags', field: 'smallBags' },
                  { title: 'Special Luggage', field: 'specialBagDesc' },
                  {
                    title: 'Wakeup Call',
                    field: 'wakeupTimeStr',
                    editComponent: props => (
                      <KeyboardDateTimePicker
                        ampm={false}
                        format="dd/MM/yy HH:mm"
                        value={props.rowData.wakeupTime}
                        onChange={(e) => {
                          props.rowData.wakeupTime = e;
                          props.onChange(e);
                        }}
                      />
                    ),
                  },
                  { title: 'BBox', field: 'bboxNumber' },
                  {
                    title: 'Session Time',
                    field: 'sessionTimeStr',
                    editComponent: props => (
                      <KeyboardTimePicker
                        ampm={false}
                        format="HH:mm"
                        value={props.rowData.sessionTime}
                        onChange={(e) => {
                          props.rowData.sessionTime = e;
                          props.onChange(e);
                        }}
                      />
                    ),
                  },
                  {
                    title: 'Status',
                    field: 'status',
                    editComponent: props => (
                      <Select
                        value={props.value}
                        onChange={e => props.onChange(e.target.value)}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="registered">Registered</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="denied">Denied</MenuItem>
                      </Select>
                    ),
                  },
                ]}
                data={filteredTableData}
                detailPanel={rowData => (
                  <SessionForm
                    data={rowData}
                    newStatus={this.handleNewStatus}
                  />
                )}
                title="Guests Sessions"
                actions={[
                  {
                    icon: 'launch',
                    tooltip: 'Add Session',
                    onClick: (event, rowData) => {
                      context.changeContent(
                        <AddSession
                          rowData={rowData}
                          addData={this.addData}
                        />,
                      );
                      const actions = {
                        names: {
                          primary: 'Add Session',
                          secondary: 'Cancel',
                        },
                        instances: {
                          primary: () => {
                            context.toggleState();
                            this.handleAdd(this.addSession);
                          },
                          secondary: () => context.toggleState(),
                        },
                      };
                      context.changeActions(actions);
                      context.toggleState();
                      context.changeTitle('Add a session');
                    },
                  },
                ]}
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

export default withStyles(useStyle)(Sessions);
