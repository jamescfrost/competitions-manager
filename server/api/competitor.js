const Competitor = require('../models/competitor');

exports.getAll = function (req, res) {
  Competitor.find({userId: req.user._id}, function (err, competitors) {
    if(err) {
      res.send(err);
    }
    res.json(competitors);
  });
};

exports.get = function (req, res) {
  var id = req.params.id;
  Competitor.findOne({ _id : id }, function (err, competitor) {
    if(err) {
      res.send(err);
    }
    res.json(competitor);
  })
};

exports.save = function (req, res) {
  var receivedCompetitor = req.body;
  console.log(receivedCompetitor);
  var competitor;
  if (receivedCompetitor._id) {
    Competitor.findOne({ _id : receivedCompetitor._id }, function (err, foundCompetitor) {
      if (err) {
        res.send(err);
        return;
      }
      competitor = foundCompetitor;
    })
  } else {
    competitor = new Competitor();
    competitor.userId = req.user._id;
  }
  console.log(competitor);
  competitor.name = receivedCompetitor.name;
  competitor.description = receivedCompetitor.description;
  competitor.type = receivedCompetitor.type;
  console.log(competitor);
  competitor.save(function(err) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(competitor);
  });
};

/*

 exports.add = function (req, res) {
 var competitor = req.body;
 if (!competitor.title || !(competitor.isDone + '')) {
 res.status(400);
 res.json({
 "error": "Bad data"
 });
 } else {
 db.competitors.save(competitor, function (err, competitor) {
 if (err) {
 res.send(err);
 }
 res.json(competitor);
 })
 }
 };

 exports.delete = function (req, res) {
 db.competitors.remove({_id:mongojs.ObjectId(req.params.id)}, function (err, competitor) {
 if(err) {
 res.send(err);
 }
 res.json(competitor);
 })
 };

 exports.update = function (req, res) {
 var competitor = req.body;
 var updcompetitor = {};

 if (competitor.isDone) {
 updcompetitor.isDone = competitor.isDone;
 }
 if (competitor.title) {
 updcompetitor.title = competitor.title;
 }
 if (!updcompetitor) {
 res.status(400);
 res.json({
 "error" : "Bad data"
 })
 } else {
 db.competitors.update({_id:mongojs.ObjectId(req.params.id)}, updcompetitor, {}, function (err, competitor) {
 if(err) {
 res.send(err);
 }
 res.json(competitor);
 })
 }
 };
 */
