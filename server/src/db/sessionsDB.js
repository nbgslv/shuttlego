const dateFns = require('date-fns');
const db = require('./db');

const sessionCol = [
  { sessionId: 'sessions.session_id' },
  { roomNumber: 'sessions.room_number' },
  { checkinDate: 'sessions.check_in_date' },
  { checkoutDate: 'sessions.check_out_date' },
  { sessionHour: 'sessions.session_time_hour' },
  { sessionMinute: 'sessions.session_time_minute' },
  { shuttleDate: 'sessions.shuttle_date' },
  { shuttleTimeHour: 'sessions.shuttle_time_hour' },
  { shuttleTimeMinute: 'sessions.shuttle_time_minute' },
  'sessions.terminal',
  { largeBags: 'sessions.large_bags' },
  { mediumBags: 'sessions.medium_bags' },
  { smallBags: 'sessions.small_bags' },
  { specialBag: 'sessions.special_bag' },
  { specialBagDesc: 'sessions.special_bag_desc' },
  { wakeupCall: 'sessions.wakeup_call' },
  { wakeupTimeDate: 'sessions.wakeup_time_date' },
  { wakeupTimeHour: 'sessions.wakeup_time_hour' },
  { wakeupTimeMinute: 'sessions.wakeup_time_minute' },
  'sessions.bbox',
  { bboxNumber: 'sessions.bbox_number' },
  { createdAt: 'sessions.created_at' },
  'sessions.status',
  'sessions.pax',
];
const guestsCol = [
  { guestId: 'guests.guest_id' },
  { firstName: 'guests.first_name' },
  { lastName: 'guests.last_name' },
  'guests.email',
  { phoneNumber: 'guests.phone_number' },
  { createdAt: 'guests.created_at' },
  { updatedAt: 'guests.updated_at' },
];

const getAllSessionsDB = (callback) => {
  db
    .select(sessionCol)
    .from('sessions')
    .then((sessions) => {
      callback(sessions);
    });
};

const getSessionDB = (sessionId, callback) => {
  db
    .select(sessionCol)
    .from('sessions')
    .where({ session_id: sessionId })
    .then((session) => {
      callback(session);
    });
};

const getSessionByGuestDB = (guestId, callback) => {
  db
    .select(sessionCol)
    .from('sessions')
    .where({ guest_id: guestId })
    .then((session) => {
      callback(session);
    });
};

const getSessionsJoinGuestDB = (callback) => {
  db
    .select([...guestsCol, ...sessionCol])
    .from('sessions')
    .join('guests', (queryBuilder) => {
      queryBuilder.on('guests.guest_id', '=', 'sessions.guest_id');
    })
    .then((guests) => {
      callback(guests);
    });
};

const getSessionJoinGuestDB = (sessionId, callback) => {
  db
    .select([...guestsCol, ...sessionCol])
    .from('sessions')
    .join('guests', (queryBuilder) => {
      queryBuilder.on('guests.guest_id', '=', 'sessions.guest_id')
        .onIn('sessions.session_id', [sessionId]);
    })
    .then((session) => {
      console.log(session, 'getGuestJoinSessionDB');
      callback(session);
    })
    .catch((err) => {
      console.log(err.messages);
      throw new Error(err);
    });
};

const postSessionDB = (sessionData, callback) => {
  const {
    guestId,
    roomNumber,
    pax,
    checkinDate,
    checkoutDate,
    sessionHour,
    sessionMinute,
  } = sessionData;
  const data = {
    guest_id: guestId,
    room_number: roomNumber,
    pax,
    check_in_date: checkinDate,
    check_out_date: checkoutDate,
    session_time_hour: sessionHour,
    session_time_minute: sessionMinute,
  };
  db('sessions')
    .insert(data)
    .returning(sessionCol)
    .then((session) => {
      callback(session);
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const postPatchSessionByGuestDB = (sessionData, guestId, callback) => {
  const {
    terminal,
    shuttleHour,
    shuttleMinute,
    shuttleDate,
    smallBags,
    mediumBags,
    largeBags,
    specialBags,
    specialBagsDesc,
    wakeupCall,
    wakeupDate,
    wakeupHour,
    wakeupMinute,
    bbox,
    bboxNumber,
    status,
  } = sessionData;
  const data = {
    terminal,
    shuttle_date: shuttleDate,
    shuttle_time_hour: shuttleHour,
    shuttle_time_minute: shuttleMinute,
    small_bags: smallBags,
    medium_bags: mediumBags,
    large_bags: largeBags,
    special_bag: specialBags,
    special_bag_desc: specialBagsDesc,
    wakeup_call: wakeupCall,
    wakeup_time_date: wakeupDate,
    wakeup_time_hour: wakeupHour,
    wakeup_time_minute: wakeupMinute,
    bbox,
    bbox_number: bboxNumber,
    status: status || 'registered',
    updated_at: new Date(),
  };
  db('sessions')
    .where({ guest_id: guestId })
    .update(data)
    .returning(sessionCol)
    .then((session) => {
      callback(session);
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const patchSessionDB = (newData, sessionId, callback = null) => {
  const {
    bbox,
    bboxNumber,
    checkinDate,
    checkoutDate,
    largeBags,
    mediumBags,
    smallBags,
    specialBag,
    specialBagDesc,
    pax,
    roomNumber,
    sessionHour,
    sessionMinute,
    shuttleHour,
    shuttleMinute,
    shuttleDate,
    terminal,
    wakeupHour,
    wakeupMinute,
    wakeupDate,
    status,
  } = newData;
  const data = {
    bbox,
    bbox_number: bboxNumber,
    check_in_date: checkinDate,
    check_out_date: checkoutDate,
    large_bags: largeBags,
    medium_bags: mediumBags,
    small_bags: smallBags,
    special_bag: specialBag,
    special_bag_desc: specialBagDesc,
    pax,
    room_number: roomNumber,
    session_time_hour: sessionHour,
    session_time_minute: sessionMinute,
    shuttle_time_hour: shuttleHour,
    shuttle_time_minute: shuttleMinute,
    shuttle_date: shuttleDate,
    terminal,
    wakeup_time_hour: wakeupHour,
    wakeup_time_minute: wakeupMinute,
    wakeup_time_date: wakeupDate,
    status,
  };
  console.log(newData, 'db');
  newData.updated_at = new Date();
  db('sessions')
    .where({ session_id: sessionId })
    .update(data)
    .returning(sessionCol)
    .then((session) => {
      callback(session);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const deleteSessionDB = (sessionId, callback) => {
  db('sessions')
    .where({ session_id: sessionId })
    .del()
    .then(() => callback(true))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const selectSessionsDB = (params, columns, callback) => {
  db
    .select(columns)
    .from('sessions')
    .where(params)
    .returning(sessionCol)
    .then((items) => {
      callback(items);
    });
};

module.exports = {
  getAllSessionsDB,
  getSessionDB,
  getSessionByGuestDB,
  getSessionsJoinGuestDB,
  getSessionJoinGuestDB,
  postSessionDB,
  postPatchSessionByGuestDB,
  patchSessionDB,
  deleteSessionDB,
  selectSessionsDB,
};
