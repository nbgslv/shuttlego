const datefns = require('date-fns');
const jwt = require('jsonwebtoken');
const env = require('../../config');
const {
  getAllGuestsDB,
  getGuestDB,
  postGuestDB,
  patchGuestDB,
  deleteGuestDB,
  selectGuestsDB,
  getGuestsJoinSessionDB,
} = require('../db/guestsDB');
const {
  getVerifCode,
  hashVerifCode,
  verifCode,
} = require('../utils/verifCode');

const getAllGuests = async (callback) => {
  try {
    return await getGuestsJoinSessionDB((guests) => {
      callback(guests);
    });
  } catch (e) {
    throw new Error(e);
  }
};

const getGuest = async (guestId) => {
  try {
    return await getGuestDB(guestId);
  } catch (e) {
    throw new Error(e.messages);
  }
};

const postGuest = async (data, sessionHour, sessionMinute, callback) => {
  try {
    const guestData = data;
    console.log(data);
    const verifCode = getVerifCode();
    console.log(verifCode, 'code'); // DELETE BEFORE PRODUCTION
    guestData.verf_code = hashVerifCode(verifCode);
    postGuestDB(guestData, sessionHour, sessionMinute, (guest) => {
      callback(guest);
    });
  } catch (e) {
    throw new Error(e.messages);
  }
};

const patchGuest = async (data, guestId, sessionHour, sessionMinute, callback) => {
  try {
    return await patchGuestDB(data, guestId, sessionHour, sessionMinute, (guest) => {
      callback(guest);
    });
  } catch (e) {
    throw new Error(e.messages);
  }
};

const deleteGuest = async (guestId, callback) => {
  try {
    return await deleteGuestDB(guestId, (deleted) => {
      callback(deleted);
    });
  } catch (e) {
    throw new Error(e.messages);
  }
};

const updateEmailPhone = async (data, field, guest) => {
  if (data !== '' && (guest[field] === '' || guest[field] === null)) {
    try {
      const newData = {
        [field]: data,
      };
      await patchGuestDB(newData, guest.guest_id);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
};

const verifyGuest = async (pass, phoneNumber, email, params, columns) => {
  let appropGuests;
  try {
    appropGuests = await selectGuestsDB(params, columns);
  } catch (e) {
    console.log(e);
    throw new Error(e.messages);
  }
  let userIndex;
  appropGuests.map((row, i) => {
    if (verifCode(pass, row.verf_code)) {
      userIndex = i;
    }
  });
  if (userIndex) {
    await updateEmailPhone(phoneNumber, 'phone_number', appropGuests[userIndex]);
    await updateEmailPhone(email, 'email', appropGuests[userIndex]);
    const guest = getGuestJoinSessionDB(appropGuests[userIndex].guest_id);
    const iat = guest.created_at;
    const expWithHours = datefns.addHours(iat, guest.session_time_hour);
    const expWithMinutes = datefns.addMinutes(
      expWithHours,
      guest.session_time_minute,
    );
    const expUnixTime = datefns.getUnixTime(expWithMinutes);
    const user = {
      guestId: guest.guest_id,
      sessionEnd: expWithMinutes,
      firstName: guest.first_name,
      lastName: guest.last_name,
      pax: guest.pax,
      roomNumber: guest.room_number,
      checkinDate: guest.check_in_date,
      checkoutDate: guest.check_out_date,
      phoneNumber: guest.phone_number,
      email: guest.email,
      authorized: true,
    };
    const token = jwt.sign({
      data: user,
      exp: expUnixTime,
    },
    env.dev.jwtSecret);

    return {
      user,
      token,
    };
  }
  return false;
};

const authorizeGuest = async (token) => {
  jwt.verify(token, env.dev.jwtSecret, (err, decoded) => {
    if (err) {
      console.log(err);
      return false;
    }
    return decoded;
  });
};

module.exports = {
  getAllGuests,
  getGuest,
  postGuest,
  patchGuest,
  deleteGuest,
  verifyGuest,
  authorizeGuest,
};
