var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose models
var CompetitionSchema = new Schema({
  groupTag: {
    type: String,
    required: false
  },
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
  userId: {
    type: String,
    required: true
  },
  competitorIds: {
    type: [String]
  }
});

module.exports = mongoose.model('Competition', CompetitionSchema);
