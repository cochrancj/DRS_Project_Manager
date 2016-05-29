var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {title: 'Dead Rabbit Society Mission Directives'});
})

module.exports = router;
