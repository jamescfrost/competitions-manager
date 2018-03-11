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
    const user = new User({
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
        const token = user.createToken();
        res.json({success: true, token: token});
      } else {
        res.send({success: false, msg: 'Authentication failed. Wrong password.'});
      }
    }
  });
});

router.get('/competitions/:domainId', passport.authenticate('bearer', {session: false}), domainValidator, function (req, res) {
  const domain = req.params.domainId;
  Competition.findByDomainId(domain, function (err, competitions) {
    if (err) {
      throw (err);
    }
    res.json({success: true, data: competitions});
  });
});

router.get('/competition/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
  var id = req.params.id;
  const user = req.user;
  Competition.findOneById(id, function (err, competition) {
    if (err) {
      throw (err);
    }
    if (!user.hasDomainAuthority(competition.domainId)) {
      res.sendStatus(401);
    } else {
      res.json({success: true, data: competition});
    }
  })
});

router.put('/competition/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
  const user = req.user;
  const id = req.params.id;
  const receivedCompetition = req.body;
  Competition.findOneById(id, function (err, competition) {
      if (err) {
        throw (err);
      } else if (!competition) {
        throw ('Competition not found');
      } else if (!user.hasDomainAuthority(competition.domainId)) {
        res.json({success: false, data: 'Insufficient domain authority.'});
      } else if (!receivedCompetition) {
        res.json({success: false, data: 'Invalid competition.'});
      } else if (id !== receivedCompetition._id) {
        res.json({success: false, data: 'Id conflict.'});
      } else if (competition.domainId !== receivedCompetition.domainId) {
        res.json({success: false, data: 'Domain conflict.'});
      } else if (!receivedCompetition.name) {
        res.json({success: false, data: 'Name is a required field.'});
      } else {
        competition.applyCompetition(receivedCompetition);
        competition.save(function (err) {
          if (err) {
            throw (err)
          }
          res.json({success: true, data: competition});
        });
      }
    }
  );
});

router.get('/competitors/:domainId', passport.authenticate('bearer', {session: false}), domainValidator, function (req, res) {
  const domainId = req.params.domainId;
  Competitor.findByDomainId(domainId, function (err, competitors) {
    if (err) {
      throw (err);
    }
    res.json(competitors);
  });
});

router.get('/competitor/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
  const id = req.params.id;
  const user = req.user;
  Competitor.findOneById(id, function (err, competitor) {
    if (err) {
      throw (err);
    }
    if (!user.hasDomainAuthority(competitor.domainId)) {
      res.sendStatus(401);
    } else {
      res.json(competitor);
    }
  })
});

router.put('/competitor/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
  const user = req.user;
  const id = req.params.id;
  const receivedCompetitor = req.body;
  if (!receivedCompetitor) {
    res.json({success: false, msg: 'Invalid competitor.'});
  } else if (id !== receivedCompetitor.id) {
    res.json({success: false, msg: 'Id conflict.'});
  } else {
    Competitor.findOneByAndId(id, function (err, competitor) {
        if (err) {
          throw (err);
        } else if (!competitor) {
          throw ('Competitor not found');
        } else if (competitor.domainId !== receivedCompetitor.domainId) {
          res.json({success: false, msg: 'Domain conflict.'});
        } else if (!user.hasDomainAuthority(receivedCompetitor.domainId)) {
          res.json({success: false, msg: 'Insufficient domain authority.'});
        } else if (!receivedCompetitor.name) {
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
      }
    );
  }
});

router.post('/competitor/', passport.authenticate('bearer', {session: false}), function (req, res) {
  const user = req.user;
  const receivedCompetitor = req.body;
  if (!receivedCompetitor) {
    res.sendStatus(400).send('Invalid competitor.');
  } else if (!user.hasDomainAuthority(receivedCompetitor.domainId)) {
    res.sendStatus(401).send('Insufficient domain authority.');
  } else if (!receivedCompetitor.name) {
    res.sendStatus(422).send('Name is a required field.');
  } else {
    const competitor = new Competitor();
    competitor.applyCompetitor(receivedCompetitor);
    competitor.creatorUserId = user._id;
    competitor.domainId = receivedCompetitor.domainId;
    competitor.save(function (err) {
      if (err) {
        throw (err)
      }
      res.json(competitor);
    });
  }
});

router.get('/domain/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
  Domain.findById(req.params.id, function (err, domain) {
    if (err) {
      throw err;
    }
    res.json(domain);
  });
});


router.get('/domains', passport.authenticate('bearer', {session: false}), function (req, res) {
  req.user.getDomains(function (err, domains) {
    if (err) {
      throw err;
    }
    res.json(domains);
  });
});

router.get('/fixtures', function (req, res) {
  var competitors = [
    'James',
    'Rich',
    'Dan',
    'Stephen',
    'LT',
  ];
  var count = competitors.length;
  if (count % 2 == 1) {
    competitors.push(null);
    count++;
  }
  var home = competitors.splice(0, count / 2);
  var away = competitors.splice(0, count / 2);
  var fixtureSets = [];
  var fixtureSetCount = count - 1;
  var fixtureCount = count / 2;
  var flip = true;
  for (var fixtureSet = 0; fixtureSet < fixtureSetCount*2; fixtureSet++) {
    var fixtures = [];
    for (var i=0; i < fixtureCount; i++) {
      if (flip)
        fixtures.push(home[i] + " vs " + away[i]);
      else
        fixtures.push(away[i] + " vs " + home[i]);
    }
    fixtureSets.push(fixtures);
    var tempAway = away[0];
    var tempHome = home[fixtureCount-1];
    for (var i=0; i<fixtureCount-1; i++) {
      away[i] = away[i+1];
      if (i>0)
        home[i+1] = home[i];
    }
    home[1] = tempAway;
    away[fixtureCount-1] = tempHome;
    flip = !flip;
  }
  res.json(fixtureSets);
});

router.get('/*', function (req, res) {
  res.sendStatus(404);
});

module.exports = router;
