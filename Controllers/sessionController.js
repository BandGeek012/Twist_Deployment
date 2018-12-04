
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var mongoose = require('mongoose');

var Session = require('../models/session');
var School = require('../models/highschool');
//var Participant = require('../models/participant');

var async = require('async');

//display all sessions
exports.session_list = function(req, res, next) {

  Session.find({}, 'SessionNum PresenterID')
    //.populate('SessionNum PresenterID')
    .exec(function (err, list_sessions) {
      if (err) { return next(err); }
      //successful, so render
      res.render('session_list', { title: 'Session List', session_list: list_sessions});
    });
};

// Display detail page for a specific session.
exports.session_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: session detail: ' + req.params.id);
};

// Display session create form on GET.
exports.session_create_get = function(req, res) {
    res.send('session_form', { title: 'Create Session' });
};

// Handle session create on POST.
exports.session_create_post =  [

    // Validate that the name field is not empty.
    body('name', 'Session name required').isLength({ min: 1 }).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('name').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a School object with escaped and trimmed data.
      var session = new Session(
        { name: req.body.name }
      );


      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('session_form', { title: 'Create Session', session: session, errors: errors.array()});
      return;
      }
      else {
        // Data from form is valid.
        // Check if School with same name already exists.
        Session.findOne({ 'name': req.body.name })
          .exec( function(err, found_session) {
             if (err) { return next(err); }

             if (found_session) {
               // School exists, redirect to its detail page.
               res.redirect(found_session.url);
             }
             else {

               session.save(function (err) {
                 if (err) { return next(err); }
                 // School saved. Redirect to School detail page.
                 res.redirect(session.url);
               });

             }

           });
      }
    }
  ];

// Display session delete form on GET.
exports.session_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: session delete GET');
};

// Handle session delete on POST.
exports.session_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: session delete POST');
};

// Display session update form on GET.
exports.session_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: session update GET');
};

// Handle session update on POST.
exports.session_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: session update POST');
};
