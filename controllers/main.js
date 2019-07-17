// const addGuest = require('./addGuest');

const getTableData = (req, res, db) => {
  const { table } = req.params;
  db.select('*').from(table)
    .then((items) => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: 'false' });
      }
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

const getTableDataFields = (req, res, db) => {
  const { fields, table } = req.params;
  db.select(JSON.stringify(fields).replace(/"/g, '').split(',')).from(table)
    .then((items) => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: 'false' });
      }
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

const postTableData = (req, res, db) => {
  const { fields, tableName } = req.body;
  console.log(req.body.check_in_date, 'date received in router');
  // if (tableName === 'guests') this.postGuest(req, res, db);
  db(tableName).insert(fields)
    .returning('*')
    .then((item) => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

const postGuest = (req, res, db) => {
  const {
    room,
    first_name,
    last_name,
    check_in_date,
    check_out_date,
    session_time,
    tableName,
  } = req.body;
  console.log(req.body);
  const verf_code = Math.floor(1000 + Math.random() * 9000);
  db(tableName).insert({
    room,
    first_name,
    last_name,
    check_in_date,
    check_out_date,
    session_time,
    verf_code,
  })
    .returning('*')
    .then((guest) => {
      // addGuest(guest[0]);
      res.json(guest);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ dbError: err });
    });
};

const putTableData = (req, res, db) => {
  const { fields, tableName, id } = req.body;
  db(tableName).where({ id }).update(fields)
    .returning('*')
    .then((item) => {

      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

const deleteTableData = (req, res, db) => {
  const { table, id } = req.params;
  db(table).where({ id }).del()
    .then(() => {
      res.json({ delete: 'true' });
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

module.exports = {
  getTableData,
  getTableDataFields,
  postTableData,
  postGuest,
  putTableData,
  deleteTableData,
};
