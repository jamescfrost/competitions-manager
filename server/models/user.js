const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../config/database.json');
const Domain = require('./domain');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  domainIds: {
    type: [String],
    required: true
  }
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.statics.findOneById = function(id, callback) {
  this.findOne({ "_id" : id }, callback)
};

UserSchema.statics.findOneByUsername = function(username, callback) {
  this.findOne({ "username" : username }, callback)
};

UserSchema.statics.findOneByToken = function (token, callback) {
  const decoded = jwt.decode(token, config.secret);
  this.findOneById(decoded.userId, function (err, user) {
    if (err) { return callback(err); }
    if (!user) { return callback(null, false); }
    return callback(null, user, { scope: 'read' });
  });
};

UserSchema.methods.createToken = function () {
  const payLoad = { "userId": this._id };
  return jwt.encode(payLoad, config.secret);
};

UserSchema.methods.comparePassword = function (passw) {
  return bcrypt.compareSync(passw, this.password);
};

UserSchema.methods.hasDomainAuthority = function (domainId) {
  return this.domainIds.includes(domainId);
};

UserSchema.methods.getDomains = function (callback) {
  Domain.findByUser(this, callback);
};

module.exports = mongoose.model('User', UserSchema);
