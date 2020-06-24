import React from 'react';
import { connect } from 'react-redux';
import {
  makeStyles,
  CssBaseline,
  Typography,
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  useScrollTrigger,
  Button,
  IconButton,
} from '@material-ui/core';
import { ExitToApp, Person } from '@material-ui/icons';
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

const mapStateToProps = state => ({
  guestId: state.user.userId,
});

function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

function Navbar(props) {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });
  const { guestId, dispatch } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="fixed" color="#e8eaf6">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Shuttle-go
            </Typography>
            <Button href="" color="inherit"><Link to="/users/shuttle" className={classes.link}>My Shuttle</Link></Button>
            <Button href="" color="inherit"><Link to="/admin/register" className={classes.link}>Contact</Link></Button>
            {guestId ? (
              <>
                <IconButton aria-label="user menu" {...bindTrigger(popupState)}>
                  <Person />
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem>
                    <Link to="/users/shuttles" className={classes.link}>My Shuttles</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/logout" className={classes.link}>Log out <ExitToApp /></Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button href="" color="inherit"><Link to="/" className={classes.link}>Sign in</Link></Button>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}

export default connect(mapStateToProps)(Navbar);
