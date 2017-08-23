var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose models
var CompetitorSchema = new Schema({
  groupTag: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  type: {
    type: String
  },

});

module.exports = mongoose.model('Competitor', CompetitorSchema);
