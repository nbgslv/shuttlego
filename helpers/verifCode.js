const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  getVerifCode: () => Math.floor(1000 + Math.random() * 9000),
  hashVerifCode: (verifCode) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(verifCode, salt, (err, hash) => {
        if (err) return err;
        return hash;
      });
    });
  },
};
