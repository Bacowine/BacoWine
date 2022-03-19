const config = require("../config");
const mysql = require("mysql");
const pool = mysql.createPool(config.BDconfig);

module.exports = pool