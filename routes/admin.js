var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('index', {title: 'Admin Page'});
    //res.redirect('/admin');
});

// Require controller modules.
var participant_controller = require('../controllers/participantController');


module.exports = router;