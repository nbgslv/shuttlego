const { getAllUsers } = require('../services/admin');

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

module.exports = { allUsers };
