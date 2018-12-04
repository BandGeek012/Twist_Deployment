//const { body,validationResult } = require('express-validator/check');
//const { sanitizeBody } = require('express-validator/filter');
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
var school_controller = require('../controllers/schoolController');
var presenter_controller = require('../controllers/presenterController');
var room_controller = require('../controllers/roomController');
//schedule routes
router.get('/schedule', schedule_controller.schedule_list);



//session routes
router.get('/session', session_controller.session_list);


router.get('/', function(req, res) {
    res.render('index', {title: 'Admin Page'});
    //res.redirect('/admin');
});


/// School ROUTES ///

// GET admin home page.
router.get('/', school_controller.index);

// GET request for creating a School. NOTE This must come before routes that display school (uses id).
router.get('/school/create', school_controller.school_create_get);

// POST request for creating School.
router.post('/school/create', school_controller.school_create_post);

// GET request to delete School.
router.get('/school/:id/delete', school_controller.school_delete_get);

// POST request to delete School.
router.post('/school/:id/delete', school_controller.school_delete_post);

// GET request to update School.
router.get('/school/:id/update', school_controller.school_update_get);

// POST request to update School.
router.post('/school/:id/update', school_controller.school_update_post);

// GET request for one School.
router.get('/school/:id', school_controller.school_detail);

// GET request for list of all School items.
router.get('/school', school_controller.school_list);

/// participant ROUTES ///

// GET admin home page.
router.get('/', participant_controller.index);

// GET request for creating a participant. NOTE This must come before routes that display participant (uses id).
router.get('/participant/create', participant_controller.participant_create_get);

// POST request for creating participant.
router.post('/participant/create', participant_controller.participant_create_post);

// GET request to delete participant.
router.get('/participant/:id/delete', participant_controller.participant_delete_get);

// POST request to delete participant.
router.post('/participant/:id/delete', participant_controller.participant_delete_post);

// GET request to update participant.
router.get('/participant/:id/update', participant_controller.participant_update_get);

// POST request to update participant.
router.post('/participant/:id/update', participant_controller.participant_update_post);

// GET request for one participant.
router.get('/participant/:id', participant_controller.participant_detail);

// GET request for list of all participant items.
router.get('/participant', participant_controller.participant_list);

/// presenter ROUTES ///

// GET admin home page.
router.get('/', presenter_controller.index);

// GET request for creating a presenter. NOTE This must come before routes that display presenter (uses id).
router.get('/presenter/create', presenter_controller.presenter_create_get);

// POST request for creating presenter.
router.post('/presenter/create', presenter_controller.presenter_create_post);

// GET request to delete presenter.
router.get('/presenter/:id/delete', presenter_controller.presenter_delete_get);

// POST request to delete presenter.
router.post('/presenter/:id/delete', presenter_controller.presenter_delete_post);

// GET request to update presenter.
router.get('/presenter/:id/update', presenter_controller.presenter_update_get);

// POST request to update presenter.
router.post('/presenter/:id/update', presenter_controller.presenter_update_post);

// GET request for one presenter.
router.get('/presenter/:id', presenter_controller.presenter_detail);

// GET request for list of all presenter items.
router.get('/presenter', presenter_controller.presenter_list);

module.exports = router;

