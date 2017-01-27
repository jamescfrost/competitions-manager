var settings = require('../../settings.json');
var mongojs = require('mongojs');

var db = mongojs(settings.mongoDbConnectionString, ['competitions']);

let testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };

exports.authenticate = function (req, res) {
  var credentials = req.body;
  if (credentials.username === testUser.username && credentials.password === testUser.password) {
    res.json({
      token: 'fake-jwt-token'
    })
  } else {
    res.json({});
  }
}

exports.users = function (req, res) {
  if (req.headers.authorization === 'Bearer fake-jwt-token') {
    res.json([testUser]);
  } else {
    res.status(401);
    res.json({});
  }
}
