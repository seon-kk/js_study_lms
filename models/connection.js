const mysql = require("mysql2/promise");
const config = require("config");
const dbConfig = config.get("dbConfig");

//DB Connection Test
const db = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database
});

module.exports = db;