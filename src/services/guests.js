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
  selectSessionsDB,
  getSessionJoinGuestDB,
} = require('../db/sessionsDB');
const {
  logoutTokenDB,
  selectTokenDB,
} = require('../db/tokensDB');
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
    guestData.verfCode = hashVerifCode(verifCode);
    postGuestDB(guestData, sessionData, (guestPost) => {
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

const verifyGuest = async (pass, params, columns, callback) => {
  let appropGuests;
  let userIndex;
  try {
    await selectSessionsDB(params, columns, (guests) => {
      appropGuests = guests;
      appropGuests.map((row, i) => {
        if (verifyCode(pass, row.verf_code)) {
          userIndex = i;
        }
        if (userIndex) {
          // updateEmailPhone(phoneNumber, 'phone_number', appropGuests[userIndex]);
          // updateEmailPhone(email, 'email', appropGuests[userIndex]);
          getSessionJoinGuestDB(appropGuests[userIndex].session_id, (session) => {
            const sessionData = session[0];
            const iat = sessionData.createdAt;
            const expWithHours = datefns.addHours(iat, sessionData.sessionHour);
            const expWithMinutes = datefns.addMinutes(
              expWithHours,
              sessionData.sessionMinute,
            );
            const expUnixTime = datefns.getUnixTime(expWithMinutes);
            const user = {
              sessionId: sessionData.sessionId,
              guestId: sessionData.guestId,
              sessionEnd: expWithMinutes,
              firstName: sessionData.firstName,
              lastName: sessionData.lastName,
              pax: sessionData.pax,
              // roomNumber: sessionData.roomNumber,
              // checkinDate: sessionData.checkinDate,
              // checkoutDate: sessionData.checkoutDate,
              phoneNumber: sessionData.phoneNumber,
              email: sessionData.email,
            };
            const tokenSession = jwt.sign({
              data: user,
              exp: expUnixTime,
            },
            env.dev.jwtSecret);
            const tokenUser = jwt.sign({
              data: user,
            },
            env.dev.jwtSecret,
            {
              expiresIn: '24h',
            });
            callback({
              user,
              tokenSession,
              tokenUser,
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
      // TODO add cookie deletion + redux store reseting in frontend
    } else {
      selectTokenDB(token, (tokenVerified) => {
        if (tokenVerified) {
          console.log(decoded, 'decoded');
          getSessionJoinGuestDB(decoded.data.sessionId, (session) => {
            session[0].sessionEnd = decoded.data.sessionEnd;
            callback(session);
          });
        } else {
          callback(false);
        }
      });
    }
  });
};

const logoutGuest = async (token, callback) => {
  jwt.verify(token, env.dev.jwtSecret, (err, decoded) => {
    if (err) {
      console.log(err);
      callback(false);
    }
    logoutTokenDB(token, decoded, (logout) => {
      callback(logout);
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
  logoutGuest,
};
