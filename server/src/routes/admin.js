const express = require('express');
const { allUsers, userPermissions } = require('../controllers/admin');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/users', allUsers);

router.post('/users/permissions', userPermissions);

module.exports = router;
