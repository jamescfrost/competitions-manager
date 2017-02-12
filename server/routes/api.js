const express = require('express');
const router = express.Router();
const authentication = require("../api/authentication");
const passport = require('passport');
const competition = require('../api/competitions');

router.get('/', function(req, res) {
  res.send('api works');
});

router.post('/register', authentication.register);

router.post('/authenticate', authentication.authenticate);


router.get('/competitions', passport.authenticate('bearer', { session: false }), competition.getAll);
/*
router.get('/competition/:id', passport.authenticate('bearer', { session: false }), competition.get);
router.post('/competition', passport.authenticate('bearer', { session: false }), competition.add);
router.delete('/competition/:id', passport.authenticate('bearer', { session: false }), competition.delete);
router.put('/competition/:id', passport.authenticate('bearer', { session: false }), competition.update);
*/



module.exports = router;
