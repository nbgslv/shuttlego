const { getAllUsersDB, getUserPermissionsDB, getPermissionsDB } = require('../db/adminDB');

const getAllUsers = async (callback) => {
  try {
    return await getAllUsersDB((users) => {
      callback(users);
    });
  } catch (e) {
    throw new Error(e);
  }
};

const getUserPermissions = async (userId, callback) => {
  try {
    return await getUserPermissionsDB(userId, (permissions) => {
      callback(permissions);
    });
  } catch (e) {
    throw new Error(e);
  }
};

const getPermissions = async (callback) => {
  try {
    return await getPermissionsDB((callback) => {

    })
  }
}


module.exports = { getAllUsers, getUserPermissions };
