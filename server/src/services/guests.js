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
  resetVerifDB,
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

const verifyGuestService = async (pass, roomNumber, callback) => {
  try {
    const params = {
      room_number: roomNumber,
    };
    const columns = [
      'guest_id',
    ];
    await selectSessionsDB(params, columns, (guests) => {
      guests.forEach((guest) => {
        const guestParams = {
          guest_id: guest.guest_id,
        };
        const guestColumns = [
          'verf_code',
          'guest_id',
        ];
        selectGuestsDB(guestParams, guestColumns, (guest) => {
          if (verifyCode(pass, guest[0].verf_code)) {
            const userIndex = guest[0].guest_id;
            // updateEmailPhone(phoneNumber, 'phone_number', appropGuests[userIndex]);
            // updateEmailPhone(email, 'email', appropGuests[userIndex]);
            getGuestDB(userIndex, (guest) => {
              const guestData = guest[0];
              const user = {
                guestId: guestData.guestId,
                firstName: guestData.firstName,
                lastName: guestData.lastName,
                // roomNumber: sessionData.roomNumber,
                // checkinDate: sessionData.checkinDate,
                // checkoutDate: sessionData.checkoutDate,
                phoneNumber: guestData.phoneNumber,
                email: guestData.email,
              };
              const tokenUser = jwt.sign({
                data: user,
              },
              env.dev.jwtSecret,
              {
                expiresIn: '24h',
              });
              console.log(user);
              console.log(tokenUser);
              callback({
                user,
                tokenUser,
              });
            });
          }
        });
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
          getGuestDB(decoded.data.guestId, (guest) => {
            // session[0].sessionEnd = decoded.data.sessionEnd;
            callback(guest);
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

const resetVerif = (roomNumber, email, callback) => {
  const verifCode = getVerifCode();
  console.log(verifCode, 'loginCode'); // DELETE BEFORE PRODUCTION
  const newVerfCode = hashVerifCode(verifCode);
  resetVerifDB(roomNumber, email, newVerfCode, (guest) => {
    callback(guest || false);
  });
};

module.exports = {
  getAllGuests,
  getGuest,
  postGuest,
  patchGuest,
  deleteGuest,
  verifyGuestService,
  authorizeGuest,
  logoutGuest,
  resetVerif,
};
