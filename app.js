// Require modules
const express = require('express');
const path = require('path');

// Require routes
const home = require('./routes/home');

// Initialization app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Route
app.use('/', home);

// Set static files
app.use(express.static(path.join(__dirname, 'public')));

// Listening server
app.listen(3000, () => console.log('server is running on port : 3000'));