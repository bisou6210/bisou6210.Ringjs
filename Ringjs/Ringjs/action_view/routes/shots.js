var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('shots', { title: 'Ring Screen Shots' });
});

module.exports = router;