const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (_req, res) => {
  res.render('index', { title: 'BacoWine DEV' });
});

router.get('/login', (_req, res) => {
  res.render('login', { title: 'Iniciar sesión' });
});

module.exports = router;
