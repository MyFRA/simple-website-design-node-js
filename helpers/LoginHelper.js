const bcrypt = require('bcrypt');
const User = require('./../models/User');
const Validator = require('./../helpers/Validator');

const LoginHelper = {
    login: function(req) {
        return new Promise(async(resolve, reject) => {
            
            await Validator.validate([req.body], {
                email: 'required:true|isEmail:true',
            }).then((error) => {
                reject(error.message);
            }).catch(()=>{})

            await User.findByColumn('email', req.body.email.toLowerCase())
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

module.exports = LoginHelper;