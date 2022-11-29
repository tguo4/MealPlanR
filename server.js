const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan'); // logging middleware
var cors = require('cors');

// dotenv' provides access to environment variables and secrets
// Always require and configure near the top
require('dotenv').config();
// Connect to the database after .env has been configured
require('./config/database');
// create express app
const app = express();

app.use(cors());
app.use(logger('dev'));
// processes JSON data sent in the AJAX request and adds it to the req.body
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify the token and assign user object of payload to req.user
// Make sure to mount before routes
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));

const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/recipes/saved', ensureLoggedIn, require('./routes/api/recipes'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
// Since this route is a "catch all" that matches every GET request, 
// be sure to mount API or other routes before it!
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

// Tell the Express app to listen for incoming requests
app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});