const Competition = require('../models/competition');

exports.getAll = function (req, res) {
  Competition.find({userId: req.user._id}, function (err, competitions) {
    if(err) {
      res.send(err);
    }
    res.json(competitions);
  });
};

/*
 exports.get = function (req, res) {
 db.competitions.findOne({_id:mongojs.ObjectId(req.params.id)}, function (err, competition) {
 if(err) {
 res.send(err);
 }
 res.json(competition);
 })
 };

 exports.add = function (req, res) {
 var competition = req.body;
 if (!competition.title || !(competition.isDone + '')) {
 res.status(400);
 res.json({
 "error": "Bad data"
 });
 } else {
 db.competitions.save(competition, function (err, competition) {
 if (err) {
 res.send(err);
 }
 res.json(competition);
 })
 }
 };

 exports.delete = function (req, res) {
 db.competitions.remove({_id:mongojs.ObjectId(req.params.id)}, function (err, competition) {
 if(err) {
 res.send(err);
 }
 res.json(competition);
 })
 };

 exports.update = function (req, res) {
 var competition = req.body;
 var updcompetition = {};

 if (competition.isDone) {
 updcompetition.isDone = competition.isDone;
 }
 if (competition.title) {
 updcompetition.title = competition.title;
 }
 if (!updcompetition) {
 res.status(400);
 res.json({
 "error" : "Bad data"
 })
 } else {
 db.competitions.update({_id:mongojs.ObjectId(req.params.id)}, updcompetition, {}, function (err, competition) {
 if(err) {
 res.send(err);
 }
 res.json(competition);
 })
 }
 };
 */
