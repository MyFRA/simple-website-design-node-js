// Require module
const bcrypt = require('bcrypt');

// Require helpers
const Validator = require('./Validator');

// Require model
const User = require('./../models/User');


const RegisterHelper = {

    pass: true,

    // Method to validate input 
    validate: function(req) {
        return new Promise(async(resolve, reject) => {

            // Validate input
            Validator([req.body], {
                name: 'required:true|min:3|max:50',
                email: 'required:true|min:3|max:50',
                username: 'required:true|min:4|max:50',
                password: 'required:true|min:6|max:15|equal:password_confirmation',
            }, (error) => {
                RegisterHelper.pass = false;
                reject(error)
            });

            // Email must be unique
            await User.findByColumn('email', req.body.email)
                .then((result) => {
                    if (result.length) {
                        RegisterHelper.pass = false;
                        reject({
                            input: 'email',
                            message: 'email sudah digunakan',
                        });
                    }
                });

            // Username must be unique
            await User.findByColumn('username', req.body.username)
                .then((result) => {
                    if (result.length) {
                        RegisterHelper.pass = false;
                        reject({
                            input: 'username',
                            message: 'username sudah digunakan',
                        });
                    }
                });



            // Pass validation resolve
            if(RegisterHelper.pass == true) {
                resolve('ok');
            }
        });

    },


    // Method to create user 
    createUser: function(req) {

        // material for hash password
        const saltRound = 10;
        const password = req.body.password;

        // hashing password
        bcrypt.hash(password, saltRound, (err, hash) => {
            if(err) throw err;
            
            User.create({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username.toLowerCase(),
                password: hash,
            });
        })
    } 
}

// Export
module.exports = RegisterHelper;