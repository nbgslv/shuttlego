const db = require('../db/db');

// const addGuest = require('./addGuest');
module.exports = {
  getAll: (req, res) => {
    db.select('*').from('guests')
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
    const { data } = req.body;
    db('guests').insert(data)
      .returning('*')
      .then(item => res.status(200).json(item))
      .catch(err => res.status(400).json({ dbError: err }));
  },
  update: (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    db('guests').where({ id }).update(data)
      .returning('*')
      .then(item => res.status(200).json(item))
      .catch(err => res.status(400).json({ dbError: err }));
  },
  delete: (req, res) => {
    const { id } = req.params;
    db('guests').where({ id }).del()
      .then(() => res.status(200).json({ delete: 'true' }))
      .catch(err => res.status(400).json({ dbError: err }));
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

// const postGuest = (req, res, db) => {
//   const {
//     room,
//     first_name,
//     last_name,
//     check_in_date,
//     check_out_date,
//     session_time,
//     tableName,
//   } = req.body;
//   console.log(req.body);
//   const verf_code = Math.floor(1000 + Math.random() * 9000);
//   db(tableName).insert({
//     room,
//     first_name,
//     last_name,
//     check_in_date,
//     check_out_date,
//     session_time,
//     verf_code,
//   })
//     .returning('*')
//     .then((guest) => {
//       // addGuest(guest[0]);
//       res.json(guest);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(400).json({ dbError: err });
//     });
// };
