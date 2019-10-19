const dateFns = require('date-fns');
const db = require('./db');

const getAllSessionsDB = (callback) => {
  db
    .select('*')
    .from('sessions')
    .then((sessions) => {
      callback(sessions);
    });
};

const getSessionDB = (sessionId, callback) => {
  db
    .select('*')
    .from('sessions')
    .where({ session_id: sessionId })
    .then((session) => {
      callback(session);
    });
};

const getSessionByGuestDB = (guestId, callback) => {
  db
    .select('*')
    .from('sessions')
    .where({ guest_id: guestId })
    .then((session) => {
      callback(session);
    });
};

const postSessionDB = (sessionData, callback) => {
  db('sessions')
    .insert(sessionData)
    .returning('*')
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
    .returning('*')
    .then((session) => {
      callback(session);
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const patchSessionDB = (newData, sessionId, callback = null) => {
  newData.updated_at = new Date();
  db('sessions')
    .where({ session_id: sessionId })
    .update(newData)
    .returning('*')
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
    .returning('*')
    .then((items) => {
      callback(items);
    });
};

module.exports = {
  getAllSessionsDB,
  getSessionDB,
  getSessionByGuestDB,
  postSessionDB,
  postPatchSessionByGuestDB,
  patchSessionDB,
  deleteSessionDB,
  selectSessionsDB,
};
