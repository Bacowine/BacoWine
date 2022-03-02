"use strict";
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    BDconfig: {
        host: "localhost",
        user: process.env.MYSQLDB_USER,
        password: process.env.MYSQLDB_ROOT_PASSWORD,
        database: process.env.MYSQLDB_DATABASE
    }
    //port: process.env.PORT || 3000
}