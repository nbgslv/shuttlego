const { getAllUsersDB } = require('../db/adminDB');

const getAllUsers = async (callback) => {
  try {
    return await getAllUsersDB((users) => {
      callback(users);
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = { getAllUsers };
