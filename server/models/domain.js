const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose models
const DomainSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  }
});

DomainSchema.statics.findByUser = function(user, callback) {
  const domainIds = user.domains;
  // var domainObjectIds = [];
  // for (domainId of domainIds) {
  //   var objectId = new mongoose.Types.ObjectId(domainId);
  //   domainObjectIds.push(objectId);
  // }
  this.find({'_id': {$in: domainIds}}, callback);
};

module.exports = mongoose.model('Domain', DomainSchema);
