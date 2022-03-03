"use strict";
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    BDconfig: {
        host: process.env.MYSQLDB_HOST || "localhost",
        user: process.env.MYSQLDB_USER || "root",
        password: process.env.MYSQLDB_ROOT_PASSWORD,
        database: process.env.MYSQLDB_DATABASE
    }
    //port: process.env.PORT || 3000
}