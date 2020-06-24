import React from 'react';
import { connect } from 'react-redux';
import {Box, Button, Container, Grid, Link, makeStyles, TextField, Typography, withStyles} from '@material-ui/core';
import {login} from '../../../actions/user';
import * as apiUtil from '../../../util/guest';
import SelectSearch from '../../../components/SelectSearch/SelectSearch';
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
import {roomNumbers} from '../../../constants/roomNumbers';
import {GuestDialog, GuestDialogContext} from "../../../components/Dialog/Dialog";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetVerif = (props) => {
  const { addData } = props;
  return (
    <div className={useStyles.form} noValidate>
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
        onChange={e => addData({ roomNumber: e.value })}
      />
      <TextField
        margin="normal"
        fullWidth
        name="email"
        label="Email"
        type="email"
        id="email"
        onChange={e => addData({ email: e.target.value })}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(login(user)),
});

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitSignin = this.handleSubmitSignin.bind(this);
    this.addData = this.addData.bind(this);
    this.state = {
      roomNumber: 0,
      confCode: 0,
      email: '',
      phoneNumber: '',
    };
    this.resetData = {};
  }

  componentDidMount() {
    apiUtil.checkAuthUser()
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push('/users/shuttle');
        }
      });
  }

  handleSubmitSignin(event) {
    event.preventDefault();
    const {
      roomNumber,
      confCode,
      email,
      phoneNumber,
    } = this.state;
    const { loginUser } = this.props;
    const user = {
      roomNumber: roomNumber.value,
      confCode,
      email,
      phoneNumber,
    };
    loginUser(user)
      .then(() => this.props.history.push('/users/shuttle'));
  }

  handlePhoneNumberChange(event) {
    this.setState({
      phoneNumber: event,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  addData(data) {
    const key = Object.keys(data);
    const value = Object.values(data);
    this.resetData[key[0]] = value[0];
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main">
        <Box component="div" className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form} noValidate>
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
              onChangeFunctionName={this.handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="confCode"
              label="Verification Code"
              type="text"
              id="code"
              onChange={this.handleChange}
            />
            <PhoneNumberInput
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={(phone) => { this.setState({ phoneNumber: phone }); }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmitSignin}
            >
              Sign In
            </Button>
            <GuestDialogContext.Consumer>
              { context => (
                <Grid container>
                  <Grid item xs>
                    <Link onClick={() => {
                      context.changeTitle('Reset Verification Code');
                      context.changeContent(<ResetVerif addData={this.addData} />);
                      context.changeActions({
                        names: {
                          primary: 'Reset',
                          secondary: 'Cancel',
                        },
                        instances: {
                          primary: () => {
                            context.toggleState();
                            apiUtil.resetGuest(this.resetData.roomNumber, this.resetData.email);
                          },
                          secondary: () => {
                            context.toggleState();
                          },
                        },
                      });
                      context.toggleState();
                    }}
                      variant="body2"
                    >
                      Lost your verification code?
                    </Link>
                    <GuestDialog
                      keepMounted
                    />
                  </Grid>
                </Grid>
              )}
            </GuestDialogContext.Consumer>
          </div>
        </Box>
      </Container>
    );
  }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(Signin));
