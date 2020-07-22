// Require module
const bcrypt = require('bcrypt');

// Require helpers
const Validator = require('./Validator');
const User = require('./../models/User');
const GetObjError = require('./GetObjError');


const RegisterHelper = {
    // variable to check if pass
    pass: true,

    // Method to validate input 
    validate: function(req, res) {
        return new Promise(async(resolve, reject) => {

            // Input validation using Validator helper
            Validator(req, {
                nama: 'required|min:3|max:50',
                email: 'required|min:3|max:50',
                username: 'required|min:4|max:50',
                password: 'required|equal:password_confirmation|min:6|max:15',
            }, (error, result) => {
                RegisterHelper.pass = false;
                if(error) {
                    const objError = new GetObjError(req, result.input, result.message);
                    reject(objError);
                }
            });
    
            
            // Validation if the email is already used
            await User.findByColumn('email', req.body.email)
                .then((results) => {
                    if(results.length > 0) {
                        RegisterHelper.pass = false;
                        const objError = new GetObjError(req, 'email', 'email sudah digunakan');
                        reject(objError);
                    }
                })
                .catch((err) => {
                    reject(err);
                    throw err;                
                });

            // Validation if the username is already used
            await User.findByColumn('username', req.body.username)
                .then((results) => {
                    if(results.length > 0) {
                        RegisterHelper.pass = false;
                        const objError = new GetObjError(req, 'username', 'username sudah digunakan');
                        reject(objError);
                    }
                })
                .catch((err) => {
                    reject(err);
                    throw err;                
                });
            
            // Pass validation return resolve
            if(RegisterHelper.pass = true) {
                resolve('pass validation')
            }
        });
    },

    // Method to create user 
    createUser: function(req) {
        return new Promise(async(resolve, reject) => {
            // material for hash password
            const saltRound = 10;
            const password = req.body.password;

            // hashing password
            bcrypt.hash(password, saltRound, (err, hash) => {
                if(err) {
                    reject(err);
                    throw err;
                };
                
                User.create({
                    nama: req.body.nama,
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                }).then((value) => {
                    resolve(value);
                });
            })
        });
    } 
}

// Export
module.exports = RegisterHelper;