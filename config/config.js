// Require modules
const mysql2 = require('mysql2');
const db = require('dotenv').config();

// Create the connection to database
const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
}, () => console.log('connected'));

connection.connect((err) => {
    if(err) throw err;
    console.log('connected to database');
})

module.exports = connection;