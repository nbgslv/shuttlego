const express = require('express');
const { allUsers, userPermissions, permissions } = require('../controllers/admin');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/users', allUsers);

router.post('/users/permissions', userPermissions);

router.get('/users/permissions', permissions);

module.exports = router;
