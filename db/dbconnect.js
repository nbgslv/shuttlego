const knex = require('knex');

const dbconnect = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '1234',
    database: 'postgres',
  },
});

module.exports = dbconnect;
