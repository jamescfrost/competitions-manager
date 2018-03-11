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

CompetitionSchema.methods.applyCompetition = function (competition) {
  this.name = competition.name;
  this.description = competition.description;
  this.type = competition.type;
  this.competitorIds = competition.competitorIds;
};

CompetitionSchema.statics.findByDomainId = function(domainId, callback) {
  this.find({'domainId': domainId}, callback);
};

CompetitionSchema.statics.findOneById = function(id, callback) {
  this.findOne({"_id": id}, callback);
};

module.exports = mongoose.model('Competition', CompetitionSchema);
