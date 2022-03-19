var express = require('express');
const router = express.Router();
const CVINOS = require("../controllers/controllerVinos");
const cVinos = new CVINOS();


router.post("/mostrarVino", cVinos.verVinos); 

module.exports = router;
