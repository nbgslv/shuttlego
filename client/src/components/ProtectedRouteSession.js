import React from 'react';
import { compose } from 'redux';
import { connect, sto } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as apiUtil from '../util/guest';
import {checkAuthSession, setUserSession} from '../actions/user';
import {isAfter, parseISO} from "date-fns";

const mapStateToProps = state => ({
  guestId: state.user.userId,
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(checkAuthSession(user)),
  setUserSession: user => dispatch(setUserSession(user)),
});

function withAuthSession(ComponentToProtect) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    getSessions() {
      const { guestId, setUserSession } = this.props;
      fetch('http://localhost:3001/api/sessions/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ guestId }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then((session) => {
          // this.setSessionData(session);
          setUserSession(session);
        })
        .catch((e) => {
          this.setState({
            loading: false,
            redirect: true,
          });
        });
    }

    componentDidMount() {
      const { setUserSession, guestId } = this.props;
      apiUtil.checkAuthSession()
        .then((res) => {
          if (res.status === 200) {
            this.setState({ loading: false });
            const data = res.json();
            data.then((res) => {
              console.log(res, 'res');
              setUserSession(res);
            });
          } else {
            this.getSessions();
            this.setState({ loading: false });
          }
        })
        .catch((err) => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        // return <Redirect to="/" />;
        return ('redirected');
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}

export const withAuthSessWrapped = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthSession,
);
