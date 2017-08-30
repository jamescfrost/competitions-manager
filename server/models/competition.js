var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose models
var CompetitionSchema = new Schema({
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
  creator: {
    type: String,
    required: true
  },
  competitors: {
    type: [String]
  },
  domain: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Competition', CompetitionSchema);
