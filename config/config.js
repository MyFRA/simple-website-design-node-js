// Require modules
const connection = new Promise(async(resolve, reject) => {
    const mysql2 = require('mysql2/promise');
    const db = require('dotenv').config();
    
    // Create the connection to database
    const connection = await mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    }).then((val) => {
        console.log('connected to database');
        resolve(val);
    }).catch((err) => {
        console.log(err);
        process.exit();
    });
});

module.exports = connection;