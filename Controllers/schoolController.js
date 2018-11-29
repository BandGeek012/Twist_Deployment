const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var School = require('../models/highschool');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        school_count: function(callback) {
            school.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        participant_instance_count: function(callback) {
            participant.countDocuments({}, callback);
        },
        participant_instance_available_count: function(callback) {
            participant.countDocuments({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        school_count: function(callback) {
            school.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};

// Display list of all Schools.
exports.school_list = function(req, res, next) {

    School.find({}, 'HSName HSID')
      .populate('_id')
      .exec(function (err, list_schools) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('school_list', { title: 'School List', school_list: list_schools });
      });
      
  };

  // Display detail page for a specific school.
  exports.school_detail = function(req, res) {
      res.send('NOT IMPLEMENTED: School detail: ' + req.params.id);
  };
  
  // Display School create form on GET.
  exports.school_create_get = function(req, res, next) {     
      res.render('school_form', { title: 'Create School' });
  };
  
  // Handle School create on POST.
exports.school_create_post =  [
   
    // Validate that the name field is not empty.
    body('name', 'School name required').isLength({ min: 1 }).trim(),
    
    // Sanitize (trim and escape) the name field.
    sanitizeBody('name').trim().escape(),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a School object with escaped and trimmed data.
      var school = new School(
        { name: req.body.name }
      );
  
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('school_form', { title: 'Create School', school: school, errors: errors.array()});
      return;
      }
      else {
        // Data from form is valid.
        // Check if School with same name already exists.
        School.findOne({ 'name': req.body.name })
          .exec( function(err, found_school) {
             if (err) { return next(err); }
  
             if (found_school) {
               // School exists, redirect to its detail page.
               res.redirect(found_school.url);
             }
             else {
  
               school.save(function (err) {
                 if (err) { return next(err); }
                 // School saved. Redirect to School detail page.
                 res.redirect(school.url);
               });
  
             }
  
           });
      }
    }
  ];
  
  // Display school delete form on GET.
  exports.school_delete_get = function(req, res) {
      res.send('NOT IMPLEMENTED: School delete GET');
  };
  
  // Handle school delete on POST.
  exports.school_delete_post = function(req, res) {
      res.send('NOT IMPLEMENTED: School delete POST');
  };
  
  // Display school update form on GET.
  exports.school_update_get = function(req, res) {
      res.send('NOT IMPLEMENTED: School update GET');
  };
  
  // Handle school update on POST.
  exports.school_update_post = function(req, res) {
      res.send('NOT IMPLEMENTED: School update POST');
  };