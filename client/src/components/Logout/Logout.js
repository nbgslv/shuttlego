import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signout } from '../../actions/user';

const Logout = (props) => {
  const { dispatch } = props;
  dispatch(signout());
  return <Redirect to="/" />;
};

export default connect()(Logout);
