"use strict";
require('dotenv').config({path: __dirname + '/.env'});
module.exports = {
    BDconfig: {
        host: process.env.MYSQLDB_HOST || "localhost",
        user: process.env.MYSQLDB_USER || "root",
        password: process.env.MYSQLDB_ROOT_PASSWORD,
        database: process.env.MYSQLDB_DATABASE,
        port: process.env.PORT || 3307
    }

}