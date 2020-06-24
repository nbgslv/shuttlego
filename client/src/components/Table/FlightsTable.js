import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import {
  CircularProgress,
  Typography,
  withStyles,
  Grid,
  Paper,
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
} from '@material-ui/core';
import Lodash from 'lodash';
import {
  updateChosenFlight,
  setFlightTableRows,
  setFlightTableRowsDisplay,
  setAirlines,
  setCountries,
  setCities,
  setPage,
  setTableHide,
  setSelectedRowId,
  setFlightFilter,
  setRowsPerPage,
  setAirline,
  setCountry,
  setCity,
  setFlightNumber,
  setSavedPage,
  setIsClearableAirline,
  setIsClearableCountry,
  setIsClearableCity,
  setLastStageCityArray,
} from '../../actions/FlightData';
import TablePaginationActions from './TablePaginationActions';
import SelectSearch from '../SelectSearch/SelectSearch';


const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: 'center',
  },
  progress: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  hideMediaQuery: {
    '@media (max-width: 400px)': {
      display: 'none',
    },
  },
});

const mapStateToProps = state => {
  console.log(state);
  return {
    airline: state.register.airline,
    airlinePrefix: state.register.airlinePrefix,
    checkinCounters: state.register.checkinCounters,
    checkinZone: state.register.checkinZone,
    city: state.register.city,
    country: state.register.country,
    ddate: state.register.ddate,
    delDate: state.register.delDate,
    dTime: state.register.dTime,
    flightDate: state.register.flightDate,
    flightNumber: state.register.flightNumber,
    id: state.register.id,
    status: state.register.status,
    terminal: state.register.terminal,
    flightTableRows: state.register.flightsTable.flightTableRows,
    flightTableRowsDisplay: state.register.flightsTable.flightTableRowsDisplay,
    flightFilter: state.register.flightsTable.flightFilter,
    tableHide: state.register.flightsTable.tableHide,
    airlines: state.register.flightsTable.airlines,
    countries: state.register.flightsTable.countries,
    cities: state.register.flightsTable.cities,
    filterAirline: state.register.flightsTable.airline,
    filterCountry: state.register.flightsTable.country,
    filterCity: state.register.flightsTable.city,
    filterFlightNumber: state.register.flightsTable.flightNumber,
    page: state.register.flightsTable.page,
    rowsPerPage: state.register.flightsTable.rowsPerPage,
    selectedRowId: state.register.flightsTable.selectedRowId,
    savedPage: state.register.flightsTable.savedPage,
    isClearableAirline: state.register.flightsTable.isClearableAirline,
    isClearableCountry: state.register.flightsTable.isClearableCountry,
    isClearableCity: state.register.flightsTable.isClearableCity,
    lastStageCityArray: state.register.flightsTable.lastStageCityArray,
  };
};

const mapDispatchToProps = dispatch => ({
  setChosenFlightData: (e) => {
    dispatch(updateChosenFlight(e));
    // dispatch(actions.change('forms.firstStep.terminal', e.terminal));
    dispatch(actions.change('forms.firstStep.ddate', e.ddate));
    dispatch(actions.change('forms.firstStep.tableFlightDdate', e.flightDate));
    // dispatch(actions.change('forms.firstStep.dest', e.dest));
    // dispatch(actions.change('forms.firstStep.checkinZone', e.checkinZone));
    // dispatch(actions.change('forms.firstStep.checkinCounters', e.checkinCounters));
    // dispatch(actions.change('forms.firstStep.flightNumber', e.flightNumber));
    dispatch(actions.change('forms.firstStep.flightDate', e.flightDate));
    dispatch(actions.change('forms.secondStep.shuttleDate', e.flightDate));
  },
  setFlightTableRows: e => dispatch(setFlightTableRows(e)),
  setFlightTableRowsDisplay: e => dispatch(setFlightTableRowsDisplay(e)),
  setAirlines: e => dispatch(setAirlines(e)),
  setCountries: e => dispatch(setCountries(e)),
  setCities: e => dispatch(setCities(e)),
  setPage: e => dispatch(setPage(e)),
  setTableHide: e => dispatch(setTableHide(e)),
  setSelectedRowId: e => dispatch(setSelectedRowId(e)),
  setFlightFilter: e => dispatch(setFlightFilter(e)),
  setAirline: e => dispatch(setAirline(e)),
  setCountry: e => dispatch(setCountry(e)),
  setCity: e => dispatch(setCity(e)),
  setFlightNumber: e => dispatch(setFlightNumber(e)),
  setRowsPerPage: e => dispatch(setRowsPerPage(e)),
  setSavedPage: e => dispatch(setSavedPage(e)),
  setIsClearableAirline: e => dispatch(setIsClearableAirline(e)),
  setIsClearableCountry: e => dispatch(setIsClearableCountry(e)),
  setIsClearableCity: e => dispatch(setIsClearableCity(e)),
  lastStageCityArray: e => dispatch(setLastStageCityArray(e)),
});

class FlightsTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.state = {
      isLoading: true,
      flightTableRows: [],
      flightTableRowsDisplay: [],
      flightFilter: new Set(),
      tableHide: true,
      hide: false,
      airlines: [],
      countries: [],
      cities: [],
      page: 0,
      setPage: 0,
      rowsPerPage: 10,
      setRowsPerPage: 10,
      selectedRowId: 0,
    };
  }

  componentDidMount() {
    const {
      flights,
      hide,
      flightFilter,
      setFlightTableRows,
      setFlightTableRowsDisplay,
      setPage,
      savedPage,
    } = this.props;
    if (flightFilter.size > 0) {
      this.filterTable(flightFilter);
    } else {
      const flightTableRows = this.createFlightTableRows(flights);
      setFlightTableRows(flightTableRows);
      const flightTableRowsDisplay = this.makeTableRowsReadyForDisplay(flightTableRows);
      setFlightTableRowsDisplay(flightTableRowsDisplay);
      this.getSelectFields(flightTableRowsDisplay, flightFilter);
    }
    if (savedPage > 0) setPage(savedPage);
    this.setState({
      isLoading: false,
    });
  }

  createFlightTableRows(records) {
    const flightTableRows = [];

    // API Flight Fields Legend
    // CHAORD = D(eparture)/A(rrival)
    // CHOPERD = Airline
    // CHFLTN = Flight Number
    // CHOPER = Flight Number Prefix
    // CHLOCCT = Country
    // CHLOC1T = City
    // CHSTOL = Departure Date and Time
    // CHPTOL = Delayed Date and time
    // CHCKZN = Checkin Zone
    // CHCINT = Checkin Counters
    // CHTERM = Terminal
    // CHRMINE = Flight Status

    records.forEach((record) => {
      const depdate = this.parseDate(record.CHSTOL);
      const delDate = this.parseDate(record.CHPTOL);
      if (record.CHAORD === 'D' && record.CHRMINE !== 'DEPARTED') {
        flightTableRows.push({
          id: record._id,
          airline: record.CHOPERD,
          flightNumber: record.CHFLTN,
          airlinePrefix: record.CHOPER,
          country: record.CHLOCCT,
          city: record.CHLOC1T,
          flightDate: new Date(
            depdate.date.year,
            depdate.date.month - 1,
            depdate.date.day,
            depdate.time.hour,
            depdate.time.minutes,
          ),
          ddate: `${depdate.date.day}/${depdate.date.month}/${depdate.date.year}`,
          dTime: `${depdate.time.hour}:${depdate.time.minutes}`,
          delDate: `${delDate.date.day}/${delDate.date.month} ${delDate.time.hour}:${delDate.time.minutes}`,
          checkinZone: record.CHCKZN,
          checkinCounters: record.CHCINT,
          terminal: record.CHTERM,
          status: record.CHRMINE,
        });
      }
    });
    return flightTableRows;
  }

  makeTableRowsReadyForDisplay(flightTableRows) {
    const { setFlightTableRowsDisplay } = this.props;
    const tableRows = [];
    flightTableRows.forEach((row) => {
      tableRows.push({
        id: row.id,
        airline: Lodash.startCase(Lodash.lowerCase(row.airline)),
        flightNumber: `${row.airlinePrefix}${row.flightNumber}`,
        dest: `${Lodash.startCase(Lodash.lowerCase(row.city))}, ${Lodash.startCase(Lodash.lowerCase(row.country))}`,
        city: Lodash.startCase(Lodash.lowerCase(row.city)),
        country: Lodash.startCase(Lodash.lowerCase(row.country)),
        flightDate: row.flightDate,
        ddate: `${row.ddate} ${row.dTime}`,
        dTime: row.dTime,
        delDate: row.delDate,
        checkinZone: row.checkinZone,
        checkinCounters: row.checkinCounters,
        terminal: row.terminal,
        status: row.status,
      });
    });
    tableRows.sort(
      (a, b) => a.ddate.split('/')[0] - b.ddate.split('/')[0]
      || a.dTime.split(':')[0] - b.dTime.split(':')[0]
      || a.dTime.split(':')[1] - b.dTime.split(':')[1],
    );
    return tableRows;
  }

  checkIfCityFilteredFirst(flightFilter) {
    let i = 0;
    let countryPos = 0;
    let cityPos = 0;
    flightFilter.forEach((value) => {
      i += 1;
      if (value.name === 'country') countryPos = i;
      if (value.name === 'city') cityPos = i;
    });
    return cityPos < countryPos || (cityPos > countryPos && countryPos === 0);
  }

  getSelectFields(flightTableRows, flightFilter) {
    let airlinesRaw = new Set();
    let countriesRaw = new Set();
    let citiesRaw = new Set();
    const airlines = [];
    const countries = [];
    const cities = [];
    const {
      setAirlines,
      setCountries,
      setCities,
      setAirline,
      setCountry,
      setCity,
      setIsClearableAirline,
      setIsClearableCountry,
      setIsClearableCity,
      cities: lastStageCities,
    } = this.props;

    flightTableRows.forEach((record) => {
      airlinesRaw.add(record.airline);
      countriesRaw.add(record.country);
      citiesRaw.add(record.city);
    });

    airlinesRaw.delete('');
    countriesRaw.delete('');
    citiesRaw.delete('');

    airlinesRaw = [...airlinesRaw].sort();

    airlinesRaw.forEach((airline) => {
      airlines.push({
        value: airline,
        label: Lodash.startCase(Lodash.lowerCase(airline)),
      });
    });

    countriesRaw = [...countriesRaw].sort();

    countriesRaw.forEach((country) => {
      countries.push({
        value: country,
        label: Lodash.startCase(Lodash.lowerCase(country)),
      });
    });

    citiesRaw = [...citiesRaw].sort();

    citiesRaw.forEach((city) => {
      cities.push({
        value: city,
        label: Lodash.startCase(Lodash.lowerCase(city)),
      });
    });
    setAirlines(airlines);
    setCountries(countries);
    setCities(cities);

    let airline = '';
    let country = '';
    let city = '';

    if (airlines.length === 1) {
      let filterContainsAirline = false;
      airline = airlines[0];
      flightFilter.forEach((value) => {
        if (value.name === 'airline') filterContainsAirline = true;
      });
      if (!filterContainsAirline) setIsClearableAirline(0);
      else setIsClearableAirline(1);
      setAirline(airline);
    }
    if (countries.length === 1) {
      let filterContainsCountry = false;
      let filterContainsCity = false;
      country = countries[0];
      flightFilter.forEach((value) => {
        if (value.name === 'country') filterContainsCountry = true;
        if (value.name === 'city') filterContainsCity = true;
      });
      if (!filterContainsCountry) setIsClearableCountry(0);
      else setIsClearableCountry(1);
      setCountry(country);
    }
    if (cities.length === 1) {
      let filterContainsCountry = false;
      let filterContainsCity = false;
      city = cities[0];
      flightFilter.forEach((value) => {
        if (value.name === 'country') filterContainsCountry = true;
        if (value.name === 'city') filterContainsCity = true;
      });
      if ((!filterContainsCity && lastStageCities.length === 1)
        || (cities.length === 1 && filterContainsCountry)) {
        setIsClearableCity(0);
      } else setIsClearableCity(1);
      if (this.checkIfCityFilteredFirst(flightFilter) && filterContainsCity) setIsClearableCity(1);
      if (filterContainsCity) setIsClearableCity(1);
      setCity(city);
    }
  }

  filterTable(flightFilter) {
    const {
      flights,
      setFlightTableRowsDisplay,
      setPage,
    } = this.props;
    const flightRows = this.makeTableRowsReadyForDisplay(this.createFlightTableRows(flights));
    flightFilter.forEach((filter) => {
      for (let i = flightRows.length - 1; i >= 0; i -= 1) {
        if (!flightRows[i][filter.name].includes(filter.value)) {
          flightRows.splice(i, 1);
        }
      }
    });
    setFlightTableRowsDisplay(flightRows);
    this.getSelectFields(flightRows, flightFilter);
    setPage(0);
  }

  handleFilterChange(event) {
    const { target } = event;
    const { name, type } = target;
    let { value } = target;
    let saveValue;
    if (Object.keys(value).includes('value')) {
      saveValue = value;
      value = value.value;
    } else {
      saveValue = '';
    }

    let { flightFilter } = this.props;
    console.log(flightFilter, 'flightFilter');
    const {
      setFlightFilter,
      setAirline,
      setCountry,
      setCity,
      setFlightNumber,
      setTableHide,
      setIsClearableAirline,
      countries,
      cities,
      filterAirline,
    } = this.props;
    let filterChanged = false;
    let newFilter = {};
    console.log(value, 'checked for flight filter change');
    if (value === '') {
      flightFilter = new Set(
        [...flightFilter].filter(filter => filter.name !== name),
      );
      if (name === 'country' && cities.length === 1) {
        setCity('');
        flightFilter = new Set(
          [...flightFilter].filter(filter => filter.name !== 'city'),
        );
        setIsClearableAirline(1);
        if (filterAirline !== '') {
          newFilter = {
            name: 'airline',
            value: filterAirline.value,
          };
          flightFilter.add(newFilter);
          setFlightFilter(flightFilter);
          this.filterTable(flightFilter);
        }
      }
      if (name === 'city' && countries.length === 1) {
        setCountry('');
        flightFilter = new Set(
          [...flightFilter].filter(filter => filter.name !== 'country'),
        );
        setIsClearableAirline(1);
        if (filterAirline !== '') {
          newFilter = {
            name: 'airline',
            value: filterAirline.value,
          };
          flightFilter.add(newFilter);
          setFlightFilter(flightFilter);
          this.filterTable(flightFilter);
        }
      }
    } else if (name === 'flightNumber') {
      flightFilter.forEach((filter) => {
        if (filter.name === 'flightNumber') {
          filter.name = name;
          filter.value = value;
          filterChanged = true;
        }
      });
      if (!filterChanged) {
        newFilter = {
          name,
          value,
        };
        flightFilter.add(newFilter);
      }
    } else {
      newFilter = {
        name,
        value,
      };
      flightFilter.add(newFilter);
    }
    setFlightFilter(flightFilter);
    if (name === 'airline') setAirline(saveValue);
    if (name === 'country') setCountry(saveValue);
    if (name === 'city') setCity(saveValue);
    if (name === 'flightNumber') setFlightNumber(value);
    setTableHide(!(flightFilter.size > 0));
    this.filterTable(flightFilter);
    console.log(flightFilter, 'flightFilter');
  }

  setChosenFlight(flight) {
    const {
      setChosenFlightData,
      setSelectedRowId,
      setSavedPage,
      page,
    } = this.props;
    setChosenFlightData(flight);
    setSelectedRowId(flight.id);
    setSavedPage(page);
  }

  handleChangePage(event, page) {
    const { setPage } = this.props;
    setPage(page);
  }

  handleChangeRowsPerPage(event) {
    const { setPage, setRowsPerPage } = this.props;
    setPage(0);
    setRowsPerPage(event.target.value);
  }

  parseDate(input) {
    const dateTime = input.split('T');
    const date = dateTime[0].split('-');
    const time = dateTime[1].split(':');
    return {
      date: {
        year: date[0],
        month: date[1],
        day: date[2],
      },
      time: {
        hour: time[0],
        minutes: time[1],
      },
    };
  }

  render() {
    const {
      classes,
      theme,
      airlines,
      countries,
      cities,
      filterAirline,
      filterFlightNumber,
      filterCountry,
      filterCity,
      flightTableRowsDisplay,
      tableHide,
      page,
      rowsPerPage,
      selectedRowId,
      isClearableAirline,
      isClearableCountry,
      isClearableCity,
      dispatch,
    } = this.props;
    const {
      isLoading,
    } = this.state;
    return (
      <div className="container">
        <Box textAlign="center">
          <Typography className={classes.instructions}>Fill in your flight details</Typography>
        </Box>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SelectSearch
                name="airline"
                placeholder="Select airline..."
                options={airlines}
                value={filterAirline}
                onChangeFunctionName={this.handleFilterChange}
                isClearable={isClearableAirline}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="flight-number"
                label="Flight number"
                name="flightNumber"
                value={filterFlightNumber}
                onChange={this.handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectSearch
                name="country"
                placeholder="Select destination country..."
                options={countries}
                value={filterCountry}
                onChangeFunctionName={this.handleFilterChange}
                isClearable={isClearableCountry}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectSearch
                name="city"
                placeholder="Select destination city..."
                options={cities}
                value={filterCity}
                onChangeFunctionName={this.handleFilterChange}
                isClearable={isClearableCity}
              />
            </Grid>
          </Grid>
        </form>
        {tableHide ? ('')
          : isLoading ? (
            <div className={classes.progress}>
              <CircularProgress className={classes.progress} />
            </div>
          ) : (
            <Paper
              style={{
                marginTop: '32px',
              }}
              className={classes.paper}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Airline</TableCell>
                    <TableCell>Flight Number</TableCell>
                    <TableCell>Flying to</TableCell>
                    <Box className={classes.hideMediaQuery}>
                      <TableCell>Departue Date & Time</TableCell>
                    </Box>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flightTableRowsDisplay.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                    <TableRow
                      onClick={() => this.setChosenFlight(row)}
                      key={row.id}
                      hover={1}
                      style={{ cursor: 'pointer' }}
                      selected={selectedRowId === row.id}
                    >
                      <TableCell>{row.airline}</TableCell>
                      <TableCell>{row.flightNumber}</TableCell>
                      <TableCell>{row.dest}</TableCell>
                      <Box className={classes.hideMediaQuery}>
                        <TableCell>
                          {row.ddate}
                        </TableCell>
                      </Box>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[]}
                      colSpan={3}
                      count={flightTableRowsDisplay.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles, { withTheme: true })(FlightsTable));
