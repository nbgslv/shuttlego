import {
  SET_DEFAULT_SESSION_PARAMS_TIME,
  SET_DEFAULT_SESSION_PARAMS_REST_RELAT,
  SET_DEFAULT_SESSION_PARAMS_REST_VALUE,
  SET_GUEST_RESET,
  SET_GUEST_RESET_PARAMS,
  SET_GUEST_EDIT_SESSION,
  SET_GUEST_REQUIRED_FIELDS,
} from '../actions/admin';

const initialState = {
  defaultSessionType: '',
  defaultSessionParams: {
    params: {
      time: [],
      restrictions: {
        relativity: '',
        value: '',
      },
    },
  },
  guestReset: '',
  guestResetParams: {},
  guestEditSession: false,
  guestRequiredFields: [],
};

function admin(state = initialState, action) {
  switch (action.type) {
    case SET_DEFAULT_SESSION_PARAMS_TIME: {
      const time = state.defaultSessionParams.params.time.filter(
        value => value.type !== action.defaultSessionParamsTime.type,
      );
      time.push(action.defaultSessionParamsTime);
      return Object.assign({}, state, {
        defaultSessionParams: {
          ...state.defaultSessionParams,
          params: Object.assign({}, state.defaultSessionParams.params, {
            ...state.defaultSessionParams.params,
            time,
          }),
        },
      });
    }
    case SET_DEFAULT_SESSION_PARAMS_REST_RELAT: {
      return Object.assign({}, state, {
        defaultSessionParams: {
          ...state.defaultSessionParams,
          params:
            Object.assign({}, state.defaultSessionParams.params, {
              ...state.defaultSessionParams.params,
              restrictions:
                Object.assign({}, state.defaultSessionParams.params.restrictions, {
                  ...state.defaultSessionParams.params.restrictions,
                  ...action.defaultSessionParamsRestRelat,
                }),
            }),
        },
      });
    }
    case SET_DEFAULT_SESSION_PARAMS_REST_VALUE: {
      return Object.assign({}, state, {
        defaultSessionParams: {
          ...state.defaultSessionParams,
          params:
            Object.assign({}, state.defaultSessionParams.params, {
              ...state.defaultSessionParams.params,
              restrictions:
                Object.assign({}, state.defaultSessionParams.params.restrictions, {
                  ...state.defaultSessionParams.params.restrictions,
                  ...action.defaultSessionParamsRestValue,
                }),
            }),
        },
      });
    }
    case SET_GUEST_RESET: {
      return Object.assign({}, state, {
        guestReset: action.guestReset,
      });
    }
    case SET_GUEST_RESET_PARAMS: {
      return Object.assign({}, state, {
        guestResetParams: {
          ...state.guestResetParams,
          ...action.params,
        },
      });
    }
    case SET_GUEST_EDIT_SESSION: {
      return Object.assign({}, state, {
        guestEditSession: action.guestEditSession,
      });
    }
    case SET_GUEST_REQUIRED_FIELDS: {
      return Object.assign({}, state, {
        guestRequiredFields: action.requiredFields,
      });
    }
    default:
      return state;
  }
}

export default admin;
