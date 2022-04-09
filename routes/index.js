const express = require('express');
const controllerUser = require('../controllers/controllerUser');

const { authRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get((_req, res) => res.render('index', { title: 'BacoWine DEV' }));

router.route('/login')
  .get(authRole(), (_req, res) => res.render('login'))
  .post(authRole(), controllerUser.login);

module.exports = router;
