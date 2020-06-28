const express = require('express');
const { allUsers } = require('../controllers/admin');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/users', allUsers);

router.post('/register', (req, res) => {
  const {
    room, first_name, last_name, check_in_date, check_out_date,
  } = req.body;
  const verif_code = Math.floor(1000 + Math.random() * 9000);
  dbconnect('users').insert({
    room,
    first_name,
    last_name,
    verif_code,
    check_in_date,
    check_out_date,
  });
});

module.exports = router;
