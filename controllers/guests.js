const db = require('../db/db');
const verifCodeHelper = require('../helpers/verifCode');
const postInsert = require('./postInsertGuest');

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
    const { data } = req.body;
    const verifCode = verifCodeHelper.getVerifCode();
    data.verf_code = verifCodeHelper.hashVerifCode(verifCode);
    db('guests').insert(data)
      .returning('*')
      .then(item => {
        postInsert(item);
        res.status(200).json(item);
      })
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
