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
  db(tableName).insert(fields)
    .returning('*')
    .then((item) => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: err }));
};

const putTableData = (req, res, db) => {
  const { fields, tableName, id } = req.body;
  console.log(req.body);
  console.log(tableName);
  console.log(fields);
  console.log(id);
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
  putTableData,
  deleteTableData,
};
