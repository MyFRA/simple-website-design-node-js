// Require modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

// Require database connection
const db = require('./config/config');

// Require routes
const home = require('./routes/home');
const login = require('./routes/login');
const register = require('./routes/register');


// Initialization app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Use session
app.use(cookieParser('keyboard cat'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }}
  ));
app.use(flash());

// Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Logger
app.use(logger('dev'));

// Route
app.use('/', home);
app.use('/user/login', login);
app.use('/user/register', register);

// Set static files
app.use(express.static(path.join(__dirname, 'public')));

// Listening server
app.listen(3000, () => console.log('server is running on port : 3000'));