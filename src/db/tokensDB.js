const db = require('./db');

const logoutTokenDB = (token, decoded, callback) => db('jwt_blacklist')
  .insert({
    token,
    exp: decoded.data.sessionEnd,
  })
  .returning('token_id')
  .asCallback((err, tokenId) => {
    if (err) console.log(err);
    console.log(tokenId);
    if (tokenId.length) callback(true);
    else callback(false);
  })
  .catch(console.log);

const selectTokenDB = (token, callback) => db
  .select('token')
  .from('jwt_blacklist')
  .where({ token })
  .asCallback((err, result) => {
    if (err) console.log(err);
    console.log(result);
    if (result.length) callback(false);
    else callback(true);
  })
  .catch(console.log);

module.exports = {
  logoutTokenDB,
  selectTokenDB,
};
