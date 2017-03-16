// Get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const morgan  = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./src/server/config/database.json');
const bearerStrategy = require('./src/server/api/authentication').bearerStrategy;

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// pass passport for configuration
//require('./server/config/passport')(passport);

// Get our API routes
const api = require('./src/server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

passport.use(bearerStrategy);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function() {
  console.log(`API running on localhost:${port}`)
});
