const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config/database.json');
const BearerStrategy = require('passport-http-bearer').Strategy;
//const JwtStrategy = require('passport-jwt').Strategy;
//const ExtractJwt = require('passport-jwt').ExtractJwt;

exports.bearerStrategy = new BearerStrategy(
  function(token, done) {
    var decoded = jwt.decode(token, config.secret);

    User.findOne({ _id : decoded.userId }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }
);

/*var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.secret;

exports.jwtStragegy = new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({ _id : jwt_payload.userId }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user, { scope: 'read' });
  });
});*/

exports.authenticate = function (req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if (err)
      throw err;
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var payLoad = { "userId": user._id };
          var token = jwt.encode(payLoad, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
};

exports.register = function (req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
};

