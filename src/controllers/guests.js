const {
  getAllGuests,
  getGuest,
  postGuest,
  patchGuest,
  deleteGuest,
  verifyGuest,
  authorizeGuest,
} = require('../services/guests');
// const postInsert = require('./postInsertGuest');

const allGuests = async (req, res, next) => {
  try {
    await getAllGuests((data) => {
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

const guest = async (req, res, next) => {
  const { guestId } = req.body;
  try {
    const guestData = await getGuest(guestId);
    res
      .status(200)
      .json(guestData)
      .send();
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e })
      .send();
  }
};

const registerGuest = async (req, res, next) => {
  const data = req.body;
  console.log(req.body, 'received in server');
  const {
    firstName,
    lastName,
    roomNumber,
    checkinDate,
    checkoutDate,
    pax,
    email,
    phoneNumber,
    sessionHour,
    sessionMinute,
  } = data;
  const guestData = {
    firstName,
    lastName,
    email,
    phoneNumber,
  };
  const sessionData = {
    roomNumber,
    checkinDate,
    checkoutDate,
    pax,
    sessionHour,
    sessionMinute,
  };
  try {
    await postGuest(guestData, sessionData, (guestPost) => {
      console.log(guestPost, 'controllers');
      res
        .status(200)
        .json(guestPost);
    });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e })
      .send();
  }
};

const updateGuest = async (req, res, next) => {
  const { data } = req.body;
  const { guestId } = data;
  console.log(req.body, 'received in server');
  const {
    firstName,
    lastName,
    roomNumber,
    checkinDate,
    checkoutDate,
    pax,
    email,
    phoneNumber,
    sessionHour,
    sessionMinute,
  } = data;
  const guestData = {
    firstName,
    lastName,
    email,
    phoneNumber,
  };
  const sessionData = {
    roomNumber,
    checkinDate,
    checkoutDate,
    pax,
    sessionHour,
    sessionMinute,
  };
  try {
    await patchGuest(guestData, sessionData, guestId, (updated) => {
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

const removeGuest = async (req, res, next) => {
  const { guestId } = req.body;
  try {
    await deleteGuest(guestId, (deleted) => {
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

const verify = async (req, res, next) => {
  const {
    roomNumber,
    confCode,
    email,
    phoneNumber,
  } = req.body;
  const params = {
    room_number: roomNumber,
  };
  const columns = [
    'room_number',
    'verf_code',
    'guest_id',
    'email',
    'phone_number',
  ];
  try {
    await verifyGuest(confCode, phoneNumber, email, params, columns, (loggedInGuest) => {
      const { user: guestData, token } = loggedInGuest;
      res
        .cookie('token', token)
        .status(200)
        .json(guestData);
    });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e });
  }
};

const checkAuth = async (req, res, next) => {
  const token = req.body.token
    || req.query.token
    || req.headers['x-access-token']
    || req.cookies.token;
  if (!token) {
    res
      .status(401)
      .json({ authorized: false })
      .send();
  } else {
    try {
      await authorizeGuest(token, (guestData) => {
        if (guestData) {
          res
            .status(200)
            .json(guestData)
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
  allGuests,
  guest,
  registerGuest,
  updateGuest,
  removeGuest,
  verify,
  checkAuth,
};
