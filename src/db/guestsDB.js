const db = require('./db');

const guestsCol = [
  { guestId: 'guests.guest_id' },
  { firstName: 'guests.first_name' },
  { lastName: 'guests.last_name' },
  'guests.email',
  { phoneNumber: 'guests.phone_number' },
  { createdAt: 'guests.created_at' },
  { updatedAt: 'guests.updated_at' },
];
const sessionsCol = [
  { sessionId: 'sessions.session_id' },
  { guestId: 'sessions.guest_id' },
  { roomNumber: 'sessions.room_number' },
  { checkinDate: 'sessions.check_in_date' },
  { checkoutDate: 'sessions.check_out_date' },
  { sessionHour: 'sessions.session_time_hour' },
  { sessionMinute: 'sessions.session_time_minute' },
  { shuttleDateTime: 'sessions.shuttle_date_time' },
  'sessions.terminal',
  { largeBags: 'sessions.large_bags' },
  { mediumBags: 'sessions.medium_bags' },
  { smallBags: 'sessions.small_bags' },
  { specialBag: 'sessions.special_bag' },
  { specialBagDesc: 'sessions.special_bag_desc' },
  { wakeupCall: 'sessions.wakeup_call' },
  { wakeupTime: 'sessions.wakeup_time' },
  'sessions.bbox',
  { bboxNumber: 'sessions.bbox_number' },
  'sessions.status',
  'sessions.pax',
];

const getAllGuestsDB = (callback) => {
  db
    .select(guestsCol)
    .from('guests')
    .then((guests) => {
      callback(guests);
    });
};

const getGuestDB = (guestId, callback) => {
  db
    .select(guestsCol)
    .from('guests')
    .where({ guest_id: guestId })
    .then((guest) => {
      callback(guest);
    });
};

const getGuestsJoinSessionDB = (callback) => {
  db
    .select([...guestsCol, ...sessionsCol])
    .from('guests')
    .join('sessions', (queryBuilder) => {
      queryBuilder.on('guests.guest_id', '=', 'sessions.guest_id');
    })
    .then((guests) => {
      callback(guests);
    });
};

const getGuestJoinSessionDB = (guestId, callback) => {
  db
    .select([...guestsCol, ...sessionsCol])
    .from('guests')
    .join('sessions', (queryBuilder) => {
      queryBuilder.on('guests.guest_id', '=', 'sessions.guest_id')
        .onIn('guests.guest_id', [guestId]);
    })
    .then((guest) => {
      console.log(guest, 'getGuestJoinSessionDB');
      callback(guest);
    })
    .catch((err) => {
      console.log(err.messages);
      throw new Error(err);
    });
};

const postGuestDB = (guestData, sessionData, callback) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
  } = guestData;
  const guestDataDb = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phoneNumber,
  };
  const {
    roomNumber,
    checkinDate,
    checkoutDate,
    pax,
    sessionHour,
    sessionMinute,
    verfCode,
  } = sessionData;
  const sessionDataDb = {
    room_number: roomNumber,
    check_in_date: checkinDate,
    check_out_date: checkoutDate,
    pax,
    session_time_hour: sessionHour,
    session_time_minute: sessionMinute,
    verf_code: verfCode,
  };
  db
    .transaction(
      (trx => db('guests')
        .transacting(trx)
        .insert(guestDataDb)
        .returning(guestsCol)
        .then((item) => {
          console.log(item, 'item');
          sessionDataDb.guest_id = item[0].guestId;
          return db('sessions')
            .transacting(trx)
            .insert(sessionDataDb)
            .returning(sessionsCol)
            .catch((err) => {
              console.log(err);
            });
        })
        .then(trx.commit)
        .catch((err) => {
          trx.rollback();
          console.log(err);
        })),
    )
    .then(session => getGuestJoinSessionDB(session[0].guestId, (guestPost) => {
      console.log(session, 'after insertion');
      callback(guestPost);
    }))
    .catch((err) => {
      console.log(err);
    });
};

const patchGuestDB = (
  guestData,
  sessionData,
  guestId,
  callback = null,
) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
  } = guestData;
  const guestDataDb = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phoneNumber,
  };
  const {
    roomNumber,
    checkinDate,
    checkoutDate,
    pax,
    sessionHour,
    sessionMinute,
  } = sessionData;
  const sessionDataDb = {
    room_number: roomNumber,
    check_in_date: checkinDate,
    check_out_date: checkoutDate,
    pax,
    session_time_hour: sessionHour,
    session_time_minute: sessionMinute,
  };
  guestData.updated_at = new Date();
  sessionData.updated_at = new Date();
  db.transaction(
    trx => db('guests')
      .transacting(trx)
      .where({ guest_id: guestId })
      .update(guestDataDb)
      .then(() => db('sessions')
        .transacting(trx)
        .where({ guest_id: guestId })
        .update(sessionDataDb)
        .catch((err) => {
          console.log(err.message);
        }))
      .then(trx.commit)
      .catch((err) => {
        trx.rollback();
        console.log(err);
        return err;
      }),
  )
    .then(() => getGuestJoinSessionDB(guestId, (guest) => {
      console.log(guest, 'after update');
      if (callback !== null) callback(guest);
    }))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const deleteGuestDB = (guestId, callback) => {
  db.transaction((trx) => {
    db('sessions')
      .transacting(trx)
      .where({ guest_id: guestId })
      .del()
      .then(() => db('guests')
        .transacting(trx)
        .where({ guest_id: guestId })
        .del())
      .then(trx.commit)
      .catch((err) => {
        trx.rollback();
        console.log(err);
        return err;
      });
  })
    .then(() => callback(true))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const selectGuestsDB = (params, columns, callback) => {
  db
    .select(columns)
    .from('guests')
    .where(params)
    .returning(guestsCol)
    .then((items) => {
      callback(items);
    });
};

const selectGuestsVerifyDB = (params, columns, callback) => {
  db
    .select(columns)
    .from('guests')
    .where(params)
    .returning(guestsCol)
    .then((items) => {
      callback(items);
    });
};

module.exports = {
  getAllGuestsDB,
  getGuestsJoinSessionDB,
  getGuestJoinSessionDB,
  getGuestDB,
  postGuestDB,
  patchGuestDB,
  deleteGuestDB,
  selectGuestsDB,
};
