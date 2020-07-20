// Require modules
const express = require('express');

// Initialization app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Route
app.get('/', (req, res) => {
    res.render('pages/index')
});

// Listening server
app.listen(3000, () => console.log('server is running on port : 3000'));