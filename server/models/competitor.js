var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose models
var CompetitorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  type: {
    type: String
  },
  domain: {
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

CompetitorSchema.statics.findOneByDomainAndId = function(domainId, id, callback) {
  this.findOne({"domain": domainId, "_id": id}, callback);
};

CompetitorSchema.statics.findByDomain = function(domain, callback) {
  this.find({'domain': domain}, callback);
};

module.exports = mongoose.model('Competitor', CompetitorSchema);
