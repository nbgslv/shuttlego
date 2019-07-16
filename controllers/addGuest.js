const addMinutes = require('date-fns/add_minutes');
const getMinutes = require('date-fns/get_minutes');
const setMinutes = require('date-fns/set_minutes');
const addHours = require('date-fns/add_hours');
const getHours = require('date-fns/get_hours');
const format = require('date-fns/format');
const printSlip = require('../utilities/printer');

const addGuest = (guest) => {
  const {
    id,
    verf_code: verfCode,
    create_date: createDate,
    session_time: sessionTime,
  } = guest;
  const endMinutes = addMinutes(createDate, getMinutes(sessionTime));
  const endHour = addHours(createDate, getHours(sessionTime));
  const endTimeString = format(setMinutes(endHour, getMinutes(endMinutes)), 'DD/MM/YY HH:mm');
  printSlip(id, verfCode, endTimeString);
};

module.exports = addGuest;
