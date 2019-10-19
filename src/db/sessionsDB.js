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

const patchSessionDB = (newData, sessionId, callback = null) => {
  db('sessions')
    .where({ session_id: sessionId })
    .update(newData)
    .returning('*')
    .then((session) => {
      callback(session);
    })
    .catch((err) => {
      trx.rollback();
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
  postSessionDB,
  patchSessionDB,
  deleteSessionDB,
  selectSessionsDB,
};
