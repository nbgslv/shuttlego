const express = require('express');
const router = express.Router();
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'shuttlego',
    password : '1234',
    database : 'shuttlego'
  },
});

router.post('/register', function(req, res) {
  const { room, first_name, last_name, check_in_date, check_out_date } = req.body;
  const verif_code = Math.floor(1000 + Math.random() * 9000);
  db('users').insert({
    room,
    first_name,
    last_name,
    verif_code,
    create_date: new Date(),
    check_in_date,
    check_out_date,
  }).then(console.log);
  res.send('success')
});

module.exports = router;
