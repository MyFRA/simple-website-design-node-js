// Require database connection
const conn = require('./../config/config');

// Parent Model
class Model {
    // Table name, obtained from child class
    table;

    // Create method
    create (object, callback) {
        return new Promise((resolve, reject) => {
            conn.then((db) => {
                (async function(table) {

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
            
                    db.query(`INSERT INTO ${table}(${columns.join()}) VALUES(${askIcon.join()})`, values, (err, res) => {
                        if(err) {
                            reject(err);
                            throw err;
                        }
                        resolve(res);
                    })
                })(this.table);
            });
        });
    }

    // Find by column method
    findByColumn(column, value, callback) {
        return new Promise((resolve, reject) => {
            conn.then((db) => {
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
        });
    }
}

// Export
module.exports = Model;