const express = require('express');
const controllerUser = require('../controllers/controllerUser');

const cVinos = require('../controllers/controllerVino');

const { authRole, ROLE } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(cVinos.mostrarVinos);

router.route('/login')
  .get(authRole(), (_req, res) => res.render('login'))
  .post(authRole(), controllerUser.login);

router.route('/signup')
  .get(authRole(), (_req, res) => res.render('signup'))
  .post(authRole(), controllerUser.signup);

router.route('/logout')
  .post(authRole([ROLE.USER, ROLE.ADMIN]), controllerUser.logout);
module.exports = router;
