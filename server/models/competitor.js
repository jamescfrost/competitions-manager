const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose models
const CompetitorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creatorUserId: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  type: {
    type: String
  },
  domainId: {
    type: String,
    required: true
  }
});

CompetitorSchema.methods.applyCompetitor = function (competitor) {
  this.name = competitor.name;
  this.description = competitor.description;
  this.type = competitor.type;
};

CompetitorSchema.statics.findOneById = function(id, callback) {
  this.findOne({"_id": id}, callback);
};

CompetitorSchema.statics.findByDomainId = function(domainId, callback) {
  this.find({'domainId': domainId}, callback);
};

module.exports = mongoose.model('Competitor', CompetitorSchema);
