const express = require('express');
const { check, body, validationResult } = require('express-validator');
const guestsController = require('../controllers/guests');
const {
  allGuests,
  registerGuest,
  updateGuest,
  removeGuest,
  verifyGuest,
  checkAuthUser,
  logOut,
  resetGuest,
} = require('../controllers/guests');
const {
  allSessions,
  sessionByGuest,
  registerSession,
  registerSessionByGuest,
  updateSession,
  removeSession,
  verifySession,
  checkAuthSession,
} = require('../controllers/sessions');

const router = express.Router();

// API Guests routes
router.get('/guests', allGuests);

router.post('/guests', [
  body('roomNumber', 'Room number is not defined').isInt({ min: 201, max: 338 }),
  body(['firstName', 'lastName'], 'First Name or Last Name are not defined')
    .isAlpha()
    .optional(),
  check(['firstName', 'lastName']).trim(),
  body('checkinDate', 'Check-in date is a required field')
    .exists(),
],
(req, res, next) => {
  console.log(req.body, 'received in server');
  const validationErros = validationResult(req);
  if (!validationErros.isEmpty()) {
    console.log(validationErros.array());
    return res.status(422).json({ errors: validationErros.array() });
  }
  registerGuest(req, res, next);
});

router.post('/guests/login', verifyGuest);

router.post('/guests/checkAuthUser', checkAuthUser);

router.post('/guests/logout', logOut);

router.post('/guests/reset', resetGuest);

router.put('/guests', updateGuest);

router.delete('/guests', removeGuest);

// API Sessions routes
router.get('/sessions', allSessions);

router.post('/sessions/login', verifySession);

router.post('/sessions/checkAuthSession', checkAuthSession);

router.post('/sessions',
//   [
//   body('room_number', 'Room number is not defined').isInt({ min: 201, max: 338 }),
//   body(['first_name', 'last_name'], 'First Name or Last Name are not defined')
//     .isAlpha()
//     .optional(),
//   check(['first_name', 'last_name']).trim(),
//   body('check_in_date', 'Check-in date is a required field')
//     .exists(),
// ],
  (req, res, next) => {
    // const validationErros = validationResult(req);
    // if (!validationErros.isEmpty()) {
    //   console.log(validationErros.array());
    //   return res.status(422).json({ errors: validationErros.array() });
    // }
    registerSession(req, res, next);
  });

router.post('/sessions/guest', sessionByGuest);

router.put('/sessions/guest',
//   [
//   body('room_number', 'Room number is not defined').isInt({ min: 201, max: 338 }),
//   body(['first_name', 'last_name'], 'First Name or Last Name are not defined')
//     .isAlpha()
//     .optional(),
//   check(['first_name', 'last_name']).trim(),
//   body('check_in_date', 'Check-in date is a required field')
//     .exists(),
// ],
  (req, res, next) => {
    // const validationErros = validationResult(req);
    // if (!validationErros.isEmpty()) {
    //   console.log(validationErros.array());
    //   return res.status(422).json({ errors: validationErros.array() });
    // }
    registerSessionByGuest(req, res, next);
  });

router.put('/sessions', updateSession);

router.delete('/sessions', removeSession);

module.exports = router;
