const { getAllUsers, getUserPermissions } = require('../services/admin');

const allUsers = async (req, res, next) => {
  try {
    await getAllUsers((data) => {
      res
        .json(data);
    });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e });
  }
};

const userPermissions = async (req, res, next) => {
  const { userId } = req.body;
  try {
    await getUserPermissions(userId, (permissions) => {
      res
        .json(permissions);
    });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ error: e });
  }
};

module.exports = { allUsers, userPermissions };
