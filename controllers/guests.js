const db = require('../db/db');
const verifCodeHelper = require('../helpers/verifCode');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
// const postInsert = require('./postInsertGuest');

module.exports = {
  getAll: (req, res) => {
    db.select('*').from('guests').join('sessions', 'sessions.guest_id', 'guests.guest_id')
      .then((items) => {
        if (items.length) {
          res.status(200)
            .json(items);
        }
        res.status(204)
          .json({ dataExists: 'false' });
      })
      .catch(err => res.status(400).json({ dbError: err }));
  },
  getOne: (req, res) => {
    const { id } = req.params;
    db('guests').where({ id })
      .then((item) => {
        if (item) {
          res.status(200)
            .json(item);
        }
        res.json({ dataExists: 'false' });
      })
      .catch(err => res.status(400).json({ dbError: err }));
  },
  insert: (req, res) => {
    const data = req.body;
    const verifCode = verifCodeHelper.getVerifCode();
    console.log(verifCode, 'code');
    data.verf_code = bcrypt.hashSync(verifCode.toString(), salt);
    const { session_time_hour, session_time_minute } = data;
    delete data.session_time_hour;
    delete data.session_time_minute;
    console.log(data, 'received in server');
    db.transaction(
      (trx => db('guests')
        .transacting(trx)
        .insert(data)
        .returning('*')
        .then(item => db('sessions')
          .transacting(trx)
          .insert({
            session_time_hour,
            session_time_minute,
            guest_id: item[0].guest_id,
          })
          .returning('*'))
        .then(trx.commit)
        .catch((err) => {
          trx.rollback();
          res.status(400).json({ dbError: err });
        })),
    )
      .then(session => {
        console.log(session[0].guest_id);
        return db.select('*')
          .from('guests')
          .join('sessions', (queryBuilder) => {
            queryBuilder.on('guests.guest_id', '=', 'sessions.guest_id')
              .onIn('guests.guest_id', [session[0].guest_id]);
          });
      })
      .then((items) => {
        console.log(items, 'after insertion');
        res.status(200).json(items);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ dbError: err });
      });
  },
  update: (req, res) => {
    const { guest_id } = req.params;
    const { data } = req.body;
    console.log(data, 'received in server');
    const session_time_hour = data.session_time_hour;
    const session_time_minute = data.session_time_minute;
    delete data.session_time_hour;
    delete data.session_time_minute;
    db.transaction(
      (trx => db('guests')
        .transacting(trx)
        .where({ guest_id })
        .update(data)
        .then(() => db('sessions')
          .transacting(trx)
          .where({ guest_id })
          .update({
            session_time_hour,
            session_time_minute,
          }))
        .then(trx.commit)
        .catch((err) => {
          trx.rollback();
          console.log(err);
          res.status(400).json({ dbError: err });
        })
      ),
    )
      .then(() => db.select('*')
        .from('guests')
        .join('sessions', (queryBuilder) => {
          queryBuilder.on('guests.guest_id', '=', 'sessions.guest_id')
            .onIn('guests.guest_id', guest_id);
        }))
      .then(item => {
        console.log(item, 'after update');
        res.status(200).json(item);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ dbError: err });
      });
  },
  delete: (req, res) => {
    const { guest_id } = req.params;
    db.transaction((trx => {
      db('sessions')
        .transacting(trx)
        .where({ guest_id })
        .del()
        .then(() => db('guests')
          .transacting(trx)
          .where({ guest_id })
          .del())
        .then(trx.commit)
        .catch((err) => {
          trx.rollback();
          console.log(err);
          res.status(400).json({ dbError: err });
        });
    }))
      .then(() => res.status(200).json({ delete: 'true' }))
      .catch((err) => {
        console.log(err);
        res.status(400).json({ dbError: err });
      });
  },
  verify: (req, res) => {
    const { roomNumber,
      confCode,
      email,
      phoneNumber,
    } = req.body;
    db
      .select('guest_id', 'room_number', 'verf_code')
      .from('guests')
      .where('room_number', roomNumber)
      .then((items) => {
        let userIndex = undefined;
        items.map((row, i) => {
          if (bcrypt.compareSync(confCode, row.verf_code)) {
            console.log(row.guest_id);
            userIndex = i;
          }
        });
        if (userIndex) {
          console.log(items[userIndex]);
          req.session.user = {
            guestId: items[userIndex].guest_id,
            roomNumber: items[userIndex].room_number,
          };
          console.log(req.session);
          res.status(200).json(req.session);
        } else {
          res.status(400).json({ error: 'could not login' });
        }
      })
      .catch((err) => res.status(400).json({ error: err }));
  },
};

// const getTableDataFields = (req, res, db) => {
//   const { fields, table } = req.params;
//   db.select(JSON.stringify(fields).replace(/"/g, '').split(',')).from(table)
//     .then((items) => {
//       if (items.length) {
//         res.json(items);
//       } else {
//         res.json({ dataExists: 'false' });
//       }
//     })
//     .catch(err => res.status(400).json({ dbError: err }));
// };
