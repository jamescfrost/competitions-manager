const express = require('express');
const router = express.Router();
const authentication = require("../api/authentication");
const passport = require('passport');
const competition = require('../api/competitions');
const competitor = require('../api/competitor');

router.get('/', function(req, res) {
  res.send('api works');
});

router.post('/register', authentication.register);
router.post('/authenticate', authentication.authenticate);

router.get('/competitions', passport.authenticate('bearer', { session: false }), competition.getAll);
router.get('/competition/:id', passport.authenticate('bearer', { session: false }), competition.get);
router.put('/competition/:id', passport.authenticate('bearer', { session: false }), competition.save);

router.post('/competitor', passport.authenticate('bearer', { session: false }), competitor.save);

/*
router.post('/competition', passport.authenticate('bearer', { session: false }), competition.add);
router.delete('/competition/:id', passport.authenticate('bearer', { session: false }), competition.delete);
router.put('/competition/:id', passport.authenticate('bearer', { session: false }), competition.update);
*/

module.exports = router;
