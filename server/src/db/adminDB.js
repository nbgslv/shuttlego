const db = require('./db');

const userCol = [
  { userId: 'users.user_id' },
  { userName: 'users.user_name' },
  { email: 'users.email' },
  { phoneNumber: 'users.phone_number' },
  { active: 'users.active' },
  { permissions: 'users.permissions' },
];

const getAllUsersDB = callback => {
  db
    .select(userCol)
    .from('users')
    .then(users => callback(users));
};

module.exports = { getAllUsersDB };
