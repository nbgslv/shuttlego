import React from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Fab,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  IconButton, Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  ExpandMore,
  Edit,
  DeleteForever,
  Email,
  Sms,
  Print,
} from '@material-ui/icons';
import ReactToPrint from 'react-to-print';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ShuttleDisplay from '../ShuttleDisplay/ShuttleDisplay';
import { GuestDialog, GuestDialogContext } from '../Dialog/Dialog';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const mapStateToProps = state => ({
  guestId: state.user.userId,
});

function ShuttleList(props) {
  const [shuttles, setShuttles] = React.useState([]);
  const classes = useStyles();
  const { guestId } = props;
  const componentRef = React.useRef();
  const ConfirmationPrint = () => (
    <Container>
      <div>
        <IconButton>
          <Email />
          Email Confirmation
        </IconButton>
        <IconButton>
          <Sms />
          SMS Confirmation
        </IconButton>
        <ReactToPrint
          trigger={() => (
            <IconButton>
              <Print />
                Print Confirmation
            </IconButton>
          )}
          content={() => componentRef.current}
        />
      </div>
    </Container>
  );
  React.useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:3001/api/sessions/guest', {
        method: 'POST',
        body: JSON.stringify({ guestId }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((shuttlesPack) => {
          setShuttles(shuttlesPack);
        })
        .catch(console.log);
    };
    fetchData();
    console.log(shuttles);
  }, [guestId]);


  return (
    <div className={classes.root}>
      <GuestDialogContext.Consumer>
        { context => (
          <>
            {shuttles.map(shuttle => (shuttle.status !== 'pending' ? (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} alignSelf="flex-center" flexGrow={1}>
                    <Typography className={classes.heading}>
                      Session No.
                      {' '}
                      {shuttle.sessionId}
                      :
                      {' '}
                      {shuttle.shuttleDate}
                    </Typography>
                  </Box>
                  <Box>
                    {shuttle.status}
                    {' '}
                    <IconButton onClick={(e) => {
                      e.stopPropagation();
                      context.changeActions({
                        names: {
                          primary: 'Close',
                          secondary: 'Cancel',
                        },
                        instances: {
                          primary: () => context.toggleState(),
                          secondary: () => context.toggleState(),
                        },
                      });
                      context.changeContent(<ConfirmationPrint />);
                      context.changeTitle('Shuttle Confirmation');
                      context.changePayload(shuttle);
                      context.toggleState();
                    }}
                    >
                      <Email />
                    </IconButton>
                  </Box>
                  <Box><IconButton href="/users/shuttle/edit" onClick={e => e.stopPropagation()}><Edit /></IconButton></Box>
                  <Box><IconButton href="/users/deleteshuttle" onClick={e => e.stopPropagation()}><DeleteForever /></IconButton></Box>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ShuttleDisplay ref={componentRef} shuttle={shuttle} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ) : null))}
            <GuestDialog
              keepMounted
            />
          </>
        )}
      </GuestDialogContext.Consumer>
    </div>
  );
}

export default connect(mapStateToProps)(ShuttleList);
