const express = require('express');
const dbCont = require('../controllers/main');
const db = require('../db');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
router.get('/crud', (req, res) => dbCont.getTableData(req, res, db));
router.post('/crud', (req, res) => dbCont.postTableData(req, res, db));
router.put('/crud', (req, res) => dbCont.putTableData(req, res, db));
router.delete('/crud', (req, res) => dbCont.deleteTableData(req, res, db));

module.exports = router;
