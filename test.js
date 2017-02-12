var jwt = require('jwt-simple');
var secret = 'xxx';
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ldVCrsvRdnecy7QjA0fnCWCDLDZ-M4";
try {
  var decoded = jwt.decode(token, secret);
  console.log(decoded); //=> { foo: 'bar' }
}
catch(e) {
  console.log("invalid token");
}

/*jwt.verify(token, superSecret, function(err, decoded) {
  if (err) {
    return res.json({ success: false, message: 'Failed to authenticate token.' });
  } else {
    // if everything is good, save to request for use in other routes
    req.decoded = decoded;
    next();
  }
});*/

