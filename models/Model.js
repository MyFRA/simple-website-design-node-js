// Require database connection
const conn = require('./../config/config');

// Parent Model
class Model {
    // Table name, obtained from child class
    table;

    // Create method
    create (object) {
        conn.then((db) => {

            const columns = [];
            const values = []; 
            const askIcon = [];
    
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    columns.push(key);
                    values.push(object[key]);
                    askIcon.push('?');
                }
            };
    
            db.query(`INSERT INTO ${this.table}(${columns.join()}) VALUES(${askIcon.join()})`, values);
        });
    }

    // Get method (READ)
    get() {
        return new Promise((resolve, reject) => {
            conn.then((db) => {
                 db.query(`SELECT * FROM ${this.table}`, (err, res) => {
                    if(err) {
                        reject(err);
                        throw err;
                    }
                    resolve(res);
                });
            });
        });
    }

    // Find by column method
    findByColumn(column, value, callback) {
        return new Promise((resolve, reject) => {
            conn.then((db) => {
                (async function(table) {
                    await db.query(`SELECT * FROM ${table} WHERE ${column} = '${value}' LIMIT 1`, (err, res) => {
                        if(err) {
                            reject(err);
                            throw err;
                        }
                        resolve(res[0]);
                    });
                })(this.table);
            });
        });
    }

    // Unique column
    unique(column, value) {
        return new Promise((resolve, reject) => {
            (async function(table) {
                await db.query(`SELECT * FROM ${table} WHERE ${column} = '${value}'`, (err, res) => {
                    if(err) {
                        reject(err);
                        throw err;
                    }
                    resolve(res);
                });
            })(this.table);
        });
    }
}

// Export
module.exports = Model;