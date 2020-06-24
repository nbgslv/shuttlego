import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';

const mapStateToProps = state => ({
  terminal: state.forms.firstStep.terminal,
  flightDate: state.forms.firstStep.flightDate,
  shuttleDate: state.forms.secondStep.shuttleDate,
  shuttleHour: state.forms.secondStep.shuttleHour,
  largeBags: state.forms.thirdStep.largeBags,
  mediumBags: state.forms.thirdStep.mediumBags,
  smallBags: state.forms.thirdStep.smallBags,
  specialBags: state.forms.thirdStep.specialBags,
  specialBagsDesc: state.forms.thirdStep.specialBagsDesc,
  wakeupCall: state.forms.fourthStep.wakeupCall,
  wakeupTime: state.forms.fourthStep.wakeupTime,
  bbox: state.forms.fourthStep.bbox,
  bboxNumber: state.forms.fourthStep.bboxNumber,
  flightDetails: state.register.id,
  flightTerminal: state.register.terminal,
  chosenTerminal: state.forms.firstStep.terminal,
  ddate: state.register.ddate,
  dtime: state.register.dtime,
  status: state.register.status,
  deldate: state.register.deldate,
  dest: state.register.dest,
  flightNumber: state.register.flightNumber,
  airline: state.register.airline,
});

class FifthStep extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      terminal,
      flightDate,
      shuttleDate,
      shuttleHour,
      largeBags,
      mediumBags,
      smallBags,
      specialBags,
      specialBagsDesc,
      wakeupCall,
      wakeupTime,
      bbox,
      bboxNumber,
      flightDetails,
      flightTerminal,
      flightNumber,
      airline,
      ddate,
      dtime,
      dest,
      status,
    } = this.props;
    const specialBagHidden = !specialBags;
    const wakeUpCallHidden = !wakeupCall;
    const bboxHidden = !bbox;
    return (
      <React.Fragment>
        <Box
          component="ul"
          hidden={flightDetails}
        >
          Flight Details:
          <Box component="li">
            Flight Number:
            {flightNumber}
          </Box>
          <Box component="li">
            Airline:
            {airline}
          </Box>
          <Box component="li">
            Departue:
            {`${ddate} ${dtime}`}
          </Box>
          <Box component="li">
            Departing From: Terminal
            {flightTerminal}
          </Box>
          <Box component="li">
            Departing To:
            {dest}
          </Box>
          <Box component="li">
            Flight Status:
            {status}
          </Box>
        </Box>
        <Box
          component="ul"
        >
          Shuttle Details:
          <Box component="li">
            Departure:
            {`${shuttleDate} ${shuttleHour}:00`}
          </Box>
          <Box component="li">
            Registered Baggage:
            Small:
            {smallBags}
            {' '}
            Medium:
            {mediumBags}
            {' '}
            Large:
            {largeBags}
          </Box>
          <Box component="li" hidden={specialBagHidden}>
            Special Luggage:
            {specialBagsDesc}
          </Box>
          <Box component="li" hidden={wakeUpCallHidden}>
            Wakeup Call Scheduled to:
            {wakeupTime.toString()}
          </Box>
          <Box component="li" hidden={bboxHidden}>
            Number of Packed Breakfasts ordered:
            {bboxNumber}
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(FifthStep);
