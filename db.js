const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'shuttlego',
    password: '1234',
    database: 'shuttlego',
  },
});

module.exports = db;
