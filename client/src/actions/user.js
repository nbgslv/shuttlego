import { formReducer, actions } from 'react-redux-form';
import * as apiUtil from '../util/guest';

export const SET_USER = 'SET_USER';
export const SET_USER_SESSION = 'SET_USER_SESSION';
export const EMPTY_USER_SESSION = 'EMPTY_USER_SESSION';
export const SET_SESSION_ID = 'SET_SESSION_ID';
export const SET_FIRST_NAME = 'SET_FIRST_NAME';
export const SET_LAST_NAME = 'SET_LAST_NAME';
export const SET_PHONE_NUMBER = 'SET_PHONE_NUMBER';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_SHUTTLE_EDIT = 'SET_SHUTTLE_EDIT';
export const SET_LOADING_DATA = 'SET_LOADING_DATA';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function setUserSession(user) {
  return {
    type: SET_USER_SESSION,
    user,
  };
}

export function emptyUserSession(user) {
  return {
    type: EMPTY_USER_SESSION,
    user,
  };
}

export function setSessionId(sessionId) {
  return {
    type: SET_SESSION_ID,
    sessionId,
  };
}

const completeDetailsFormReducer = formReducer('forms.completeDetails');

export function login(user) {
  return async function (dispatch) {
    const response = await apiUtil.login(user);
    const data = await response.json();
    if (response.ok) {
      completeDetailsFormReducer(undefined, actions.change('forms.completeDetails.firstName', data.firstName));
      completeDetailsFormReducer(undefined, actions.change('forms.completeDetails.lastName', data.lastName));
      completeDetailsFormReducer(undefined, actions.change('forms.completeDetails.phoneNumber', data.phoneNumber));
      completeDetailsFormReducer(undefined, actions.change('forms.completeDetails.email', data.email));
      return dispatch(setUser(data));
    } else {
      console.log('login failed');
    }
  };
}

export function loginSession(user) {
  return async function (dispatch) {
    const response = await apiUtil.login(user);
    const data = await response.json();
    if (response.ok) {
      completeDetailsFormReducer(undefined, actions.change('forms.completeDetails.firstName', data.firstName));
      completeDetailsFormReducer(undefined, actions.change('forms.completeDetails.lastName', data.lastName));
      completeDetailsFormReducer(undefined, actions.change('forms.completeDetails.phoneNumber', data.phoneNumber));
      completeDetailsFormReducer(undefined, actions.change('forms.completeDetails.email', data.email));
      return dispatch(setUser(data));
    } else {
      console.log('login failed');
    }
  };
}

export function checkAuthUser(data) {
  return async function (dispatch) {
    dispatch(actions.change('forms.completeDetails.firstName', data.first_name));
    dispatch(actions.change('forms.completeDetails.lastName', data.last_name));
    dispatch(actions.change('forms.completeDetails.phoneNumber', data.phone_number));
    dispatch(actions.change('forms.completeDetails.email', data.email));
    dispatch(setUser(data));
    dispatch(setUserSession(data));
  };
}

export function checkAuthSession(data) {
  return async function (dispatch) {
    dispatch(setUserSession(data));
  };
}

export function signout() {
  return async function (dispatch) {
    const logout = await apiUtil.logout();
    if (logout.ok) {
      return dispatch(emptyUserSession());
    }
    return new Error('there was a problem logging out');
  };
}

export function setFirstName(firstName) {
  return {
    type: SET_FIRST_NAME,
    firstName,
  };
}

export function setLastName(lastName) {
  return {
    type: SET_LAST_NAME,
    lastName,
  };
}

export function setPhoneNumber(phoneNumber) {
  return {
    type: SET_PHONE_NUMBER,
    phoneNumber,
  };
}

export function setEmail(email) {
  return {
    type: SET_EMAIL,
    email,
  };
}

export function setShuttleEdit(edit) {
  return {
    type: SET_SHUTTLE_EDIT,
    edit,
  };
}

export function setLoadingData(loading) {
  return {
    type: SET_LOADING_DATA,
    loading,
  };
}

// export const signup = user => async dispatch => {
//   const response = await apiUtil.signup(user);
//   const data = await response.json();
//
//   if (response.ok) {
//     return dispatch(receiveCurrentUser(data));
//   }
//   // todo: handle errors
// };
//
// export const logout = () => async dispatch => {
//   const response = await apiUtil.logout();
//   const data = await response.json();
//   if (response.ok) {
//     return dispatch(logoutCurrentUser());
//   }
//   // todo: handle errors
// };
