export const UPDATE_CHOSEN_FLIGHT = 'UPDATE_CHOSEN_FLIGHT';
export const SET_FLIGHT_TABLE_ROWS = 'SET_FLIGHT_TABLE_ROWS';
export const SET_FLIGHT_TABLE_ROWS_DISPLAY = 'SET_FLIGHT_TABLE_ROWS_DISPLAY';
export const SET_AIRLINES = 'SET_AIRLINES';
export const SET_COUNTRIES = 'SET_COUNTRIES';
export const SET_CITIES = 'SET_CITIES';
export const SET_AIRLINE = 'SET_AIRLINE';
export const SET_COUNTRY = 'SET_COUNTRY';
export const SET_FLIGHT_NUMBER = 'SET_FLIGHT_NUMBER';
export const SET_CITY = 'SET_CITY';
export const SET_PAGE = 'SET_PAGE';
export const SET_TABLE_HIDE = 'SET_TABLE_HIDE';
export const SET_SELECTED_ROW_ID = 'SET_SELECTED_ROW_ID';
export const SET_FLIGHT_FILTER = 'SET_FLIGHT_FILTER';
export const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE';
export const SET_SAVED_PAGE = 'SET_SAVED_PAGE';
export const IS_CLEARABLE_AIRLINE = 'IS_CLEARABLE_AIRLINE';
export const IS_CLEARABLE_COUNTRY = 'IS_CLEARABLE_COUNTRY';
export const IS_CLEARABLE_CITY = 'IS_CLEARABLE_CITY';
export const SET_LAST_STAGE_CITY_ARRAY = 'SET_LAST_STAGE_CITY_ARRAY';
export const SET_TERMINAL = 'SET_TERMINAL';
export const SET_DEPARTURE = 'SET_DEPARTURE';

export function updateChosenFlight(flight) {
  return {
    type: UPDATE_CHOSEN_FLIGHT,
    flight,
  };
}

export function setFlightTableRows(flightTableRows) {
  return {
    type: SET_FLIGHT_TABLE_ROWS,
    flightTableRows,
  };
}

export function setFlightTableRowsDisplay(tableRows) {
  return {
    type: SET_FLIGHT_TABLE_ROWS_DISPLAY,
    tableRows,
  };
}

export function setAirlines(airlines) {
  return {
    type: SET_AIRLINES,
    airlines,
  };
}

export function setCountries(countries) {
  return {
    type: SET_COUNTRIES,
    countries,
  };
}

export function setCities(cities) {
  return {
    type: SET_CITIES,
    cities,
  };
}

export function setAirline(airline) {
  return {
    type: SET_AIRLINE,
    airline,
  };
}

export function setCountry(country) {
  return {
    type: SET_COUNTRY,
    country,
  };
}

export function setCity(city) {
  return {
    type: SET_CITY,
    city,
  };
}

export function setFlightNumber(flightNumber) {
  return {
    type: SET_FLIGHT_NUMBER,
    flightNumber,
  };
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    page,
  };
}

export function setTableHide(hide) {
  return {
    type: SET_TABLE_HIDE,
    hide,
  };
}

export function setSelectedRowId(rowId) {
  return {
    type: SET_SELECTED_ROW_ID,
    rowId,
  };
}

export function setFlightFilter(filter) {
  return {
    type: SET_FLIGHT_FILTER,
    filter,
  };
}

export function setRowsPerPage(rowsPerPage) {
  return {
    type: SET_ROWS_PER_PAGE,
    rowsPerPage,
  };
}

export function setSavedPage(page) {
  return {
    type: SET_SAVED_PAGE,
    page,
  };
}

export function setIsClearableAirline(isClearableAirline) {
  return {
    type: IS_CLEARABLE_AIRLINE,
    isClearableAirline,
  };
}

export function setIsClearableCountry(isClearableCountry) {
  return {
    type: IS_CLEARABLE_COUNTRY,
    isClearableCountry,
  };
}

export function setIsClearableCity(isClearableCity) {
  return {
    type: IS_CLEARABLE_CITY,
    isClearableCity,
  };
}

export function setLastStageCityArray(cityArray) {
  return {
    type: SET_LAST_STAGE_CITY_ARRAY,
    cityArray,
  };
}

export function setTerminal(terminal) {
  return {
    type: SET_TERMINAL,
    terminal,
  };
}

export function setDeparture(departure) {
  return {
    type: SET_DEPARTURE,
    departure,
  };
}
