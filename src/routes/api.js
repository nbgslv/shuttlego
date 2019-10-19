const express = require('express');
const { sanitize, body, validationResult } = require('express-validator');
const guestsController = require('../controllers/guests');
const {
  allGuests,
  registerGuest,
  updateGuest,
  removeGuest,
  verify,
  checkAuth,
} = require('../controllers/guests');
const {
  allSessions,
  registerSession,
  registerSessionByGuest,
  updateSession,
  removeSession,
} = require('../controllers/sessions');

const router = express.Router();

// API Guests routes
router.get('/guests', allGuests);

router.post('/guests', [
  body('room_number', 'Room number is not defined').isInt({ min: 201, max: 338 }),
  body(['first_name', 'last_name'], 'First Name or Last Name are not defined')
    .isAlpha()
    .optional(),
  sanitize(['first_name', 'last_name']).trim(),
  body('check_in_date', 'Check-in date is a required field')
    .exists(),
],
(req, res, next) => {
  const validationErros = validationResult(req);
  if (!validationErros.isEmpty()) {
    console.log(validationErros.array());
    return res.status(422).json({ errors: validationErros.array() });
  }
  registerGuest(req, res, next);
});

router.post('/guests/login', verify);

router.post('/guests/checkAuth', checkAuth);

router.put('/guests', updateGuest);

router.delete('/guests', removeGuest);

// API Sessions routes
router.get('/sessions', allSessions);

router.post('/sessions',
//   [
//   body('room_number', 'Room number is not defined').isInt({ min: 201, max: 338 }),
//   body(['first_name', 'last_name'], 'First Name or Last Name are not defined')
//     .isAlpha()
//     .optional(),
//   sanitize(['first_name', 'last_name']).trim(),
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

router.put('/sessions/guest',
//   [
//   body('room_number', 'Room number is not defined').isInt({ min: 201, max: 338 }),
//   body(['first_name', 'last_name'], 'First Name or Last Name are not defined')
//     .isAlpha()
//     .optional(),
//   sanitize(['first_name', 'last_name']).trim(),
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
