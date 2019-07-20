const db = require('../db/db');

module.exports = {
  insertPostGuest: (guestId, seesionTime) => {
    db('session').insert({
      session_time: seesionTime,
      guest_id: guestId,
    })
      .returning('session_id')
      .then(sessionId => sessionId)
      .catch(err => ({ dbError: err }));
  },
};
