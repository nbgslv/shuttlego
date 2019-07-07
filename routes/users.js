var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  const { roomNumber, confCode, email, phoneNumber } = req.body;
  console.log(`room number: ${roomNumber}
  conf_code: ${confCode}
  email: ${email}
  phone_number: ${phoneNumber}`);
  res.send('success');
});

module.exports = router;
