import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import {
  combineForms,
} from 'react-redux-form';
import admin from '../reducers/admin';

const initialAddGuestState = {
  roomNumber: 0,
  firstName: '',
  lastName: '',
  pax: 0,
  checkinDate: new Date(),
  checkoutDate: new Date(),
  sessionTime: new Date(),
  phoneNumber: '',
  email: '',
};

const initialAddSessionState = {
  guestId: 0,
  roomNumber: 0,
  pax: 0,
  shuttleDate: '',
  shuttleHour: '',
  shuttleMinute: '',
  terminal: 0,
  largeBags: 0,
  mediumBags: 0,
  smallBags: 0,
  specialBag: false,
  specialBagDesc: '',
  wakeupCall: false,
  wakeupDate: '',
  wakeupHour: '',
  wakeupMinute: '',
  bbox: false,
  bboxNumber: 0,
  status: 'pending',
  phoneNumber: '',
  email: '',
};

const initialGeneralConfigState = {
  sessionTimeDefaultType: '',
  sessionTimeDefaultParams: {},
  guestReset: '',
  guestResetParams: {},
  editSessionByGuest: false,
  requiredGuestFields: {},
  shuttleTimesType: '',
  shuttleTimesParams: {},
  deleteGuestsTime: {},
  deleteGuestsWithSessions: false,
  deleteSessionsTime: {},
};

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({
  admin,

  forms: combineForms({
    addGuest: initialAddGuestState,
    addSession: initialAddSessionState,
    generalConfig: initialGeneralConfigState,
  }, 'forms'),
}), composeEnhancers(applyMiddleware(thunk)));

export default store;
