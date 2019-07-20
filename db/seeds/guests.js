const guestsData = require('./data/guests');
const sessionData = require('./data/sessions');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE guests RESTART IDENTITY CASCADE;')
    .then(() => knex.raw('TRUNCATE TABLE sessions RESTART IDENTITY CASCADE;'))
    .then(() => knex('guests').insert(guestsData))
    .then(() => knex('sessions').insert(sessionData));
};
