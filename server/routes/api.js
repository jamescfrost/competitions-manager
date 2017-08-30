const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');
const Domain = require('../models/domain');
const Competition = require('../models/competition');
const Competitor = require('../models/competitor');

const domainValidator = function (req, res, next) {
  const user = req.user;
  const domainId = req.params.domainId;
  if (!user.hasDomainAuthority(domainId)) {
    res.sendStatus(401);
  } else {
    next();
  }
};

router.get('/', function (req, res) {
  res.send('Competitions Manager API');
});


router.post('/register', function (req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please provide name and password.'});
  } else {
    var user = new User({
      username: req.body.username,
      password: req.body.password
    });
    user.save(function (err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/authenticate', function (req, res) {
  User.findOneByUsername(req.body.username, function (err, user) {
    if (err)
      throw err;
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      if (user.comparePassword(req.body.password)) {
        const token = user.createToken()
        res.json({success: true, token: token});
      } else {
        res.send({success: false, msg: 'Authentication failed. Wrong password.'});
      }
    }
  });
});


// router.get('/:domainId/competitions', passport.authenticate('bearer', {session: false}), domainValidator, function (req, res) {
//   Competition.find({userId: req.user._id}, function (err, competitions) {
//     if(err) {
//       res.send(err);
//     }
//     res.json(competitions);
//   });
// });
//
// router.get('/:domainId/competition/:id', passport.authenticate('bearer', {session: false}), domainValidator, function (req, res) {
//   var id = req.params.id;
//   Competition.findOne({ _id : id }, function (err, competition) {
//     if(err) {
//       res.send(err);
//     }
//     res.json(competition);
//   })
// });
//
// router.put('/:domainid/competition/:id', passport.authenticate('bearer', {session: false}), domainValidator, function (req, res) {
//   var saveCompetition = req.body;
//   console.log(saveCompetition);
//   Competition.findOne({ _id : saveCompetition._id }, function (err, competition) {
//     if(err) {
//       res.send(err);
//     }
//     competition.groupTag = saveCompetition.groupTag;
//     competition.name = saveCompetition.name;
//     competition.description = saveCompetition.description;
//     competition.type = saveCompetition.type;
//     competition.competitorIds = saveCompetition.competitorIds;
//     competition.save(function(err) {
//       if (err) {
//         res.send(err);
//       }
//       res.json(competition);
//     });
//   })
// });
//
//

router.get('/:domainId/competitors/', passport.authenticate('bearer', {session: false}), domainValidator, function (req, res) {
  const domain = req.params.domainId;
  Competitor.findByDomain(domain, function (err, competitors) {
    if (err) {
      throw (err);
    }
    res.json(competitors);
  });
});

router.get('/:domainId/competitor/:id', passport.authenticate('bearer', {session: false}), domainValidator, function (req, res) {
  const id = req.params.id;
  const domainId = req.params.domainId;
  Competitor.findOneByDomainAndId(domainId, id, function (err, competitor) {
    if (err) {
      throw (err);
    }
    res.json(competitor);
  })
});

router.put('/:domainId/competitor/:id', passport.authenticate('bearer', {session: false}), domainValidator, function (req, res) {
  const id = req.params.id;
  const domainId = req.params.domainId;
  Competitor.findOneByDomainAndId(domainId, id, function (err, competitor) {
    if (err) {
      throw (err);
    } else if (!competitor) {
      throw ('Competitor not found');
    }
    const receivedCompetitor = req.body;
    if (!receivedCompetitor.name) {
      res.json({success: false, msg: 'Name is a required field.'});
    } else {
      competitor.applyCompetitor(receivedCompetitor);
      competitor.domain = domainId;
      competitor.save(function (err) {
        if (err) {
          throw (err)
        }
        res.json({success: true, competitor: competitor});
      });
    }
  });
});

router.post('/:domainId/competitor/', passport.authenticate('bearer', {session: false}), domainValidator, function (req, res) {
  const domainId = req.params.domainId;
  const userId = req.user._id;
  const receivedCompetitor = req.body;
  if (!receivedCompetitor.name) {
    res.json({success: false, msg: 'Name is a required field.'});
  } else {
    const competitor = new Competitor();
    competitor.applyCompetitor(receivedCompetitor);
    competitor.creator = userId;
    competitor.domain = domainId;
    competitor.save(function (err) {
      if (err) {
        throw (err)
      }
      res.json({success: true, competitor: competitor});
    });
  }
});

router.get('/domains', passport.authenticate('bearer', {session: false}), function (req, res) {
  req.user.getDomains(function (err, domains) {
    if (err) {
      throw err;
    }
    res.json(domains);
  });
});

router.get('/*', function (req, res) {
  res.sendStatus(404);
});

module.exports = router;

