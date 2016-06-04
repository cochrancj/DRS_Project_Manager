var express = require('express');
var router = express.Router();

var Directive = require('../../models/directive');

// Get
router.get('/', function(req, res){
  Directive.find({}, function(err, dbDirectives){
    res.json({ directives: dbDirectives})
  });
});

// Show One
router.get('/:id', function(req, res){
  Directive.findById( req.params.id, function( err, dbDirectives){
    res.json( dbDirective );
  });
});

// Idea
router.post('/', function(req, res){
  console.log(req.body)
  Directive.create(req.body.directive, function(err, directive){
    res.json(directive);
  });
});


// Delete
router.delete('/:id', function(req, res) {
  console.log('deleting!');
  Directive.findByIdAndRemove(req.params.id, function(err){
    if (err) { res.status(500).end(); }
    res.status(204).end();
  });
});


module.exports = router;
