const express = require('express');
const { sanitize, body, validationResult } = require('express-validator');
const guestsController = require('../controllers/guests');

const router = express.Router();

// API Guests routes
router.get('/guests', (req, res) => guestsController.getAll(req, res));
router.post('/guests', [
  body('room', 'Room number is not defined').isInt({ min: 201, max: 338 }),
  body(['first_name', 'last_name'], 'First Name or Last Name are not defined')
    .isAlpha()
    .optional(),
  sanitize(['first_name', 'last_name']).trim(),
  body('check_in_date', 'Check-in date is a required field')
    .exists()
    .isISO8601(),
  body('check_out_date', 'Error in parsing check-n or check-out dates')
    .isISO8601()
    .optional(),
],
(req, res) => {
  console.log(req.body.check_in_date, 'date received in router');
  const validationErros = validationResult(req);
  if (!validationErros.isEmpty()) {
    return res.status(422).json({ errors: validationErros.array() });
  }
  guestsController.insert(req, res);
});
router.put('/guests/:guest_id', (req, res) => guestsController.update(req, res));
router.delete('/guests/:guest_id', (req, res) => guestsController.delete(req, res));

// API Session Routes

module.exports = router;
