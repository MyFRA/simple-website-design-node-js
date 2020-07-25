// Require module
const bcrypt = require('bcrypt');

// Require model
const User = require('./../models/User');

const LoginHelper = {
    login: function(req) {
        return new Promise(async(resolve, reject) => {
            await User.findByColumn('email', req.body.email)
                .then((results) => {
                    if(!results) reject('email tidak ditemukan');
                    if(results != undefined) {
                        if(!bcrypt.compareSync(req.body.password, results.password)) reject('kata sandi yang anda masukan salah');
                        resolve(results);
                    }
                })
                .catch((error) => {throw error});
        });
    } 
}

// Export
module.exports = LoginHelper;