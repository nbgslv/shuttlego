const express = require('express');
const db = require('../db');
const dbCont = require('../controllers/main');

const router = express.Router();

router.get('/crud', (req, res) => dbCont.getTableData(req, res, db));
router.post('/crud', (req, res) => dbCont.postTableData(req, res, db));
router.put('/crud', (req, res) => dbCont.putTableData(req, res, db));
router.delete('/crud', (req, res) => dbCont.deleteTableData(req, res, db));

module.exports = router;
