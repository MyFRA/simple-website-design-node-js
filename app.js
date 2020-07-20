// Require modules
const express = require('express');
const path = require('path');

// Require routes
const home = require('./routes/home');
const login = require('./routes/login');
const register = require('./routes/register');


// Initialization app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Route
app.use('/', home);
app.use('/user/login', login);
app.use('/user/register', register);

// Set static files
app.use(express.static(path.join(__dirname, 'public')));

// Listening server
app.listen(3000, () => console.log('server is running on port : 3000'));