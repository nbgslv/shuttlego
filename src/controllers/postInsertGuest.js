const addMinutes = require('date-fns/add_minutes');
const getMinutes = require('date-fns/get_minutes');
const addHours = require('date-fns/add_hours');
const getHours = require('date-fns/get_hours');
const format = require('date-fns/format');
// const printSlip = require('../utils/printer');

const postInsertGuest = (guest, verfCode) => {
  const {
    id,
    create_date: createDate,
    session_time: sessionTime,
  } = guest;

  const endHour = addHours(createDate, getHours(sessionTime));
  const endMinutes = addMinutes(endHour, getMinutes(sessionTime));

  const session = sessions.insertPostGuest(id, endMinutes);
  if (typeof session !== 'number') throw new Error(session);

  const endTimeString = format(endMinutes, 'DD/MM/YY HH:mm');
  // printSlip(id, verfCode, endTimeString);
};

module.exports = postInsertGuest;
