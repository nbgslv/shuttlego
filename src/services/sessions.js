const {
  getAllSessionsDB,
  getSessionDB,
  postPatchSessionByGuestDB,
  postSessionDB,
  patchSessionDB,
  deleteSessionDB,
} = require('../db/sessionsDB');

const getAllSessions = async (callback) => {
  try {
    return await getAllSessionsDB((sessions) => {
      callback(sessions);
    });
  } catch (e) {
    throw new Error(e);
  }
};

const getSession = async (sessionId) => {
  try {
    return await getSessionDB(sessionId);
  } catch (e) {
    throw new Error(e.messages);
  }
};

const postSession = async (data, callback) => {
  try {
    const guestData = data;
    console.log(data);
    postSessionDB(guestData, (session) => {
      callback(session);
    });
  } catch (e) {
    throw new Error(e.messages);
  }
};

const postSessionByGuest = async (data, guestId, callback) => {
  try {
    const guestData = data;
    console.log(data);
    postPatchSessionByGuestDB(guestData, guestId, (session) => {
      callback(session);
    });
  } catch (e) {
    console.log(e);
  }
};

const patchSession = async (data, sessionId, callback) => {
  try {
    return await patchSessionDB(data, sessionId, (session) => {
      callback(session);
    });
  } catch (e) {
    throw new Error(e.messages);
  }
};

const deleteSession = async (sessionId, callback) => {
  try {
    return await deleteSessionDB(sessionId, (deleted) => {
      callback(deleted);
    });
  } catch (e) {
    throw new Error(e.messages);
  }
};

module.exports = {
  getAllSessions,
  getSession,
  postSessionByGuest,
  postSession,
  patchSession,
  deleteSession,
};
