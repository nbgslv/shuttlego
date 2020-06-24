import {
  UPDATE_CHOSEN_FLIGHT,
  SET_FLIGHT_TABLE_ROWS,
  SET_FLIGHT_TABLE_ROWS_DISPLAY,
  SET_AIRLINES,
  SET_COUNTRIES,
  SET_CITIES,
  SET_AIRLINE,
  SET_COUNTRY,
  SET_CITY,
  SET_FLIGHT_NUMBER,
  SET_PAGE,
  SET_TABLE_HIDE,
  SET_SELECTED_ROW_ID,
  SET_FLIGHT_FILTER,
  SET_ROWS_PER_PAGE,
  SET_SAVED_PAGE,
  IS_CLEARABLE_AIRLINE,
  IS_CLEARABLE_COUNTRY,
  IS_CLEARABLE_CITY,
  SET_LAST_STAGE_CITY_ARRAY,
  SET_TERMINAL,
  SET_DEPARTURE,
} from '../actions/FlightData';

const initialState = {
  airline: '',
  checkinCounters: '',
  checkinZone: '',
  city: '',
  country: '',
  dest: '',
  ddate: '',
  deldate: '',
  dtime: '',
  flightDate: {},
  flightNumber: '',
  id: 0,
  status: '',
  terminal: 0,
  flightsTable: {
    flightTableRows: [],
    flightTableRowsDisplay: [],
    flightFilter: new Set(),
    tableHide: true,
    airlines: [],
    countries: [],
    cities: [],
    airline: '',
    country: '',
    city: '',
    flightNumber: '',
    page: 0,
    rowsPerPage: 10,
    selectedRowId: 0,
    savedPage: 0,
    isClearableAirline: true,
    isClearableCountry: true,
    isClearableCity: true,
    lastStageCityArray: [],
  },
};

function register(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CHOSEN_FLIGHT:
      return Object.assign({}, state, {
        airline: action.flight.airline,
        checkinCounters: action.flight.checkinCounters,
        checkinZone: action.flight.checkinZone,
        city: action.flight.city,
        country: action.flight.country,
        dest: action.flight.dest,
        ddate: action.flight.ddate,
        deldate: action.flight.delDate,
        dtime: action.flight.dTime,
        flightDate: action.flight.flightDate,
        flightNumber: action.flight.flightNumber,
        id: action.flight.id,
        status: action.flight.status,
        terminal: action.flight.terminal,
      });
    case SET_FLIGHT_TABLE_ROWS:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          flightTableRows: action.flightTableRows,
        }),
      });
    case SET_FLIGHT_TABLE_ROWS_DISPLAY:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          flightTableRowsDisplay: action.tableRows,
        }),
      });
    case SET_AIRLINES:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          airlines: action.airlines,
        }),
      });
    case SET_COUNTRIES:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          countries: action.countries,
        }),
      });
    case SET_CITIES:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          cities: action.cities,
        }),
      });
    case SET_AIRLINE:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          airline: action.airline,
        }),
      });
    case SET_COUNTRY:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          country: action.country,
        }),
      });
    case SET_CITY:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          city: action.city,
        }),
      });
    case SET_FLIGHT_NUMBER:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          flightNumber: action.flightNumber,
        }),
      });
    case SET_PAGE:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          page: action.page,
        }),
      });
    case SET_TABLE_HIDE:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          tableHide: Boolean(action.hide),
        }),
      });
    case SET_SELECTED_ROW_ID:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          selectedRowId: action.rowId,
        }),
      });
    case SET_FLIGHT_FILTER:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          flightFilter: action.filter,
        }),
      });
    case SET_ROWS_PER_PAGE:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          rowsPerPage: action.rowsPerPage,
        }),
      });
    case SET_SAVED_PAGE:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          savedPage: action.page,
        }),
      });
    case IS_CLEARABLE_AIRLINE:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          isClearableAirline: action.isClearableAirline,
        }),
      });
    case IS_CLEARABLE_COUNTRY:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          isClearableCountry: action.isClearableCountry,
        }),
      });
    case IS_CLEARABLE_CITY:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          isClearableCity: action.isClearableCity,
        }),
      });
    case SET_LAST_STAGE_CITY_ARRAY:
      return Object.assign({}, state, {
        flightsTable: Object.assign({}, state.flightsTable, {
          lastStageCityArray: action.cityArray,
        }),
      });
    case SET_TERMINAL:
      return Object.assign({}, state, {
        terminal: action.terminal,
      });
    case SET_DEPARTURE:
      return Object.assign({}, state, {
        ddate: action.departure,
      });
    default:
      return state;
  }
}

export default register;
