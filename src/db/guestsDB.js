const db = require('./db');

const getAllGuestsDB = (callback) => {
  db
    .select('*')
    .from('guests')
    .then((guests) => {
      callback(guests);
    });
};

const getGuestDB = (guestId, callback) => {
  db
    .select('*')
    .from('guests')
    .where({ guest_id: guestId })
    .then((guest) => {
      callback(guest);
    });
};

const getGuestsJoinSessionDB = (callback) => {
  db
    .select('*')
    .from('guests')
    .join('sessions', (queryBuilder) => {
      queryBuilder.on('guests.guest_id', '=', 'sessions.guest_id');
    })
    .then((guests) => {
      callback(guests);
    });
};

const getGuestJoinSessionDB = (guestId, callback) => {
  db
    .select('*')
    .from('guests')
    .join('sessions', (queryBuilder) => {
      queryBuilder.on('guests.guest_id', '=', 'sessions.guest_id')
        .onIn('guests.guest_id', [guestId]);
    })
    .then((guest) => {
      callback(guest);
    })
    .catch((err) => {
      console.log(err.messages);
      throw new Error(err);
    });
};

const postGuestDB = (guestData, sessionHour, sessionMinute, callback) => {
  db
    .transaction(
      (trx => db('guests')
        .transacting(trx)
        .insert(guestData)
        .returning('*')
        .then((item) => {
          console.log(item);
          return db('sessions')
            .transacting(trx)
            .insert({
              session_time_hour: sessionHour,
              session_time_minute: sessionMinute,
              guest_id: item[0].guest_id,
            })
            .returning('*')
            .catch((err) => {
              console.log(err);
              throw new Error(err);
            });
        })
        .then(trx.commit)
        .catch((err) => {
          trx.rollback();
          throw new Error(err.message);
        })),
    )
    .then(session => getGuestJoinSessionDB(session[0].guest_id, (guest) => {
      console.log(guest, 'after insertion');
      callback(guest);
    }))
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
};

const patchGuestDB = (
  newData,
  guestId,
  sessionHour = null,
  sessionMinute = null,
  callback = null,
) => {
  newData.updated_at = new Date();
  db.transaction(
    (trx => db('guests')
      .transacting(trx)
      .where({ guest_id: guestId })
      .update(newData)
      .then(() => {
        if (sessionHour !== null && sessionMinute !== null) {
          console.log(sessionHour, 'hour');
          console.log(sessionMinute, 'minute');
          return db('sessions')
            .transacting(trx)
            .where({ guest_id: guestId })
            .update({
              session_time_hour: sessionHour,
              session_time_minute: sessionMinute,
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      })
      .then(trx.commit)
      .catch((err) => {
        trx.rollback();
        console.log(err);
        return err;
      })
    ),
  )
    .then(() => getGuestJoinSessionDB(guestId, (guest) => {
      console.log(guest, 'after update');
      if (callback !== null) callback(guest);
    }))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const deleteGuestDB = (guestId, callback) => {
  db.transaction((trx) => {
    db('sessions')
      .transacting(trx)
      .where({ guest_id: guestId })
      .del()
      .then(() => db('guests')
        .transacting(trx)
        .where({ guest_id: guestId })
        .del())
      .then(trx.commit)
      .catch((err) => {
        trx.rollback();
        console.log(err);
        return err;
      });
  })
    .then(() => callback(true))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const selectGuestsDB = (params, columns, callback) => {
  db
    .select(columns)
    .from('guests')
    .where(params)
    .returning('*')
    .then((items) => {
      callback(items);
    });
};

module.exports = {
  getAllGuestsDB,
  getGuestsJoinSessionDB,
  getGuestJoinSessionDB,
  getGuestDB,
  postGuestDB,
  patchGuestDB,
  deleteGuestDB,
  selectGuestsDB,
};
