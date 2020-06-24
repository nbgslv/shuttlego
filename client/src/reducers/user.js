import {
  SET_USER,
  SET_USER_SESSION,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_PHONE_NUMBER,
  SET_EMAIL,
  SET_SHUTTLE_EDIT,
  SET_LOADING_DATA,
  EMPTY_USER_SESSION,
  SET_SESSION_ID,
} from '../actions/user';

const initalState = {
  userId: 0,
  sessionEnd: 0,
  firstName: '',
  lastName: '',
  pax: 0,
  roomNumber: '',
  checkinDate: '',
  checkoutDate: '',
  phoneNumber: '',
  email: '',
  status: '',
  lockUpdate: false,
  loadingData: true,
  editShuttle: false,
  sessAuth: false,
};

function user(state = initalState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        userId: action.user.guestId,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        phoneNumber: action.user.phoneNumber,
        email: action.user.email,
        loadingData: false,
      });
    case SET_USER_SESSION:
      return Object.assign({}, state, {
        roomNumber: action.user.roomNumber,
        sessionId: action.user.sessionId,
        sessionEnd: action.user.sessionEnd,
        pax: action.user.pax,
        checkinDate: action.user.checkinDate,
        checkoutDate: action.user.checkoutDate,
        status: action.user.status,
        sessAuth: true,
      });
    case EMPTY_USER_SESSION:
      return Object.assign({}, state, {
        ...initalState,
      });
    case SET_FIRST_NAME:
      return Object.assign({}, state, {
        firstName: action.firstName,
      });
    case SET_SESSION_ID:
      return Object.assign({}, state, {
        sessionId: action.sessionId,
      });
    case SET_LAST_NAME:
      return Object.assign({}, state, {
        lastName: action.lastName,
      });
    case SET_PHONE_NUMBER:
      return Object.assign({}, state, {
        phoneNumber: action.phoneNumber,
      });
    case SET_EMAIL:
      return Object.assign({}, state, {
        email: action.email,
      });
    case SET_SHUTTLE_EDIT:
      return Object.assign({}, state, {
        editShuttle: action.edit,
      });
    case SET_LOADING_DATA:
      return Object.assign({}, state, {
        loadingData: action.loading,
      });
    default:
      return state;
  }
}

export default user;
