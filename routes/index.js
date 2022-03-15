var express = require('express');
var router = express.Router();

const controllerUsers = require("../controllers/controllerUsuario");
const controllerU = new controllerUsers();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BacoWine DEV' });
});

router.get('/gestionUsuarios', function(req, res, next) {
  res.render('gestionUsuarios', {res:"", usuario: null}); //vista cargada estaticamente
});

router.post("/verUsuario", controllerU.verUsuario); 
router.post("/insertarUsuario", controllerU.insertarUsuario); 


module.exports = router;
