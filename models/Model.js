// Require database connection
const conn = require('./../config/config');

// Parent Model
class Model {

    // Table name, obtained from child class
    table;

    // Get method
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

    // Create method
    create (object) {
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
            
                    const ok = await db.query(`INSERT INTO ${table}(${columns.join()}) VALUES(${askIcon.join()})`, values)
            
                    if(ok) {
                        await db.query(`SELECT * FROM ${table} WHERE id = '${ok[0].insertId}' LIMIT 1`, (err, res) => {
                            if(err) {
                                reject(err);
                                throw err;
                            } 
                            
                            resolve(res[0]);
                        });
                    }
  
                })(this.table);
            });
        });
    }

    // Find by column method
    findByColumn(column, value) {
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
}

// Export
module.exports = Model;