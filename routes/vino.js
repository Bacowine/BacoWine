var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('jjsaasjasj que pro soy mira');
});

router.get('/agregarVino', function(req, res, next) {
    res.render('agregarVino');
  });

module.exports = router;