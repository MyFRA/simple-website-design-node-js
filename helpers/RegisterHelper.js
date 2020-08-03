// Require module
const bcrypt = require('bcrypt');

// Require helpers
const Validator = require('./Validator');

// Require model
const User = require('./../models/User');

const RegisterHelper = {
    // variable to check if pass
    pass: true,

    // Method to validate input 
    validate: function(req) {
        return new Promise(async(resolve, reject) => {

            // Input validation using Validator helper
            Validator(req, {
                name: 'required|min:3|max:50',
                email: 'required|min:3|max:50',
                username: 'required|min:4|max:50',
                password: 'required|equal:password_confirmation|min:6|max:15',
            }, (error) => {
                RegisterHelper.pass = false;
                if(error) reject(error);
            });
    
            // Validation if the email is already used
            await User.findByColumn('email', req.body.email)
                .then((results) => {
                    if(results) {
                        RegisterHelper.pass = false;
                        reject({
                            input: 'email',
                            message: 'email sudah digunakan',
                        });
                    }
                });

            // Validation if the username is already used
            await User.findByColumn('username', req.body.username)
                .then((results) => {
                    if(results) {
                        RegisterHelper.pass = false;
                        reject({
                            input: 'username',
                            message: 'username sudah digunakan',
                        });
                    }
                });
            
            // Pass validation return resolve
            if(RegisterHelper.pass = true) {
                resolve('pass validation')
            }
        });
    },

    // Method to create user 
    createUser: function(req) {
            
        // material for hash password
        const saltRound = 10;
        const password = req.body.password;

            // hashing password
            bcrypt.hash(password, saltRound, async(err, hash) => {
                if(err) throw err;
                
                // Create user
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                })
            })
    } 
}

// Export
module.exports = RegisterHelper;