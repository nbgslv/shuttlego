const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const datefns = require('date-fns');
const env = require('../../config');
const {
  getAllSessions,
  getGuest,
  postGuest,
  patchGuest,
  deleteGuest,
  verifyGuest,
  authorizeGuest,
} = require('../services/Sessions');
// const postInsert = require('./postInsertGuest');

const allSessions = async (req, res, next) => {
  try {
    await getAllSessions((data) => {
      res
        .json(data);
    });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e });
  }
};

const session = async (req, res, next) => {
  const { sessionId } = req.body;
  try {
    const sessionData = await getSession(sessionId);
    res
      .status(200)
      .json(sessionData)
      .send();
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e })
      .send();
  }
};

const registerSession = async (req, res, next) => {
  const data = req.body;
  console.log(data, 'received in server');

  try {
    await postSession(data, (sessionData) => {
      res
        .status(200)
        .json(sessionData);
    });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e })
      .send();
  }
};

const updateSession = async (req, res, next) => {
  const { data } = req.body;
  const { session_id: sessionId } = data;
  console.log(req.body, 'received in server');

  try {
    await patchSession(data, sessionId, (updated) => {
      res
        .status(200)
        .json(updated);
    });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e });
  }
};

const removeSession = async (req, res, next) => {
  const { sessionId } = req.body;
  try {
    await deleteSession(sessionId, (deleted) => {
      console.log(deleted);
      if (deleted) {
        res
          .sendStatus(200);
      } else {
        res
          .sendStatus(400);
      }
    });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e })
      .send();
  }
};

module.exports = {
  allSessions,
  session,
  registerSession,
  updateSession,
  removeSession,
};
