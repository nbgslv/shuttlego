var express = require('express');
var router = express.Router();
const guests = require('../controllers/guests');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res, next) => guests.verify(req, res));

module.exports = router;
