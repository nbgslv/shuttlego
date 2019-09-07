const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  getVerifCode: () => Math.floor(1000 + Math.random() * 9000),
  hashVerifCode: (verifCode) => {
    let hashed;
    if (typeof verifCode !== 'string') verifCode = verifCode.toString();
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(verifCode, salt, (err, hash) => {
        if (err) {
          console.log(err);
          return err;
        }
        hashed = hash;
      });
    });
    return hashed;
  },
};
