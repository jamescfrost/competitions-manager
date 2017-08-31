const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose models
const DomainSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  creatorUserId: {
    type: String,
    required: true
  }
});

DomainSchema.statics.findByUser = function(user, callback) {
  const domainIds = user.domainIds;
  // var domainObjectIds = [];
  // for (domainId of domainIds) {
  //   var objectId = new mongoose.Types.ObjectId(domainId);
  //   domainObjectIds.push(objectId);
  // }
  this.find({'_id': {$in: domainIds}}, callback);
};

module.exports = mongoose.model('Domain', DomainSchema);
