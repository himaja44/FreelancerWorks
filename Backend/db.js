require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,

    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

db.getConnection(function (error, connection) {
    if (error) {
        console.log(
            "MySQL connection failed:",
            error.code,
            error.message
        );
        return;
    }

    console.log("MySQL connected successfully!");

    connection.release();
});

module.exports = db;