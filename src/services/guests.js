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
  getGuestJoinSessionDB,
} = require('../db/guestsDB');
const {
  getVerifCode,
  hashVerifCode,
  verifyCode,
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

const postGuest = async (guestData, sessionData, callback) => {
  try {
    const verifCode = getVerifCode();
    console.log(verifCode, 'loginCode'); // DELETE BEFORE PRODUCTION
    sessionData.verf_code = hashVerifCode(verifCode);
    postGuestDB(guestData, sessionData, (guestPost) => {
      console.log(guestPost, 'services');
      callback(guestPost);
    });
  } catch (e) {
    throw new Error(e.messages);
  }
};

const patchGuest = async (guestData, sessionData, guestId, callback) => {
  try {
    return await patchGuestDB(guestData, sessionData, guestId, (guest) => {
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
  console.log(data);
  console.log(field);
  console.log(guest);
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

const verifyGuest = async (pass, phoneNumber, email, params, columns, callback) => {
  let appropGuests;
  let userIndex;
  try {
    await selectGuestsDB(params, columns, (guests) => {
      appropGuests = guests;
      appropGuests.map((row, i) => {
        if (verifCode(pass, row.verf_code)) {
          userIndex = i;
        }
        if (userIndex) {
          updateEmailPhone(phoneNumber, 'phone_number', appropGuests[userIndex]);
          updateEmailPhone(email, 'email', appropGuests[userIndex]);
          getGuestJoinSessionDB(appropGuests[userIndex].guest_id, (guest) => {
            const guestData = guest[0];
            const iat = guestData.created_at;
            const expWithHours = datefns.addHours(iat, guestData.session_time_hour);
            const expWithMinutes = datefns.addMinutes(
              expWithHours,
              guestData.session_time_minute,
            );
            const expUnixTime = datefns.getUnixTime(expWithMinutes);
            const user = {
              guestId: guestData.guest_id,
              sessionEnd: expWithMinutes,
              firstName: guestData.first_name,
              lastName: guestData.last_name,
              pax: guestData.pax,
              roomNumber: guestData.room_number,
              checkinDate: guestData.check_in_date,
              checkoutDate: guestData.check_out_date,
              phoneNumber: guestData.phone_number,
              email: guestData.email,
              authorized: true,
            };
            const token = jwt.sign({
              data: user,
              exp: expUnixTime,
            },
            env.dev.jwtSecret);

            callback({
              user,
              token,
            });
          });
        }
      });
    });
  } catch (e) {
    console.log(e);
    throw new Error(e.messages);
  }
};

const authorizeGuest = async (token, callback) => {
  jwt.verify(token, env.dev.jwtSecret, (err, decoded) => {
    if (err) {
      console.log(err);
      callback(false);
    }
    getGuestJoinSessionDB(decoded.data.guestId, (guest) => {
      guest[0].sessionEnd = decoded.data.sessionEnd;
      callback(guest);
    });
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
