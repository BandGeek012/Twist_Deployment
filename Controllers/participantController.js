const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var mongoose = require('mongoose');
var School = require('../models/highschool');
var Participant = require('../models/participant');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        participant_count: function(callback) {
            participant.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        participant_instance_count: function(callback) {
            participant.countDocuments({}, callback);
        },
        participant_instance_available_count: function(callback) {
            participant.countDocuments({status:'Available'}, callback);
        },
        school_count: function(callback) {
            School.countDocuments({}, callback);
        },
        school_count: function(callback) {
            School.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};


// Display list of all Participants.
exports.participant_list = function(req, res, next) {

    Participant.find({})
      .exec(function (err, list_participants) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('participant_list', { title: 'Participant List', participant_list: list_participants });
      });
      
  };

  // Display detail page for a specific participant.
exports.participant_detail = function(req, res, next) {

    async.parallel({
        participant: function(callback) {

            Participant.findById(req.params.id)
              .populate('school')
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.participant==null) { // No results.
            var err = new Error('Participant not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('participant_detail', { title: 'Title', participant:  results.participant, participant_instances: results.participant_instance } );
    });

};
  
 // Display participant create form on GET.
exports.participant_create_get = function(req, res, next) { 
      
    // Get all Schools , which we can use for adding to our Participant.
    async.parallel({
        schools: function(callback) {
            School.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('participant_form', { title: 'Enroll', schools: results.schools, schools: results.schools });
    });
    
};
  
 // Handle participant create on POST.
exports.participant_create_post = [
    // Convert the school to an array.
    (req, res, next) => {
        if(!(req.body.school instanceof Array)){
            if(typeof req.body.school==='undefined')
            req.body.school=[];
            else
            req.body.school=new Array(req.body.school);
        }
        next();
    },

    // Validate fields.
    body('FirstName', 'FirstName must not be empty.').isLength({ min: 1 }).trim(),
    body('LastName', 'LastName must not be empty.').isLength({ min: 1 }).trim(),
    body('Email', 'Email must not be empty.').isLength({ min: 1 }).trim(),
    body('Address', 'Address must not be empty').isLength({ min: 1 }).trim(),
  
    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Participant object with escaped and trimmed data.
        var participant = new Participant(
          { FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Address: req.body.Address,
            ParticipantType: req.body.ParticipantType
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all schools for form.
            async.parallel({
                schools: function(callback) {
                    Author.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected schools as checked.
                for (let i = 0; i < results.schools.length; i++) {
                    if (participant.school.indexOf(results.schools[i]._id) > -1) {
                        results.schools[i].checked='true';
                    }
                }
                res.render('participant_form', { title: 'Create Participant',authors:results.authors, schools:results.schools, participant: participant, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save participant.
            participant.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new participant record.
                   res.redirect(participant.url);
                });
        }
    }
];
  
  // Display Participant delete form on GET.
  exports.participant_delete_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Participant delete GET');
  };
  
  // Handle Participant delete on POST.
  exports.participant_delete_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Participant delete POST');
  };
  
  // Display Participant update form on GET.
  exports.participant_update_get = function(req, res) {
      res.send('NOT IMPLEMENTED: Participant update GET');
  };
  
  // Handle Participant update on POST.
  exports.participant_update_post = function(req, res) {
      res.send('NOT IMPLEMENTED: Participant update POST');
  };