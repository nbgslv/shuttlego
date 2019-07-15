const express = require('express');
const { parseFromTimeZone } = require('date-fns-timezone');
const { sanitize, check, body, validationResult } = require('express-validator');
const dbCont = require('../controllers/main');
const db = require('../db/dbconnect');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
router.get('/crud/:table', (req, res) => dbCont.getTableData(req, res, db));
router.get('/crud/:table/:fields', (req, res) => dbCont.getTableDataFields(req, res, db));
router.post('/crud', (req, res) => dbCont.postTableData(req, res, db));
router.post('/crud/guests', [
  body('room', 'Room number is not defined').isInt({ min: 201, max: 338 }),
  body(['first_name', 'last_name'], 'First Name or Last Name are not defined').isAlpha(),
  body(['check_in_date', 'check_out_date'], 'Error in parsing check-n or check-out dates').isISO8601(),
  sanitize(['first_name', 'last_name']).trim(),
],
(req, res) => {
  const validationErros = validationResult(req);
  console.log(req.body);
  console.log(validationErros);
  console.log(!validationErros.isEmpty());
  if (!validationErros.isEmpty()) {
    let { check_in_date: checkInDate, check_out_date: checkoutDate } = req.body;
    console.log(checkInDate);
    console.log(checkoutDate);
    if (checkInDate === undefined || validationErros.findIndex(err => err.param === 'check_in_date')) checkInDate = new Date();
    checkInDate = parseFromTimeZone(checkInDate);
    if (checkoutDate === undefined || validationErros.findIndex(err => err.param === 'check_out_date')) checkoutDate = new Date();
    checkoutDate = parseFromTimeZone(checkoutDate);
  }
  dbCont.postGuest(req, res, db);
});
router.put('/crud', (req, res) => dbCont.putTableData(req, res, db));
router.delete('/crud/:table/:id', (req, res) => dbCont.deleteTableData(req, res, db));

module.exports = router;
