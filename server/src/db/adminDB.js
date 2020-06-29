const db = require('./db');

const userCol = [
  { userId: 'users.user_id' },
  { userName: 'users.user_name' },
  { email: 'users.email' },
  { phoneNumber: 'users.phone_number' },
  { active: 'users.active' },
];

const getAllUsersDB = (callback) => {
  db
    .select(userCol)
    .from('users')
    .then(users => callback(users));
};

const getUserPermissionsDB = (userId, callback) => {
  db
    .select({
      permissionsId: 'user_permissions.user_permissions_id',
      userId: 'user_permissions.user_id',
      permissionId: 'user_permissions.permission_id',
      permissionName: 'permissions.permission_name',
      active: 'permissions.active',
    })
    .from('user_permissions')
    .join('permissions', 'user_permissions.permission_id', '=', 'permissions.permission_id')
    .then(permissions => callback(permissions));
};

const getPermissionsDB = (callback) => {
  db
    .select({
      permissionId: 'permissions.permission_id',
      permissionName: 'permissions.permission_name',
      active: 'permissions.active',
    })
    .from('permissions')
    .then(permissions => callback(permissions));
};

module.exports = { getAllUsersDB, getUserPermissionsDB, getPermissionsDB };
