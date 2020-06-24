const guestsData = require('./data/guests');
const sessionData = require('./data/sessions');
const configData = require('./data/configData');
const permissionsData = require('./data/permissionsData');
const requestsData = require('./data/requestsData');
const messageData = require('./data/messageData');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE guests RESTART IDENTITY CASCADE;')
    .then(() => knex.raw('TRUNCATE TABLE sessions RESTART IDENTITY CASCADE;'))
    .then(() => knex.raw('TRUNCATE TABLE admin_config RESTART IDENTITY CASCADE;'))
    .then(() => knex.raw('TRUNCATE TABLE notifications RESTART IDENTITY CASCADE;'))
    .then(() => knex.raw('TRUNCATE TABLE permissions RESTART IDENTITY CASCADE;'))
    .then(() => knex.raw('TRUNCATE TABLE requests RESTART IDENTITY CASCADE;'))
    .then(() => knex.raw('TRUNCATE TABLE messages RESTART IDENTITY CASCADE;'))
    .then(() => knex.raw('TRUNCATE TABLE reports RESTART IDENTITY CASCADE;'))
    .then(() => knex.raw('TRUNCATE TABLE reports_delivery_list RESTART IDENTITY CASCADE;'))
    .then(() => knex.raw('TRUNCATE TABLE blacklist RESTART IDENTITY CASCADE;'))
    .then(() => knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;'))
    .then(() => knex('guests').insert(guestsData))
    .then(() => knex('sessions').insert(sessionData))
    .then(() => knex('admin_config').insert(configData))
    .then(() => knex('permissions').insert(permissionsData))
    .then(() => knex('requests').insert(requestsData))
    .then(() => knex('messages').insert(messageData))
};
