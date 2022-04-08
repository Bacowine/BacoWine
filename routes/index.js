const express = require('express');
const controllerUser = require('../controllers/controllerUser');

const router = express.Router();

/* GET home page. */
router.get('/', (_req, res) => {
  res.render('index', { title: 'BacoWine DEV' });
});

router.get('/login', (_req, res) => {
  res.render('login');
});

router.post('/login', controllerUser.login);

module.exports = router;
