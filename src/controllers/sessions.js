const {
  getAllSessions,
  getSession,
  getSessionByGuest,
  postSession,
  postSessionByGuest,
  patchSession,
  deleteSession,
  verifySessionService,
  authorizeSession,
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

const sessionByGuest = async (req, res, next) => {
  const { guestId } = req.body;
  try {
    await getSessionByGuest(guestId, (session) => {
      res
        .status(200)
        .json(session);
    });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e });
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

const registerSessionByGuest = async (req, res, next) => {
  const data = req.body;
  console.log(data, 'received in server');
  const { guestId } = req.body;
  delete data.guestId;
  try {
    await postSessionByGuest(data, guestId, (sessionData) => {
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
  console.log(req.body, 'received in server');
  const data = req.body;
  const { sessionId } = data;
  delete data.sessionId;

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

const verifySession = async (req, res, next) => {
  const { guestId } = req.body;
  try {
    await verifySessionService(guestId, (loggedSession) => {
      const { session: sessionData, tokenSession, sessionEnd } = loggedSession;
      sessionData.sessionEnd = sessionEnd;
      res
        .cookie('tokenSession', tokenSession)
        .status(200)
        .json(sessionData);
      console.log(res, 'res');
    });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e });
  }
};

const checkAuthSession = async (req, res, next) => {
  const tokenSession = req.body.token
    || req.query.tokenSession
    || req.headers['x-access-tokenSession']
    || req.cookies.tokenSession;
  if (!tokenSession) {
    console.log('no token');
    res
      .status(401)
      .json({ authorized: false });
  } else {
    try {
      await authorizeSession(tokenSession, (sessionData) => {
        if (sessionData) {
          res
            .status(200)
            .json(sessionData)
            .send();
        } else {
          res
            .sendStatus(401);
        }
      });
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ error: e });
    }
  }
};

module.exports = {
  allSessions,
  session,
  sessionByGuest,
  registerSession,
  registerSessionByGuest,
  updateSession,
  removeSession,
  verifySession,
  checkAuthSession,
};
