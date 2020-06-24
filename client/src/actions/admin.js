export const SET_DEFAULT_SESSION_PARAMS_TIME = 'SET_DEFAULT_SESSION_PARAMS_TIME';
export const SET_DEFAULT_SESSION_PARAMS_REST_RELAT = 'SET_DEFAULT_SESSION_PARAMS_REST_RELAT';
export const SET_DEFAULT_SESSION_PARAMS_REST_VALUE = 'SET_DEFAULT_SESSION_PARAMS_REST_VALUE';
export const SET_GUEST_RESET = 'SET_GUEST_RESET';
export const SET_GUEST_RESET_PARAMS = 'SET_GUEST_RESET_PARAMS';
export const SET_GUEST_EDIT_SESSION = 'SET_GUEST_EDIT_SESSION';
export const SET_GUEST_REQUIRED_FIELDS = 'SET_GUEST_REQUIRED_FIELDS';

export function setDefaultSessionParamsTime(defaultSessionParamsTime) {
  return {
    type: SET_DEFAULT_SESSION_PARAMS_TIME,
    defaultSessionParamsTime,
  };
}

export function setDefaultSessionParamsRestRelat(defaultSessionParamsRestRelat) {
  return {
    type: SET_DEFAULT_SESSION_PARAMS_REST_RELAT,
    defaultSessionParamsRestRelat,
  };
}

export function setDefaultSessionParamsRestValue(defaultSessionParamsRestValue) {
  return {
    type: SET_DEFAULT_SESSION_PARAMS_REST_VALUE,
    defaultSessionParamsRestValue,
  };
}

export function setGuestReset(guestReset) {
  return {
    type: SET_GUEST_RESET,
    guestReset,
  };
}

export function setGuestResetParams(params) {
  return {
    type: SET_GUEST_RESET_PARAMS,
    params,
  };
}

export function setGuestEditSession(guestEditSession) {
  return {
    type: SET_GUEST_EDIT_SESSION,
    guestEditSession,
  };
}

export function setGuestRequiredFields(requiredFields) {
  return {
    type: SET_GUEST_REQUIRED_FIELDS,
    requiredFields,
  };
}
