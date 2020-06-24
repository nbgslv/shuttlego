const bcrypt = require('bcrypt');

const saltRounds = 10;

const getVerifCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const hashVerifCode = (verifCode) => {
  if (typeof verifCode !== 'string') verifCode = verifCode.toString();
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(verifCode, salt);
};

const verifyCode = (plainPass, hash) => bcrypt.compareSync(plainPass, hash);

module.exports = {
  getVerifCode,
  hashVerifCode,
  verifyCode,
};
