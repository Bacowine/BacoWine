const mysql = require('mysql2');
const config = require('../config');

const pool = mysql.createPool(config.BDconfig);

module.exports = pool;
