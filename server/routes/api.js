var express = require('express');
var router = express.Router();

var user = require('../api/user')
var competition = require('../api/competitions');

router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/authenticate', user.authenticate);
router.get('/users', user.users);



router.get('/competitions', competition.getAll);
router.get('/competition/:id', competition.get);
router.post('/competition', competition.add);
router.delete('/competition/:id', competition.delete);
router.put('/competition/:id', competition.update);

module.exports = router;
