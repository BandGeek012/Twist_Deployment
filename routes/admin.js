var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {title: 'Admin Page'});
  //res.redirect('/admin');
});

//require controller modules.
var schedule_controller = require('../controllers/scheduleController');
var session_controller = require('../controllers/sessionController');
var participant_controller = require('../controllers/participantController');
//schedule routes

module.exports = router;
