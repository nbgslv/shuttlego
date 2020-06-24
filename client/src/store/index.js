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
import { addMinutes } from 'date-fns';
import register from '../reducers/register';
import user from '../reducers/user';

const initialRegisterFirstStepState = {
  terminal: 3,
  flightDate: '',
  manualFlightData: false,
  tableFlightDdate: addMinutes(new Date(), 1),
};

const initialRegisterSecondStepState = {
  shuttleDate: new Date(),
  shuttleHour: 0,
  shuttleMinute: 0,
};

const initialRegisterThirdStepState = {
  largeBags: '',
  mediumBags: '',
  smallBags: '',
  specialBags: false,
  specialBagsDesc: '',
};

const initialRegisterFourthStepState = {
  wakeupCall: 0,
  wakeupTime: addMinutes(new Date(), 16),
  bbox: 0,
  bboxNumber: 1,
};

const initialCompleteDetailsState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  detailsCompletionCookie: false,
  dialogComplete: false,
};

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({
  register,
  user,

  forms: combineForms({
    firstStep: initialRegisterFirstStepState,
    secondStep: initialRegisterSecondStepState,
    thirdStep: initialRegisterThirdStepState,
    fourthStep: initialRegisterFourthStepState,
    completeDetails: initialCompleteDetailsState,
  }, 'forms'),
}), composeEnhancers(applyMiddleware(thunk)));

export default store;
