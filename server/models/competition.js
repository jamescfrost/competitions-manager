const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose models
const CompetitionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true
  },
  creatorUserId: {
    type: String,
    required: true
  },
  competitorIds: {
    type: [String]
  },
  domainId: {
    type: String,
    required: true
  }
});

CompetitionSchema.statics.findByDomainId = function(domainId, callback) {
  this.find({'domainId': domainId}, callback);
};

module.exports = mongoose.model('Competition', CompetitionSchema);
