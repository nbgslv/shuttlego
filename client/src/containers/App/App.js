import React from 'react';
import { connect } from 'react-redux';
import {
  CssBaseline,
  Typography,
  withStyles,
  Container,
  Link,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { ParallaxBanner } from 'react-scroll-parallax';
import { CookiesProvider } from 'react-cookie';
import SushiPersianRedChipmunk from '../../assets/theme';
import HeroBg from '../../assets/images/hero.png';
import Navbar from '../../components/Navbar/Navbar';
import Routes from '../Routes';
import { checkAuthUser } from '../../actions/user';
import { GuestDialogProvider } from '../../components/Dialog/Dialog';
// import './App.css';

const useStyles = theme => ({
  heroContent: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  link: {
    cursor: 'pointer',
  },
  contactDetails: {
    marginTop: theme.spacing(1),
  },
});

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(checkAuthUser),
});

class App extends React.Component{
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   const { checkAuth } = this.props;
  //   checkAuth();
  // }

  render() {
    const { classes } = this.props;
    const myTheme = SushiPersianRedChipmunk;
    return (
      <React.Fragment>
        <CssBaseline />
        <CookiesProvider>
          <ThemeProvider theme={myTheme}>
            <GuestDialogProvider>
              <Navbar />
              <ParallaxBanner
                layers={[
                  {
                    image: HeroBg,
                    amount: 0.5,
                  },
                ]}
                style={{
                  height: '100%,',
                }}
              >
                <main>
                  {/* Hero unit */}
                  <div className={classes.heroContent}>
                    <Container maxWidth="xl">
                      <Typography
                        style={{
                          marginTop: '0.35em',
                        }}
                        component="h1"
                        variant="h2"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                      >
                        Shuttle-Go
                      </Typography>
                      <Routes />
                    </Container>
                  </div>
                </main>
              </ParallaxBanner>
              <footer className={classes.footer}>
                <container maxWidth="sm">
                  <div>
                    <Link component="a" href="http://www.atlas.co.il" className={classes.link}>
                      Atlas.co.il
                    </Link>
                  </div>
                  <div className={classes.contactDetails}>
                    P: +972.8.9199100
                    <br />
                    E: sadot@atlashotels.co.il
                  </div>
                </container>
              </footer>
            </GuestDialogProvider>
          </ThemeProvider>
        </CookiesProvider>
      </React.Fragment>
    );
  }
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(App));
