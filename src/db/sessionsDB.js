const dateFns = require('date-fns');
const db = require('./db');

const sessionCol = [
  { sessionId: 'sessions.session_id' },
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
  db('sessions')
    .insert(sessionData)
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
    shuttleDate,
    smallBags,
    mediumBags,
    largeBags,
    specialBags,
    specialBagsDesc,
    wakeupCall,
    wakeupTime,
    bbox,
    bboxNumber,
  } = sessionData;
  const data = {
    terminal,
    shuttle_date_time: dateFns.parse(`${dateFns.format(dateFns.parseISO(shuttleDate), 'dd/MM/yy')} 0${shuttleHour}:00`, 'dd/MM/yy HH:mm', new Date()),
    small_bags: smallBags,
    medium_bags: mediumBags,
    large_bags: largeBags,
    special_bag: specialBags,
    special_bag_desc: specialBagsDesc,
    wakeup_call: wakeupCall,
    wakeup_time: wakeupTime,
    bbox,
    bbox_number: bboxNumber,
    status: 'registered',
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
  console.log(newData, 'newData');
  newData.updated_at = new Date();
  db('sessions')
    .where({ session_id: sessionId })
    .update(newData)
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
