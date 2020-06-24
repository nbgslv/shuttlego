import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as apiUtil from '../util/guest';
import { checkAuthUser } from '../actions/user';

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(checkAuthUser(user)),
});

function withAuthUser(ComponentToProtect) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      const { loginUser } = this.props;
      apiUtil.checkAuthUser()
        .then((res) => {
          if (res.status === 200) {
            this.setState({ loading: false });
            const data = res.json();
            data.then((res) => {
              console.log(res, 'res');
              loginUser(res[0]);
            });
          } else {
            const error = new Error(res.error);
            throw error;
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
        return <Redirect to="/" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}

export const withAuthUserWrapped = compose(
  connect(null, mapDispatchToProps),
  withAuthUser,
);
