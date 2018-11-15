var express = require('express');
var router = express.Router();

//require controller modules.
var schedule_controller = require('../controllers/scheduleController');
var session_controller = require('../controllers/sessionController');

//schedule routes

//get admin homepage
router.get('/', schedule_controller.index);
