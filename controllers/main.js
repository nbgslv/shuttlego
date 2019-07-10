const getTableData = (req, res, db) => {
  const { fields, tableName } = req.body;
  const selectFields = Object.keys(fields).length === 0 ? '*' : fields;
  db.select(selectFields).from(tableName)
    .then((items) => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: 'false' });
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const postTableData = (req, res, db) => {
  const { fields, tableName } = req.body;
  db(tableName).insert(fields)
    .returning('*')
    .then((item) => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const putTableData = (req, res, db) => {
  const { fields, tableName, id } = req.body;
  db(tableName).where({ id }).update(fields)
    .returning('*')
    .then((item) => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

const deleteTableData = (req, res, db) => {
  const { tableName, id } = req.body;
  db(tableName).where({ id }).del()
    .then(() => {
      res.json({ delete: 'true' });
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
};
