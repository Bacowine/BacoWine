const express = require('express');
const multer = require('multer');

const upload = multer();
const cVinos = require('../controllers/controllerVino');
const vinoSchema = require('../validators/vino.validator');
const validate = require('../middlewares/schemaValidator');

const { ROLE, authRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get((_req, res) => res.redirect('/vino/agregarVino'));

router.route('/detalles')
  .get(cVinos.verVino);

router.route('/agregarVino')
  .get(authRole(ROLE.ADMIN), (_req, res) => res.render('agregarVino'))
  .post(authRole(ROLE.ADMIN), upload.single('imagen'), validate(vinoSchema), cVinos.agregarVino);

router.route('/borrarVino')
  .post(authRole(ROLE.ADMIN), cVinos.borrarVino);

router.route('/comentarVino')
  .post(authRole(ROLE.USER), cVinos.comentarVino);

router.route('/borrarComentario')
  .post(authRole([ROLE.USER, ROLE.ADMIN]), cVinos.borrarComentario);

router.route('/valorarVino')
  .post(authRole(ROLE.USER), cVinos.valorarVino);

module.exports = router;
